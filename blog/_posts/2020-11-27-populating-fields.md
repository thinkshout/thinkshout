---

layout: blog
body-class: blog-post
topic: technology
campaign-topic: drupal
title: "Programmatically Adding and Populating New Fields in Drupal 8"
homepage: true
author: gabe
published: true
featured: false
short: "There are already lots of articles out there if you want to get excited about Drupal 9, so we’re going to focus on the more practical questions with an AFAQ (Anticipated Fearfully Asked Questions)."
tags:
  - drupal
  - "digital strategy"
  - "web development"
  - technology
  - "drupal 9"
date: 2020-06-12 11:00:00
image: https://thinkshout.com/assets/images/blog/drupal-9-hero.jpg
header-image: /assets/images/blog/drupal-9-hero.jpg
header-image-alt: "photograph of an old computer under violet and blue lighting."
---
# Programmatically Adding and Populating New Fields in Drupal 8
​
In working on our longer-term clients’ sites, we’re often asked to add some new field (or fields) to some kind of content, and in the same batch of code to add values to those new fields. That shouldn’t be a problem, and mostly it isn’t--the developer who’s assigned the ticket adds the fields via the Drupal GUI, the configuration for which is automatically exported via [Config Suite](https://www.drupal.org/project/config_suite) to a folder in the git repository. She then writes a [post_update](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_post_update_NAME/8.9.x) hook to add values to it. She test-runs the hook, generally via `drush updb`, sees that it works, and happily commits this new code, along with the exported configuration that describes the new fields.
​
The problem arises later, when this code is deployed. Our deployment method for Drupal 8 is fairly standard:
​
1. On GitHub, merge the development code into a production branch.
2. This merge kicks off a deployment script on CircleCI that runs PHPCS and visual regression tests.
3. Circle merges the incoming code into Pantheon's git repo for this site, and then uses Terminus to get into the site's "dev" environment and run 
​
```
drush cr
drush -y updb		# short for updatedb
drush -y cim		# short for config:import
```
​
So, great. What's the problem?
​
## The Problem
​
The order of this operation[^1]. `drush updb` updates the database--and runs that post-update hook where our developer populates the new field. Afterward, with `drush cim`, we're trying to import the configuration that tells Drupal to *create* the new field. The database update fails, and although the configuration import does run, those new values never get put into it.
​
## The Solution
​
The following code lays out one way to address this problem. Assuming we're doing this work for a custom module called "Test," we'd add this to its install file:
​
**`modules/custom/test/test.install`**
​
```
<?php
​
use Drupal\Core\Config\FileStorage;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\node\Entity\Node;
​
/**
 * Be sure the fields we're expecting are there, and create if not.
 *
 * ASSUMPTIONS:
 * - You've already created these field configs, probably through the GUI.
 * - They're stored in ../config.
 *
 * @param array $entitytypes_fields
 *   A 3-dimensional array. The first level is entity types, the second is
 * bundles, and the third is the fields you want to ensure. E.g.
 * [
 *   'node' => [
 *     'page' => [
 *       'field_foo',
 *       'field_bar',
 *     ],
 *     'article' => [
 *       'field_bar',
 *     ],
 *   ],
 * ]
 *
 * @throws \Drupal\Core\Entity\EntityStorageException
 */
function _ensure_fields(array $entitytypes_fields) {
  $config_directory = new FileStorage('../config');
​
  foreach ($entitytypes_fields as $entitytype => $bundles) {
    foreach ($bundles as $bundle => $fields) {
      foreach ($fields as $field) {
        $field_storage_name = 'field.storage.' . $entitytype . '.' . $field;
        $config_record = $config_directory->read($field_storage_name);
        if (!FieldStorageConfig::loadByName($config_record['entity_type'], $config_record['field_name'])) {
          FieldStorageConfig::create($config_record)->save();
        }
​
        $field_config_name = 'field.field.' . $entitytype . '.' . $bundle . '.' . $field;
        $config_record = $config_directory->read($field_config_name);
        if (!FieldConfig::loadByName($config_record['entity_type'], $config_record['bundle'], $config_record['field_name'])) {
          FieldConfig::create($config_record)->save();
        }
      }
    }
  }
}
```
​
`_ensure_fields()` is a custom function I wrote to address this situation. Just 
​
1. Be sure that you already have the necessary configuration files saved somewhere--these should look like "field.storage.[ENTITY TYPE].[FIELD NAME].yml" and "field.field.[ENTITY TYPE].[BUNDLE].[FIELD NAME].yml"--and if that somewhere isn't `../config` as expected by this function, just change where the function's looking.
2. Include this function in the `.install` file of your module.
3. Use it in your `hook_update_N()` function per its documentation.
​
Here's `_ensure_fields()` in action, a little further down the `test.install` file. We're adding `field_external_id` to two node types, and, just for good measure, adding a `field_second_image` field to a paragraph type at the same time.
​
```
/**
 * Adds "External ID" field to articles and "Second image" to two-col CTAs.
 */
function test_update_8101(&$sandbox) {
  $entitytypes_fields = [
    'node' => [
      'page' => [
        'field_external_id',
      ],
      'blog_news_post' => [
        'field_external_id',
      ],
    ],
    'paragraph' => [
      'two_column_cta' => [
        'field_second_image',
      ],
    ],
  ];
​
  _ensure_fields($entitytypes_fields);
}
```
​
Finally, we'd add new values to the fields in that post-update hook like so:
​
​
**`modules/custom/test/test.post_update.php`**
​
```
<?php
​
/**
 * Populate the new "External ID" field from an array of known values.
 */
function test_post_update_populate_id_field(&$sandbox) {
  $nids_to_extids = [
    76432 => 'HhZLS',
    76428 => 'RKWrd',
    76425 => 'TJs22',
    76424 => 'wpVIR',
    76423 => 'AEyS9',
    76418 => 'tSVVJ',
    76415 => 'tF4NJ',
    76414 => 'MXmnc',
    76413 => 'aQLwW',
    76412 => 'NVRV0',
    76411 => 'gk55Q',
    76410 => 'Wj1DC',
    76406 => 'CuCjT',
    76405 => '4qYFe',
    76393 => 'cBPyY',
    76390 => 'MmWJl',
    76388 => 'K4QYQ',
    76387 => 'HUpeh',
    76386 => 'P3MN2',
    76385 => 'qALjM',
  ];
​
  $nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple(array_keys($nids_to_extids));
  foreach ($nodes as $node) {
    $node->set('field_external_id', $nids_to_extids[$node->id()]);
    $node->save();
  }
}
```
​
The deployment ought to go smoothly now--the new fields are added as expected, and then their values get populated.
​
## Last note: Why the post_update hook?
​
It *is* technically possible to add the fields and also populate them within our hook_update_N function, skipping the post_update hook altogether. However, although the documentation for exactly what sort of work should be done in [one](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_update_N/8.9.x) versus [the other](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_post_update_NAME/8.9.x) can be confusing (it is to me), the hook_update_N docs are clear that in these functions,
​
> Loading, saving, or performing any other CRUD operation on an entity is never safe to do (they always involve hooks and services).
​
That leads us to this approach: make your field changes in hook_update_N, then make your content changes in post_update hooks.
​
​
[^1]: Which is standard for this kind of deployment. See, for instance, [the drush deploy command](https://www.drush.org/deploycommand/), which effectively does the same thing, and [this useful StackExchange discussion](https://drupal.stackexchange.com/a/254411) on the matter.
