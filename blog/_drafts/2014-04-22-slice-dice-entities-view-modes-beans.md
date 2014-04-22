---
layout: post
published: false
featured: true
title: "Slice and dice entities with views modes and Bean Entity View"
short: "A new Drupal module to display entities as blocks."
author: tauno
tags:
  - Drupal Planet
  - Drupal Give
  - modules
---

Want to use a node as a block without creating a View or a block in custom code? Or maybe display a few fields of a node in a different region, but don't want to add the overhead and complexity of Panels or Display Suite?

### Introducing [Bean Entity View](https://drupal.org/project/bean_entity_view)!

This freshly-minted module builds on [Bean](https://drupal.org/project/bean) to provide a bean type for displaying an entity using a particular view mode. To start, there are only three basic configuration options:

1. Type of entity to display
2. View mode of that entity to render
3. Specific entity to render

![Bean entity view creation screenshot](/assets/images/blog/bean_entity_view-screenshot.png)

The first two options are straightforward while the third option provides two main choices: enter a specific entity ID or leave the field blank to attempt to render the entity that the current page is displaying. To help the plugin determine which entity you are currently viewing, you may set which position in the url the entity id should be located in. For nodes (node/1234) the position would be 1, while for RedHen contacts (redhen/contact/1234) the position would be 2.

We're already using this module in several projects, so it should be ready for additional testing and use. Patches to support block caching or other improvements are welcome!
