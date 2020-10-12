---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

published: true
featured: false
title: Slice and Dice Entities with View Modes and Bean Entity View
short: A new Drupal module to display entities as blocks.
author: tauno
tags: 
  - Drupal Planet
  - Bean Entity View
  - modules
  - Bean
  - Families USA
---

Want to use a node as a block without creating a View or a block in custom code? Or maybe display a few fields of a node in a different region, but don't want to add the overhead and complexity of Panels or Display Suite?

### Introducing [Bean Entity View](https://drupal.org/project/bean_entity_view)!

This freshly-minted module builds on [Bean](https://drupal.org/project/bean) to provide a bean type for displaying an entity using a particular view mode. To start, there are only three basic configuration options:

1. Type of entity to display
2. View mode of that entity to render
3. Specific entity to render

![Bean entity view creation screenshot]({{ site.baseurl }}/assets/images/blog/bean_entity_view-screenshot.png)

The first two options are straightforward while the third option provides two main choices: enter a specific entity ID or leave the field blank to attempt to render the entity that the current page is displaying. To help the plugin determine which entity you are currently viewing, you may set which position in the url the entity id should be located in. For nodes (node/1234) the position would be 1, while for RedHen contacts (redhen/contact/1234) the position would be 2.

Using the option to display a view mode of the current entity allows for displaying different displays of an entity across several page regions. In addition to the default/full page view of the node, Bean Entity View beans are used to render a header view mode in the header region and a sidebar view mode in the sidebar region.

![Example of using multiple view modes and the contextual option]({{ site.baseurl }}/assets/images/blog/bean_entity_view_fusa_screenshot.jpg)

A [beta release](https://drupal.org/node/2247283) is available on drupal.org and this module is already used on [several](http://familiesusa.org/issues/affordable-care-act) [projects](http://publichealthlawresearch.org/product/alcohol-drugs-and-tobacco-%E2%80%93-effects-dram-shop-liability), so the code is stable and ready for use. Patches to support block caching or other improvements are welcome!
