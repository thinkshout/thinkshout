---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: "Navigating Entity URIs: A Practical Example"
published: true
featured: false
author: gabe
date: 2014-06-27 17:15:00
short:  Find out how to wrestle proper URIs out of all sorts of stubborn entities.
tags:
  - Drupal Planet
  - Drupal
  - Entity
  - null
---

At ThinkShout, most of our modules are based around the Entity system. After all, like most developers, we are big abstraction nerds. Entities enable some rad abstraction in Drupal land: our [Registration module](https://www.drupal.org/project/registration) lets you registration-enable any fieldable entity; the new version of [MailChimp](https://www.drupal.org/project/mailchimp) lets you sync any fieldable entity with an email address with your MailChimp lists; and our [Salesforce module](https://www.drupal.org/project/salesforce) lets you sync any entity with a Salesforce object.

Did you notice the little restriction I worked into my first two examples there? MailChimp and Registration are only for “fieldable entities”. There are a lot of reasons for this, but one of the conveniences of fieldability is that it gives you a natural place to add your entity-specific stuff, like a registration form or a MailChimp list signup dialogue: display it with field API!

Salesforce is different. It isn’t field-based. Instead, an individual “Salesforce Mapping” entity describes a synchronization relationship between a Drupal Entity Bundle (like a node content type of “Event”) and a Salesforce Object Type (like a “Campaign”): there’s no need for any entity-side configuration -- or at least, there didn’t used to be.

Recently, we began implementing a suite of Salesforce sync administration tools to help resolve the inevitable issues that arise with two complex systems trying to pass data back and forth. One of the features of this tool is the ability to change the Salesforce Object that a particular Drupal entity is connected with (change a specific Event to map to a different Campaign). Another is to view the synchronization history for any Drupal entity.

We started out by implementing a central administrative UI to provide access to locate and edit all these Synchronization Object instances.

The UI is handy: searchable, filterable, sortable. Sometimes Drupal makes stuff really easy!

![salesforce_sync_ui_admin.png]({{ site.baseurl }}/assets/images/blog/salesforce_sync_ui_admin.png)

Can we be real for a second, though? If I have an Event syncing with a Salesforce Campaign, and I want to look at the sync history, does it make sense for me to go to a special part of my site and track down that Event with some weird unique UI?

Hardly. Just put a tab on my Event Node, dude!

Great idea! Shouldn’t be too hard, right? We’ll just do a hook_menu, load up all our of Salesforce Mappings, and add a menu item to their Entity Bundles based on their URI:

~~~php
<?php
/**
 * Implements hook_menu().
 */
function salesforce_mapping_menu() {
  $items = array();
  // Load our Salesforce mappings and loop through:
  $mappings = salesforce_mapping_load();

  foreach ($mappings as $mapping) {
    // Create a dummy entity to load the URI:
    $entity = entity_create($mapping->drupal_entity_type, array('type' => $mapping->drupal_bundle));
    $uri = $entity->uri(); // Danger Will Robinson!
    $path = $uri['path'] . '%' . $type . '/salesforce_activity';

    // Figure out which argument has our entity ID in it:
    $entity_arg = substr_count($path, '/') - 1;

    // Use the URI and entity arg to generate a nice menu item:
    $items[$path] = array(
      'title' => 'Salesforce activity',
      'description' => 'View Salesforce activity for this entity.',
      'type' => MENU_LOCAL_TASK,
      'page callback' => 'salesforce_mapping_object_view',
      'page arguments' => array($entity_arg, $mapping->drupal_entity_type),
    );
  }
  return $items;
}
~~~

This worked great in development, but as soon as we tested on a production site, it exploded. Why? This line:

~~~php
<?php
$uri = $entity->uri();
~~~

Sadly, this method doesn’t work for every Drupal Entity. Nodes, for example, and Commerce Orders, don’t respond to $entity->uri(). They like:


~~~php
<?php
$uri = entity_uri($entity)
~~~

Grr. Ok, easy fix right?

~~~php
<?php
$uri = method_exists($entity, 'uri') ? $entity->uri() : entity_uri($type, $entity);
~~~

And yes, this is pretty good. But for some reason, our tab still wasn’t appearing on Commerce Orders. On closer inspection, this is the URI we were getting from our function call on Commerce Orders:

~~~php
<?php
array(
  ‘options’ => array(
    ‘entity_type’ => “commerce_order”,
    ‘entity’ => {stdClass}
  ),
)
~~~

Notice something missing? Yeah, there’s no ‘path’ index for the next line to use:

~~~php
<?php
$path = $uri['path'] . '%' . $type . '/salesforce_activity';
~~~

Thanks for nuthin', flagship example of how to use the Entity system! I’m sure the Commerce team has a good reason for leaving the ‘path’ piece of URIs empty on raw Entity objects: almost all Commerce Entities behave this way. But it’s not very helpful for us!

We could potentially resolve this by loading a random object and parsing its URI's 'path' to extract an abstract version, or by offering a patch to Commerce. Perhaps the latter option would be ideal, but we decided a work-around would be more expeditious: we really don’t want to break Commerce on a live site.

Instead, we decided to override the entity data for the important entity types in a local module:

~~~php
<?php
/**
 * Implements hook_entity_info_alter().
 */
function my_module_entity_info_alter(&$entity_info) {
  // Replace ‘commerce_order_ui_order_uri’
  $entity_info['commerce_order']['uri callback'] = 'my_module_uri_order';
}

/**
 * URI callback wrapper to ensure a proper ‘path’ index for Orders.
 */
function my_module_uri_order($entity) {
  // Call the original uri function and fix only if necessary:
  $uri = commerce_order_ui_order_uri($entity);
  if (is_null($uri)) {
    $uri = array(
      'path' => 'admin/commerce/orders/',
    );
  }
  return $uri;
}
~~~

This solves the issue for Orders. A similar technique can be used for any Entity Type that fails to offer a proper ‘path’ index for its URI.

The only entities left to deal with are those that don’t offer any URI at all: entities without a direct management interface. Field Collections are a common example. Fortunately, we started out with a Universal Admin UI: it seems reasonable to hang the Salesforce Object administration interface off this Admin page. Here’s the final, complete hook_menu implementation for our Salesforce Mapping UI:

~~~php
<?php
/**
 * Implements hook_menu().
 */
function salesforce_mapping_menu() {
  $items = array();

  $items['admin/content/salesforce'] = array(
    'title' => 'Salesforce Mapped Objects',
    'description' => 'Manage mapped Salesforce objects.',
    'type' => MENU_LOCAL_TASK,
    'page callback' => 'salesforce_mapping_object_overview_page',
    'file' => 'includes/salesforce_mapping_object.admin.inc',
    'access arguments' => array('view salesforce mapping object'),
  );

  // Define SF activity local tasks for all mapped entities.
  $defaults = array(
    'file' => 'salesforce_mapping_object.admin.inc',
    'file path' => drupal_get_path('module', 'salesforce_mapping') . '/includes',
  );

  $mappings = salesforce_mapping_load();
  $mapped_entities = array();
  foreach ($mappings as $mapping) {
    // We grab the bundle now because it becomes inaccessible for some entities
    // after it is put into the loop below:
    $mapped_entities[$mapping->drupal_entity_type] = $mapping->drupal_bundle;
  }
  foreach ($mapped_entities as $type => $bundle) {
    $entity = entity_create($type, array('type' => $bundle));
    $uri = method_exists($entity, 'uri') ? $entity->uri() : entity_uri($type, $entity);
    // For entities without their own menu items, we hang the UI off the universal
    // Salesforce object admin page:
    if (empty($uri['path'])) {
      $path = 'admin/content/salesforce/' . $type . '/%' . $type . '/salesforce_activity';
      $menu_type = MENU_NORMAL_ITEM;
    }
    else {
      $path = $uri['path'] . '%' . $type . '/salesforce_activity';
      $menu_type = MENU_LOCAL_TASK;
    }
    $entity_arg = substr_count($path, '/') - 1;
    $items[$path] = array(
      'title' => 'Salesforce activity',
      'description' => 'View Salesforce activity for this entity.',
      'type' => $menu_type,
      'page callback' => 'salesforce_mapping_object_view',
      'page arguments' => array($entity_arg, $type),
      'access callback' => 'salesforce_mapping_entity_mapping_accessible',
      'access arguments' => array('view', $entity_arg, $type),
    );
    $items[$path . '/view'] = array(
      'title' => 'View',
      'type' => MENU_DEFAULT_LOCAL_TASK,
      'weight' => -10,
    );
    $items[$path . '/edit'] = array(
      'page callback' => 'salesforce_mapping_object_edit',
      'page arguments' => array($entity_arg, $type),
      'access arguments' => array('edit salesforce mapping object'),
      'title' => 'Edit',
      'type' => MENU_LOCAL_TASK,
      'context' => MENU_CONTEXT_PAGE | MENU_CONTEXT_INLINE,
    ) + $defaults;
    $items[$path . '/delete'] = array(
      'page callback' => 'drupal_get_form',
      'page arguments' => array('salesforce_mapping_object_delete_form', $entity_arg, $type),
      'access arguments' => array('delete salesforce mapping object'),
      'title' => 'Delete',
      'type' => MENU_LOCAL_TASK,
      'context' => MENU_CONTEXT_INLINE,
    ) + $defaults;
  }
  return $items;
}
~~~

Now we can find what we need from two natural directions: by thinking about Salesforce Sync Objects or just by thinking about the entity we want to deal with. The inconsistent responsiveness of Drupal Entities to the uri() request is frustrating, but not impossible to work around. Hopefully, you find this article helpful -- and if you maintain a module that creates its own entities, please test out the uri() function before your next release!
