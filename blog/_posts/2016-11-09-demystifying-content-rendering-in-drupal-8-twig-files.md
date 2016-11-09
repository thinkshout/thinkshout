---
layout: blog
body-class: blog-post
topic: technology
title: Turning a New Leaf - Demystifying Content Rendering in Drupal 8 Twig Files
homepage: true
author: amy  
published: true
featured: true
short: New to Drupal 8 theming? These tips might make the learning curve a little less steep.
tags:
  - Drupal planet
  - Drupal 8
  - Twig
  - Content rendering
date: 2016-11-09 14:00:00
image: https://thinkshout.com/assets/images/blog/content-rendering-header.jpg
header-image: /assets/images/blog/content-rendering-header.jpg
header-image-alt: "Content Rendering in Drupal 8"
---
Have you ever stared at your computer screen with a deer-in-headlights expression on your face thinking “I have no idea where to even start with this…”? That was me about a month ago when I was asked to help theme a Drupal 8 project for the very first time. Getting started theming in Drupal 8, still being in a fairly new iteration with a programming style differing from Drupal 7, was both an exciting and daunting task. It was exciting in the sense that I heard good things from those who’ve already started theming in D8, and daunting because there’d been a lot of changes between D7 and D8.

One of the differences between Drupal 7 and 8 is template files; PHPTemplate (.tpl.php) files were replaced with Twig (.html.twig) files. [Twig](http://twig.sensiolabs.org/) is a robust and elegant template engine for PHP. Once I started working with Twig, I instantly loved it. I found it to be lightweight, fairly quick to pick up, and very readable. Not only that, but I had what felt like ultimate control to the markup, including wrapping elements and rendering exactly the ouput I needed. Often with Drupal 7, wrapping elements in a `<div>` requires assistance from a back-end developer.

With this newfound enthusiasm, I set out to write the best twig code ever! In order to find the output I needed, I used the Twig function [dump()](http://twig.sensiolabs.org/doc/functions/dump.html). This function “dumps” a variable’s information right on the screen. This proved highly useful until I realized I needed to dig deeper into the arrays and objects contained within the variable. There was only so much guess work I could do here before getting epically frustrated, seemingly wasting valuable time looking for an image file’s path.

Though there are a handful of debugging methods to choose from, I had the best luck getting what I needed by using [PHPStorm to debug Twig files](https://dev.acquia.com/blog/debugging-drupal-8/debugging-twig-templates-in-drupal-8-with-phpstorm-and-xdebug/25/08/2016/16586). That’s right, front-end friends, PHPStorm isn’t just for back-end PHP-coding devs. It can be a great tool for front-end programmers as well!

After following the steps listed in [Lubomir Culen’s post about debugging Twig templates](https://dev.acquia.com/blog/debugging-drupal-8/debugging-twig-templates-in-drupal-8-with-phpstorm-and-xdebug/25/08/2016/16586), I began to look for templates in the following path `sites/default/files/php`. From my understanding, opening a template folder gains access to the current template version the project is using, hence the long hash. 

![Content rendering 1](/assets/images/blog/content-rendering-1.png)

If a change is made to the template, an additional hash file is created and a new breakpoint will need to be set. If at any point the hash template files get overwhelming, clearing the cache (running `drush cr all`) will reset the PHP folder and the template files, reducing the hash files to one per template folder.

First off, I needed to acclimate myself to translating PHPStorm syntax into Twig. For example, copying a variable name in PHPStorm produces a syntax like this: `$context[‘page’][‘#title’]->arguments[‘@name’]`. That gets translated into the twig file like so: `page[‘#title’].arguments[‘@name’]`. Here’s what my PHPStorm screen looked like while working on this solution:

![Content rendering 2](/assets/images/blog/content-rendering-2.png)

Some patterns and tricks I found helpful:

* Ignoring `$context` and starting with the main content variable.
* Strip array syntax, i.e. `[‘page’]` = `page`.
* If arrays exist next to each other, separate them with periods. Ex. `[‘page’][‘content’]` = `page.content`.
* If an array has a #, @, or other symbol associated, keep its integrity. No period is needed here. Ex. `[‘page’][‘#title’]` = `page[‘#title’]`, and `arguments[‘@name’]` stays the same.
* If an arrow exists, treat the method (what comes after the ->) in the same manner as arrays. Ex. `[‘#title’]->arguments` = `[‘#title’].arguments`
* If you’re having trouble rendering the desired output, try adding `.value` to the end of the render code and see if that does the trick. 
* Use `dump()` simultaneously with PHPStorm’s suggested variable path.
* Refer to the [Twig documentation](http://twig.sensiolabs.org/documentation) for other handy built-in features.

Up until the moment I got PHPStorm doing the heavy lifting, my team and I were relying soley on the `dump()` Twig function. We were halfway through the project when I discovered a value was no longer present. The disappearance was due to a template’s reliance on a value being rendered via an array placement, i.e. `content.tile.3['#markup']`, the ‘3’ referring to the 4th placement in the ‘tile’ array. To alleviate potential confusion, ‘tile’ happened to be the custom field group where the `field_to_render` existed, and the `field_to_render` was the 4th field in the list of fields. When a field was moved within the ‘tile’ field group, the code broke. Once I had access to the phpstorm debugger, I was able to see a better way to render this element, i.e. `content.field_to_render`. It suddenly dawned on me that our project needed some tidying, so I rolled up my sleeves and got to work. 

These are the strategies I established during my clean-up process:

* Create the shortest render code possible with the closest placement to the main content variable. This will be the most stable. My array placement example mentioned previously is a good example of this. The same value can be present and rendered in numerous ways. 
* If rendering a field, use this pattern: `content.field_to_render`. This will render the field object, inheriting any backend logic that’s been applied to that field existing in the view_mode you are theming. 
* If you prefer having just the markup or integer value, try adding a `.value` to the end. Examples: `content[‘#node’].nid.value` will provide just the node id, and `content.node_title` will render the title object whereas `content[‘#node’].title.value` will render the title as a string.
* The first element in an array might be the most stable. For example, we often use the media module which can add complexity to a media item’s data structure. In order use a node’s image as a background for a `<div>`, this is the best approach we found: `<div class=”banner-image” style="background-image: url({{file_url(content.field_banner_image.0['#item'].entity.uri.value)}})">`
.

Any change can be tough to navigate, but it’s often well worth the effort. My experience theming in Drupal 8 thus far has been lovely, and fairly intuitive. I find it offers front-end developers more authority over the markup than its predecessor, and makes me excited for the future of theming in Drupal 8. If you were at all daunted by the thought of theming in Drupal 8, I hope this post helps you in your future twig debugging endeavors!

_Note:_ [Devel](https://www.drupal.org/project/devel) and [Kint](http://raveren.github.io/kint/) are a couple additional tools available for debugging Twig variables, and I mention those in case others find them useful. More information on how to set those tools up for debugging Twig files (and more!) can be found in this [Drupal 8 Theming Guide](https://sqndr.github.io/d8-theming-guide/twig/twig-debug.html) and on Amber Matz’s [Let’s Debug in Drupal 8!](https://drupalize.me/blog/201405/lets-debug-twig-drupal-8) post. 

If you’re new to Drupal 8 theming, I would start with the resources Amber specifies in her “Editor’s notes”, and [sqndr’s D8 theming docs](https://sqndr.github.io/d8-theming-guide/). Debugging twig files is an intermediate topic.

If you have any personal experience with Drupal 8 theming, or insight you’d like to share, I’d love to hear about it in the comments section!
