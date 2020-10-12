---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: 6 Drupal Modules to Improve Administration/Editorial Usability
created: 1248159600
permalink: blog/2009/07/andrea/6-drupal-modules-improve-administrationeditorial-usability/
tags:
- Drupal
- Usability
- Drupal Planet

short: Cut down on Drupal admin interface clutter, and help out Drupal content editors.
author: andrea
---
<p>Yesterday I built out a quick Drupal site for a fairly non-technical client. He manages a busy team and doesn't have the time for me to train his staff on the intricacies of Drupal content administration. The project also has a shoestring budget, so I wanted to keep things as simple as possible. Below are a few Drupal modules and tricks that I used to cut down on Drupal admin interface clutter, and more importantly, to make the site <b>bombproof</b> to unexperienced Drupal content editors.</p>

<h2>Site Configuration Permissions</h2>
<p><a href="http://drupal.org/project/config_perms" title="http://drupal.org/project/config_perms">http://drupal.org/project/config_perms</a><br />
<br />
Personally, I love leveraging the "site information" admin screen in Drupal, and I hate that generally you can't expose this admin screen to Drupal admins w/o also exposing a lot of the more sensitive "guts" of Drupal. This module provides more granular site configuration permissions.</p>
<p>As an admittedly ugly, but really quick, side hack, I also used a quick "display:none" in the CSS of the site information screen so that my new Drupal admins could edit the site name, site email, slogan, and mission fields - but not the "default front page" or "Anonymous User" fields.</p>
<h2>Blocks as Nodes</h2>
<p><a href="http://drupal.org/project/nodeblock" title="http://drupal.org/project/nodeblock">http://drupal.org/project/nodeblock</a><br />
<a href="http://drupal.org/project/search_block" title="http://drupal.org/project/search_block">http://drupal.org/project/search_block</a><br />
<a href="http://drupal.org/project/ctm" title="http://drupal.org/project/ctm">http://drupal.org/project/ctm</a><br />

<br />
We've all played around with similar solutions for giving Drupal content editors limited access to editing blocks. There are many great solutions to this. I really like using the three modules above. The Node Block module allows you to create new content types that are automatically turned into blocks - w/o the need of using Views. It also provides "edit" links at the bottom of the published blocks, so that editors don't have to hunt to find where to edit this content. Because I know the placement of these blocks and just want to allow the editor to edit them, I give the editor permission to edit content of the Node Block type - but not the perms to add or delete these nodes.</p>
<p>The only issue with this approach is that your block nodes are still exposed to Drupal's search. There are many ways around this. The Restricted Search module (oddly named search_block) allows you to quickly exclude your Node Block content types from search results.</p>
<p>If you go with the the Node Block approach, but also want allow your content administrators to manage menu items for certain types of full-page content, you can use the Menu Settings per Content Type module to remove the menu fieldset on the edit forms of your Node Block content types. As an added bonus, this module allows you to define which menus should be available per content type. In other words, you can limit your content editors to adding menu links to certain menu lists by the type of content they are creating. In the case of the site that I just built, I allow my content editors to add menu items to the primary links when creating new pages - but not the secondary links menu or the navigation menu.</p>
<h2>Cleaning the Node Edit Screen</h2>
<p><a href="http://drupal.org/project/vertical_tabs" title="http://drupal.org/project/vertical_tabs">http://drupal.org/project/vertical_tabs</a><br />
<a href="http://drupal.org/project/nodeformcols" title="http://drupal.org/project/nodeformcols">http://drupal.org/project/nodeformcols</a><br />
<br />
For newbies, the node edit screen can be really intimidating - especially for content types with many CCK fields. The Vertical Tabs module helps consolidate all those pesky fieldsets that tend to clutter the bottom of your node edit form. The Node Form Columns module allows you to break out fieldsets into two columns. This is helpful if you are using FileField Inline Images, as described here: <a href="http://mustardseedmedia.com/podcast/episode29" title="http://mustardseedmedia.com/podcast/episode29">http://mustardseedmedia.com/podcast/episode29</a></p>

<h2>A Special Content Type for the Front Page</h2>
<p>I think that at one point or another, all of us Drupalistas have had the experience of a client calling up frantically to say that they accidentally deleted or orphaned their homepage node. There are many ways around this. You can use node access modules. You can create your homepage as a panel, etc., etc. One quick approach that I like (and which requires no additional module installation) is to create a separate front page content type - and then only give content editors permission to edit this node, but not add/delete content of this type.</p>
