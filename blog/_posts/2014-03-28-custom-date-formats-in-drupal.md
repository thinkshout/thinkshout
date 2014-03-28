---
layout: post
published: true
featured: true
short: "Deploying custom date formats in Drupal"
author: david
tags:
- Drupal Planet
- Drupal
---

Like most development shops, we like code. It gives us and our clients a feeling of confidence to have configuration and logic as much as possible living in code, rather than in the database. So naturally, as we build Drupal sites, we use the [Features](https://drupal.org/project/features) module to lock configuration into code.

Date formats are used in many places, including fields on content type view modes, and in views configurations. They are simple to set up in the dates UI in Drupal, so you would think it would be easy to export into code. Unfortunately, there is no simple way to export it. Fortunately, there is a different way, still easy, to get this into code, and it's a great introduction to using Drupal module hooks.

We will look at using custom code plus a small export using features and [strongarm](https://drupal.org/project/strongarm).

## Collect your facts

Decide on a format. Go ahead and see the format options at http://php.net/date, so you know what the options are.

Pick a name for that format. Examples: "Month Year" or "Short: MM D".

## Code it up

By the time we are adding a custom date format, we usually have a few features modules already created. It's usually best to put this new code in a generic or common feature, since most date formats will be used by several content types and views.

Let's say the name of your site is "mysite" and the name of your genric feature module is "mysite_common". If you don't have any features modules at all, go ahead and create one and enable it, exporting something like the site name into it, mainly so we have similar starting points.

Quick overview of the code:

1. hook_date_formats().
2. hook_date_format_types().
3. strongarm export.

Let's start with hook_date_formats(). This is the same thing as creating a new format at admin/config/regional/date-time/formats.

[SCREENSHOT]

Here's an example.

```php
/**
 * Implements hook_date_formats().
 */
function mysite_common_date_formats() {
  return array(
    // Creates a new format for a new, custom format type.
    array(
      'type' => 'mysite_short_y_m',
      'format' => 'Y-m',
      'locales' => array(),
    ),
    // Defines a format and makes it available to core's short format type.
    array(
      'type' => 'short',
      'format' => 'Y-m-d',
      'locales' => array(),
    ),
  );
}
```

The type points to the date format type that this format will be available for. I tend to make it unique and prefix it with the site name, to avoid future namespace collisions. You may want to prefix it with the full module name. The format key is a string that ends up getting passed to `date()`. I usually leave locales as an empty array, because I want the date format to be available for all locales.

The only effect this hook implementation has is making formats available in the date admin UI. Nothing more. Full hook documentation at https://api.drupal.org/hook_date_formats.

Moving on to hook_date_format_types(). This is similar to creating a "date type" at admin/config/regional/date-time, but it only creates a machine name with a human readable name.

[SCREENSHOT]

Here's the example:

```php
/**
 * Implements hook_date_format_types().
 */
function mysite_common_date_format_types() {
  return array(
    'mysite_short_y_m' => t('Short: YYYY-MM'),
  );
}
```

Clear caches, go to your site's date format settings, and you'll see your new date format. [SCREENSHOT] However, navigate to field display settings for some content type, and you will see the name of your custom date format type, but the format won't be right. [SCREENSHOT] Come back to the date format settings page, and click that "save" button, and now the date formats presented in field settings will be correct.

To make those setting stick and be deployable, we need to do one final thing. We export a new variable. Saving the date format types page creates a new variable that ties the new date format type (just a name) to an actual format (the code that defines the format, such as "Y-m").

So head back to the features UI, and you should see a new variable listed in the strongarm section. [SCREENSHOT] This is specifically the date format *type*. Export it into your mysite_common feature.

## Done

At this point, you should have code that can be deployed to an existing site, and after enabling and reverting the feature, will provide a consistent date format for use wherever dates need to be displayed.
