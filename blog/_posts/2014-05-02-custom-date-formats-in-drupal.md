---
title: "Exporting Custom Date Formats in Drupal"
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

published: true
featured: false
short: Having trouble exporting dates in Drupal? We've got an easy solution for you.
author: david
tags:
- Drupal Planet
- Drupal
---

Like most development shops, we like code. It gives us and our clients a feeling of confidence to have configuration and logic as much as possible living in code, rather than in the database. So naturally, as we build Drupal sites, we use the [Features](https://drupal.org/project/features) module to lock configuration into code.

Not too long ago, when we were building some features for RidePDW.com, we needed to format some dates in specific ways, primarily on their [events page](https://www.ridepdw.com/events) and their [blog](https://www.ridepdw.com/blog). Date formats are used in many places on probably every site, including fields on content type view modes, and in views configurations. They are simple to set up in the dates UI in Drupal, so you would think it would be easy to export into code. Unfortunately, there is no simple way to export it. Fortunately, there is a different way, still easy, to get this into code, and it's a great introduction to using Drupal module hooks.

We will look at using custom code plus a small export using features and [strongarm](https://drupal.org/project/strongarm). This is the same process we used for RidePDW and it worked perfectly.

## Collect your facts

Decide on a format. Go ahead and look at the format options at http://php.net/date, so you know what the options are.

Pick a name for that format. Examples: "Month Year" or "Short: MM D".

## Code it up

By the time we are adding a custom date format, we usually have a few features modules already created. It's usually best to put this new code in a generic or common feature, since most date formats will be used by several content types and views.

Let's say the name of your site is "mysite" and the name of your genric feature module is "mysite_common". If you don't have any features modules at all, go ahead and create one and enable it, exporting something like the site name into it, mainly so we have similar starting points.

Quick overview of the code:

1. hook_date_formats().
2. hook_date_format_types().
3. strongarm export.

Let's start with hook_date_formats(). This accomplishes the same thing as creating a new format at admin/config/regional/date-time/formats.

![Date formats screenshot]({{ site.baseurl }}/assets/images/blog/date-formats-list-1.jpg "Date formats")

![Creating new date format]({{ site.baseurl }}/assets/images/blog/date-formats-creating.jpg "Creating new date format")

Here's an example.

~~~php
<?php
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
~~~

The type points to the date format type that this format will be available for. I tend to make it unique and prefix it with the site name in order to avoid future namespace collisions. You may want to prefix it with the full module name. The format key is a string that ends up getting passed to `date()`. I usually leave locales as an empty array because I want the date format to be available for all locales.

The only effect this hook implementation has is that it makes formats available in the date admin UI. Nothing more. Full hook documentation at https://api.drupal.org/hook_date_formats.

Moving on to hook_date_format_types(). This is similar to creating a "date type" at admin/config/regional/date-time, but it only creates a machine name with a human readable name.

![Date format types]({{ site.baseurl }}/assets/images/blog/date-formats-type-list.jpg "Date format types")

Here's the example:

~~~php
<?php
/**
 * Implements hook_date_format_types().
 */
function mysite_common_date_format_types() {
  return array(
    'mysite_short_y_m' => t('Short: YYYY-MM'),
  );
}
~~~

Clear caches, return to your site's date format settings, and you'll see your new date format.

![Date format types, new type added]({{ site.baseurl }}/assets/images/blog/date-formats-type-list-after.jpg "Date format types, new type added")

However, navigate to the display settings of a date field and you will see the name of your custom date format type, but the format won't be right.

![Field display settings]({{ site.baseurl }}/assets/images/blog/date-formats-field-display.jpg "Field display settings")

Come back to the date format settings page and click that "save" button. Now the date formats presented in field settings will be correct.

![Field display settings, better]({{ site.baseurl }}/assets/images/blog/date-formats-field-display-better.jpg "Field display settings, better")

To make those setting stick and be deployable, we need to do one final thing. We export a new variable. Saving the date format types page creates a new variable that ties the new date format type (just a name) to an actual format (the code that defines the format, such as "Y-m").

So head back to the features UI and you should see a new variable listed in the strongarm section.

![Features export]({{ site.baseurl }}/assets/images/blog/date-formats-features-export.jpg "Features export")

This is specifically the date format *type*. Export it into your mysite_common feature.

## Done

At this point, you should have code that can be deployed to an existing site, and after enabling and reverting the feature, will provide a consistent date format for use wherever dates need to be displayed.
