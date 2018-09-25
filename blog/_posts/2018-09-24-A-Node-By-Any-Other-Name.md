---
layout: blog
body-class: blog-post
topic: technology
title: A Node by Any Other Name
homepage: false
author: joe
published: true
featured: false
short: Joe walks us through Drupal's idiosyncratic naming conventions!
tags:
  - Drupal Planet
  - Drupal
  - Node
  - Taxonomy
  - Blocks
  - Entities
  - Modules
date: 2018-09-24 12:00:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---
One of the most overlooked barriers to working with Drupal is learning its idiosyncratic naming conventions. Most CMSs use a fairly simple set of terms for things such as Pages, Widgets, and Plugins. Drupal used a more computer-science precise language that is nevertheless confusing as heck when you first start working in the CMS.

Let’s review what some of those are!

## Nodes/Content
The basic content for Drupal is the _Node_. This would be a _Page_ (or post) in every other CMS. In the admin interface, the term Node will not be found however - everything is simply called _Content_.

![Node Screenshot](/assets/images/blog/Node-1.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Behold, a Node AKA Content in its natural habitat.</span>

## Blocks
Small pieces of reusable content are called Blocks (and sometimes Beans in Drupal 7). These are _Widgets_ in WordPress and elsewhere. They’re primarily managed through the _Block Layout_ page, which is under the _Structure_ tab.

![Blocks Screenshot](/assets/images/blog/Node-2.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Blocks, within the Structure tab.</span>

## Entities
This is a really confusing one, since it generally only appears on the programming side of things. Entities as used by Drupal are very similar to Objects. The D7 [Intro to Entities](https://www.drupal.org/docs/7/api/entity-api/an-introduction-to-entities) page has a very good rundown, though they bury the Entity->Object mapping near the end of the page:

- An _*entity type*_ is a _*base class*_
- A _*bundle*_ is an _*extended class*_
- A _*field*_ is a _*class member, property, variable or field instance*_ (depending on your naming preference)
- An _*entity*_ is an _*object*_ or _*instance*_ of a _*base*_ or _*extended class*_

## Modules
This is a plugin or add-on. It extends and expands the CMS. They come in two types: community-contributed modules (contrib), and custom modules. Custom modules are where you should write low-level programming for your site.

Drupal maintains a well-curated (but slow) system for vetting and approving contributed modules and patches on Drupal.org. The pages for managing Modules are hidden under the Extend tab.

![Modules Screenshot](/assets/images/blog/Node-3.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Modules AKA Plugin or add-on.</span>

## Hooks
Drupal contains a very large library of custom functions. While some can be used or re-used in a standalone manner, there are special functions called hooks that allow you to access specific points in the Drupal execution thread. As such, some have to be implemented in a custom module, and some can be used in the template layer (template hooks). They’re called ‘hooks’ because you rename the first part of the function depending on where you implement it.

For example, if you implement the template hook called _hook_preprocess_page()_ in a theme called _mytheme_, you would rename it _mytheme_preprocess_page()_. If you implement _hook_form_alter_ in a custom module called _mysite_common_, it would be _mytheme_common_form_alter()_.

The full, searchable list of hooks is in the [Drupal Core API.](https://api.drupal.org/api/drupal/core!core.api.php/group/hooks/)

## Views
This is a UI for a custom database query generator. It’s fairly unique to Drupal. There’s an optional setting in Drupal 8 `/admin/structure/views/settings`: ‘Show the SQL query’ that can be helpful if you know SQL.

Views is used to build many Drupal lists, such as the primary list of content, blocks, files, etc. The place to add or edit _Views_ is under the _Structure_ tab:

![Views Screenshot](/assets/images/blog/Node-4.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Check out these views.</span>

## Taxonomy
This is fairly similar to most other CMSs, though they could not resist making it a bit fussy. _Taxonomy_ is the part of the site that holds all of the taxonomy types/groups (called _Vocabularies_), and those contain Terms. It is also under the Structure tab:

![Taxonomy Screenshot](/assets/images/blog/Node-5.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Taxonomy under Structure tab.</span>

## D.O
This is shorthand for Drupal.org, the primary drupal site.

## Drush
This is the command-line tool for Drupal. Very useful for clearing your cache (`drush cr`).

And there you have it! That’s the most common set of (potentially) confusing terms that you’ll run across when you’re learning to use Drupal. Good luck!
