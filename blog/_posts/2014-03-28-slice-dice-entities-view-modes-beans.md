---
layout: post
published: false
featured: false
short: null
author: tauno
---

## Slice and dice entities with views modes and Bean Entity View

Want to use a node as a block without creating a View or a block in custom code? Or maybe display a few fields of a node in a different region, but don't want to add the overhead and complexity of Panels or Display Suite?

### Introducing [Bean Entity View](https://drupal.org/project/bean_entity_view)!

This freshly minted module builds on [Bean](https://drupal.org/project/bean) to provide a bean type for displaying an entity using a particular view mode. To start, there are only three basic configuration options:
1. Which type of entity to display
2. Which view mode of that entity to render 
3. Which specific entity to render

![Bean Entity View creation form screenshot](/assets/images/blog/bean_entity_view-screenshot.png)

The first two options are straight forward, while the third option provides two main choices: enter a specific entity id or leave the field blank to attempt to render the entity that the current page is displaying. To help the plugin determine which entity you are currently viewing, you may set which position in the url the entity id should be located in. For nodes (node/1234) the position would be 1, while for RedHen contacts (redhen/contact/1234) the position would be 2.

We're already using this module in several projects, so it should be ready for additional testing and use. Patches to support block caching or other improvements are welcome!