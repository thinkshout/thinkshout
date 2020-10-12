---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: An Adventure in iCal, my First Module
created: 1338927757
permalink: blog/2012/06/kyle/add-to-cal/
tags:
- modules
- Drupal Planet
- events
- Drupal Give

short: Writing my own module to release to the Drupal community.
author: kyle
---
Recently [ThinkShout](http://thinkshout.com) needed to include an “add to calendar” widget on a client’s event pages, but, to my surprise, no Drupal module existed that fit what I needed. Since this seemed like a relatively common feature, I set out to write my own module to release to the Drupal community.

Thus [Add to Cal](http://drupal.org/project/addtocal) was born, a module that adds a field formatter for [dates](http://drupal.org/project/date) in the form of a button that allows exporting an event to a small variety of popular formats, namely Google, Yahoo, Outlook, and iCal. While PHP is very much a strong point for me, this was the first real module I had created for Drupal, and it proved to be a great adventure and an excellent learning experience.

![image](/sites/default/files/Add-to-Cal-Widget-Hello.jpg)

## Abstracting the Module for All
One of the challenges for me while writing this module was abstraction. While it’s relatively easy to build and deploy a module like Add to Cal for one or two client projects, it can be a bit formidable for a first-time module developer to abstract the functionality for use on any site. Abstraction means removing all hard-coded values and providing a mechanism for easy integration.

For Add to Cal, the best abstraction method was to make it available as a field formatter. This provides an easy way for the widget to be attached to a date field belonging to any type of entity and, if desired, allows the widget to be individually present on multiple entities.

## How it Works
The goal was to make Add to Cal fairly simple to install and set up for any site. Once the module is enabled, it can be attached to a display through the “Manage Display” tab. Next to a date field, choose “Add to Cal” for the format. That’s pretty much it!

The field formatter settings provide a way to map a location and description from other fields on the same bundle, and specify whether the widget is shown for past events (which is turned off by default). The standard date field options are also present, so you can still set the date format and display options for the field.

Once enabled, the Add to Cal widget will automatically appear next to the date field that uses it as a format. It comes with some basic styling that can be easily modified through CSS.

![image](/sites/default/files/Field-formatter-settings.jpg)

## What’s Next?
The first beta version has been released on drupal.org. But the adventure doesn’t stop here – I plan on implementing several changes in the near future to make the module more robust.
