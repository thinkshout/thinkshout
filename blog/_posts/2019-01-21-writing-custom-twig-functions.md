---
layout: blog
body-class: blog-post
topic: technology
title: Writing Custom Twig Functions
homepage: false
author: maria
published: true
featured: false
short:
tags:
  - Drupal Planet
  - Drupal
  - Twig
  - Drupal 8
date: 2019-01-21 12:00:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---
When Drupal 8 came out, it introduced the Drupal community to the concept of separating the theming layer from the logic layer through the [Twig](https://twig.symfony.com/) templating language. This had many advantages. For one, instead of needing to know PHP, a themer could just know Twig  -- an extremely stripped-down templating engine that has a [few syntax elements, minimal built-in operators, and only about 50 provided functions.](https://twig.symfony.com/doc/2.x/) Additionally, the limited list of available functions makes it much harder to shoehorn heavy logic or even more dangerous things like SQL queries directly into the theming layer.

There are, of course, trade-offs. While the list of functions Twig provides is quite robust, it didn’t take long for Drupal developers to recognize snippets of code they needed to do over and over again within their templates. As such, Drupal provided [a handful of custom functions](https://www.drupal.org/docs/8/theming/twig/functions-in-twig-templates) and [filters](https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates) specific to core functionality, like the ‘without’ filter, which “Removes child elements from a copy of the original array” -- i.e. lets you print the contents of a render array without certain fields.

The contrib space provides even more options for Twig themers -- modules like [Twig Tweak](https://www.drupal.org/docs/8/modules/twig-tweak/cheat-sheet-8x-2x) or [Twig Field Value](https://www.drupal.org/project/twig_field_value) provides additional functions and filters for things themers often need to do over and over, like render a block within a template, or grab a field’s raw value.

But sometimes you still find yourself repeating the same code over and over within your templates. Maybe it’s a bit of logic specific to the project you’re working on. Or maybe it’s a piece of code that needs logic too complex to be put in a template. Or maybe it requires context not easily accessible within the template, like a setting controlled in the Drupal admin area.

In these cases you can create your own custom Twig functions.

###What you’ll need:

Creating a custom Twig filter is relatively simple. You’ll just need the following things to begin:

- A custom module you can add code to
- A service declaration .yml file with reference to the twig.extension tag
- A class that extends the `\Twig_Extension` class

If you have those things, you can create as many Twig filters or functions as you’d like from within one class file. Making the filters or functions available is just one cache clear away!

###A practical example:

Note, the finished module created below is also available here:
