---
layout: blog
body-class: blog-post
topic: technology
title: The Secrets of Keeping Your Content Editors Happy
homepage: false
author: rebecca
published: true
featured: false
short: With contributions from Tracey Whitney and Joe Komenda
tags:
  - Drupal Planet
  - Drupal
  - Luminate
  - CSS
  - Javascript
  - Content Editors
date: 2018-10-30 12:00:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---
Our client is migrating from Luminate CMS to Drupal because they want to improve performance without changing the look or feel of the site. Each of the pages on a Luminate site are like snowflakes - unique. It doesn’t make sense to rebuild those features as structured blocks given that they only appear on one single page. So having the ability to use existing JS and CSS allows us to copy and paste markup without rebuilding a whole structure that wouldn't be repurposed on other pages.

This technically savvy client wants a way to add existing JavaScript and CSS to Drupal pages. So let’s give them the capability of putting raw CSS and JavaScript on their pages. This will help them complete the migration, moving their existing code to Drupal. These are the tools the content editors need to make their website beautiful and effective. If your content editors are more familiar with writing javascript and css here’s how to enable them to keep doing that.

To make this happen, first make a raw field formatter.
- Go to Configuration > Content authoring > Text formats and editors.
- Add a new text format called “Raw”. None of the filters should be enabled since this will be raw output.

![Raw Text Format](/assets/images/blog/Add_a_raw_text_format.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Adding in raw text format</span>

![No Filters Enabled](/assets/images/blog/No_filters_enabled.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>AND...No filters enabled!</span>

Since our client wants to add raw css and javascript to landing pages, we will create a field on the ‘landing page’ content type. It will be Text (formatted, long) and label “Inline CSS”. We will limit it to just one on the page.

![Add field inline](/assets/images/blog/Add_field_inline_css.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Add field inline css</span>

Have it use the Raw text format from the last step. You can limit the field to only this format by installing the package

Composer require drupal/allowed_formats

Be sure to check the “Raw” box on the field page and *save it.*

Now make sure our field is being output.
- Go to Admin > Structure > Types > Manage > Landing page > Display > Full
- Make sure it is enabled and the label is hidden. It should be output in the default format.

![Inline css displayed](/assets/images/blog/Make_sure_inline_css_is_displayed.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Making sure inline css is displayed</span>

Visit a landing page content form by going to Manage > Content > Add content > Landing Page, and put some real css in our new field:

![Add map background raw](/assets/images/blog/Add_map_background_raw_css.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Adding map background raw</span>

We also provide a WYSIWYG place to enter HTML. In this case we need some HTML, perhaps a div, with class=‘map’.

We’re not finished yet! We need to provide a twig template. Look at the output HTML. We get:

~~~html
<!-- THEME DEBUG -->
<!-- THEME HOOK: 'field' -->
<!-- FILE NAME SUGGESTIONS:
* field--node--field-inline-css--landing-page.html.twig
* field--node--field-inline-css.html.twig
* field--node--landing-page.html.twig
* field--field-inline-css.html.twig
x field--text-long.html.twig
* field.html.twig
-->
<!-- BEGIN OUTPUT from 'core/themes/classy/templates/field/field--text-long.html.twig' -->
<div data-quickedit-field-id="node/589/field_inline_css/en/full" class="clearfix text-formatted field field--name-field-inline-css field--type-text-long field--label-hidden field__item">.map {
background: url(http://www.example.com/assets/images/background-images/banner-landing-page/map.png) center no-repeat;
padding-top: 80px;
min-height: 350px;
}</div>
<!-- END OUTPUT from 'core/themes/classy/templates/field/field--text-long.html.twig' -->
~~~

in our output! Notice the `<div>` surrounding our CSS! We don’t want that! So it’s time to create a Twig template without extra div’s. One that will output raw CSS.

We will go from this (notice all the extra `<div>`s)

~~~html
{% raw %}
{% if label_hidden %}
   {% if multiple %}
       <div{{ attributes.addClass(classes, 'field__items') }}>
           {% for item in items %}
               <div{{ item.attributes.addClass('field__item') }}>{{ item.content }}</div>
           {% endfor %}
       </div>
   {% else %}
       {% for item in items %}
           <div{{ attributes.addClass(classes, 'field__item') }}>{{ item.content }}</div>
       {% endfor %}
   {% endif %}
{% else %}
   <div{{ attributes.addClass(classes) }}>
       <div{{ title_attributes.addClass(title_classes) }}>{{ label }}</div>
       {% if multiple %}
       <div class="field__items">
           {% endif %}
           {% for item in items %}
               <div{{ item.attributes.addClass('field__item') }}>{{ item.content }}</div>
           {% endfor %}
           {% if multiple %}
       </div>
       {% endif %}
   </div>
{% endif %}
{% endraw %}
~~~


And we should do three things:
1. Remove all `<div>` tags,
2. Send it through a raw filter, and
3. Surround it with `<style>` tags so we will go to this >

~~~html
{% raw %}
<style>
{% if label_hidden %}
   {% if multiple %}
           {% for item in items %}
               {{ item.content|raw }}
           {% endfor %}
   {% else %}
       {% for item in items %}
           {{ item.content|raw }}
       {% endfor %}
   {% endif %}
{% else %}
       {% if multiple %}
           {% endif %}
           {% for item in items %}
               {{ item.content|raw }}
           {% endfor %}
           {% if multiple %}
       {% endif %}
{% endif %}
</style>
{% endraw %}
~~~

Then we get in output:

~~~html
<!-- THEME DEBUG -->
<!-- THEME HOOK: 'field' -->
<!-- FILE NAME SUGGESTIONS:
x field--node--field-inline-css--landing-page.html.twig
* field--node--field-inline-css.html.twig
* field--node--landing-page.html.twig
* field--field-inline-css.html.twig
* field--text-long.html.twig
* field.html.twig
-->
<!-- BEGIN OUTPUT from 'themes/custom/example/templates/field/field--node--field-inline-css--landing-page.html.twig' -->
<style>
.map {
background: url(http://www.example.com/assets/images/background-images/banner-section-landing-page/map.png) center no-repeat;
padding-top: 80px;
min-height: 350px;
}
</style>
<!-- END OUTPUT from 'themes/custom/example/templates/field/field--node--field-inline-css--landing-page.html.twig' -->
~~~

Tada! The CSS shows up ready to use on the page! The same technique can be used to allow content editors to put JavaScript on the page! Instead of putting `<style>` tags around the template, make it `<script>` tags instead.

Make sure you meet your content editors where they are, give them tools they can use but don’t use this technique with novice or non-technical content editors.
