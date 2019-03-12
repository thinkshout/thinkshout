---
layout: blog
body-class: blog-post
title: Up and Theming with Drupal 8
author: joe
published: true
featured: true
short: Part 2 of our series dives into Drupal 8 theming.
tags:
  - Development
  - Drupal Planet
  - Drupal 8
  - Theming
  - Twig
date: 2015-11-23 11:00:00
image: /assets/images/thinkshout-logo.png
topic: technology
header-image: /assets/images/ts_redesign/blog/up-and-theming1.jpg
header-image-alt: "Image: Model Thinkshout Employees"
---

Drupal 8 is [finally here](https://www.drupal.org/8)! We’ve been digging into the code and learning how to install D8 in a way that allow us to sync sites and use it for production work. A lot of things have changed, which we covered in our previous article, [Up and Running with Drupal 8](/blog/2015/11/up-and-running-with-drupal-8/). The next step is to see what’s changed in the theming layer, installing a basic theme, and working with the new Twig templating system. There’s a good deal to cover, so let’s [jump in](http://twig.sensiolabs.org/)!

## Creating a Theme##

The steps for setting up a basic site theme are fairly simple: create a `custom/THEMENAME` directory in `web/themes`, and then add a `THEMENAME.info.yml` file with the following:

~~~yaml
name: THEMENAME Theme
description: 'D8 theme for THEMENAME site.'
package: Custom
# base theme: classy
type: theme
version: 1.0
core: 8.x
regions:
  header: Header
  content: Content # required!
  sidebar_first: 'Sidebar first'
  footer: Footer
~~~

Then you can enable your theme (`administer » themes`) in the interface. Note that uncommenting  `base theme: classy` will cause you to set Classy as a parent theme. We feel that Classy is great if you want a lot of useful examples, but really clutters up the markup, so use at your own discretion. [After rc1](https://www.drupal.org/node/2575421), the default theme will be ‘stable,’ and you may want to pull all of the core templates into your theme to ensure you’re working from the latest updated template code.

Also, the theme name must not contain hyphens. So `/theme-name/` is invalid (it won’t even show up!), but `/theme_name/` is fine.

Now we’ll want to start customizing our theme. Let us say we have a content type called ‘blog’ (machine name: `blog`), with a field type called ‘Publish Date’ (machine name: `field_publish_date`).

Despite setting the label of `field_publish_date` to ‘inline,’ it’s wrapping to a new line due to the fact that it’s a simple, unstyled `<div>`.

Worse, it has no classes to specifically style it. Let’s set ourselves some goals:

1. Add the inline styling class(s).
2. Change the markup for this field, so that we have a class for the label.
3. Add CSS to style the label, but ONLY for the ‘Blog’ content type.

The documentation for this seemingly simple task is obfuscated and evolving right now, but we were able to get it working correctly using the following steps:

**Step 1**: Turn on [twig debug mode](https://www.drupal.org/node/1906392). We also found it helpful at this point to make a copy of `web/sites/example.settings.local.php` in `web/sites/default/` and uncomment the following in `settings.php`:

~~~php
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
~~~

This will allow you to [disable caching](https://www.drupal.org/node/2598914) during development, which is no longer a simple checkbox in the performance section. Note that disabling caching can be tricky; the `drush cr` (cache rebuild) command is the most reliable way to ensure the cache is really cleared. You’ll also have to rebuild the cache at least once after turning caching off, so the new cache settings are applied.

**Step 2**: Make a custom field template.

In this case, the suggested debug fields are:

~~~html
<!-- FILE NAME SUGGESTIONS:
   * field--node--field-publish-date--blog.html.twig
   * field--node--field-publish-date.html.twig
   * field--node--blog.html.twig
   * field--field-publish-date.html.twig
   * field--datetime.html.twig
   x field.html.twig
-->
<!-- BEGIN OUTPUT from 'core/modules/system/templates/field.html.twig' -->
~~~

The highlighted line above shows the template currently being used, suggestions for increased specificity, and the file location (`core/modules/system/templates/`).

We want to update `field_publish_date` globally, so we’ll create a template called `field--field-publish-date.html.twig`

To do this, we copy `field.html.twig` from the core theme (see the ‘BEGIN OUTPUT’ line above for the path), and rename it in our theme’s folder to `field--field-publish-date.html.twig`. Now when we reload, we see the following (if your cache is disabled, of course, otherwise drush cr will clear the cache):

~~~html
<!-- FILE NAME SUGGESTIONS:
   * field--node--field-publish-date--blog.html.twig
   * field--node--field-publish-date.html.twig
   * field--node--blog.html.twig
   x field--field-publish-date.html.twig
   * field--datetime.html.twig
   * field.html.twig
-->
<!-- BEGIN OUTPUT from 'themes/custom/THEMENAME/templates/field--field-publish-date.html.twig' -->
~~~

Now we can begin to update the markup. The relevant code is:

{% raw %}
~~~html
{% if label_hidden %}
  ... (we don’t care about the label_hidden stuff)
{% else %}
  <div{{ attributes }}>
    <div{{ title_attributes }}>{{ label }}</div>
    ...
{% endif %}
~~~
{% endraw %}

To add the inline styling class, we add the following to the top of the template (below the comments):

{% raw %}
~~~html
{%
  set classes = [
    'field--label-' ~ label_display,
  ]
%}
~~~
{% endraw %}

And then update the label’s parent div attributes:

before: `<div{{ attributes }}>`
after: {% raw %}<div{{ attributes.addClass(classes) }}>{% endraw %}

Now the correct class is in place, but we see no change yet - because the `<div{{ title_attributes }}>` isn’t populating any classes. To fix that, we add the following, again at the top of the template:

{% raw %}
~~~html
{%
  set title_classes = [
    'field__label',
    'field__publish-date-label',
    label_display == 'visually_hidden' ? 'visually-hidden',
  ]
%}
~~~
{% endraw %}

And update the div:

before: `<div{{ title_attributes }}>{{ label }}</div>`
after: {% raw %}`<div {{ title_attributes.addClass(title_classes) }}>{{ label }}</div>`{% endraw %}

Rebuild the cache (drush cr) and… success! well sort of - we still have to add CSS. Note that we also added a custom class of 'field__publish-date-label' in case we want to style it directly.

**Step 3**: Add a `THEMENAME.libraries.yml` file to hold attachment library definitions.  

This is pretty simple; it’s a file with the following:

~~~yaml
blog:
  version: 1.x
  css:
    theme:
      css/blog.css: {}
  js:
    js/blog.js: {}
  dependencies:
    - core/jquery
~~~

We then add the directories (`/css` and `/js`) and files (`blog.css/js`). We’ve also added a jQuery dependency, just so you can see how that’s done. If we had something simple that could be done with [Vanilla JS](http://vanilla-js.com/) we could leave it off. Note that this won’t actually do anything until we follow step 4 below.

**Step 4**: Add a `THEMENAME.theme` file to hold theme hooks (this is actually a PHP file, so start it with `<?php`).

This is the code that appends the library based on the content type. The trickiest part of this is figuring out the correct format of `hook_preprocess_HOOK()`:

~~~php
function THEMENAME_preprocess_node__blog(&$variables) {
  $variables['#attached']['library'][] = 'THEMENAME/blog';
]
~~~

The theme hook format for content types is to use `node__MACHINENAME` format - two underscores.

After that, rebuild your cache (`drush cr`), and your CSS and JS files should be loading on every instance of that content type, regardless of the page. (full or teaser)

And that’s it! Note that we could have changed the markup in any number of ways to suit our designs, or even make the template specific to the content type as well as the field.

### Disclaimer###

The post was written at the end of 2015 while Drupal 8 was still in a Release Candidate stage. While some effort will be made to keep the post up-to-date, if it’s after 2016, you should probably add the current year to your Google search, or better yet, check the docs on [Drupal.org](http://drupal.org).  
