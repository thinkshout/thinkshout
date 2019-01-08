---
title: Creating Dynamic Menus in Jekyll
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: alex
published: true
featured: false
short: Building a CMS-like menu system without the overhead of the CMS
tags:
- Jekyll
- menu
- recursive
- dynamic
- automatic
- nonprofit
- nonprofit tech
- Github
date: 2014-12-02 12:00:00
---
When thinking about the "pros" of using a CMS, the robust menu system that is provided "out of the box" is usually at the top of the list. That said, when we decided to use Jekyll to build a production quality site for [Feeding Texas](http://www.feedingtexas.org/) we knew creating a content manager-friendly menu system was a must.

There were many challenges in building a production-ready site in Jekyll, which I covered in my last blog post, [Success Building CMS-less Production Sites with Jekyll](/blog/2014/10/success-building-cmsless-production-sites-with-jekyll), but the generation of a menu system that would make content management simple for end users was surprisingly vexing – mostly because this is taken for granted when using a CMS like Drupal.

As I embarked upon this task, my initial Googling surfaced several approaches for generating a structured menu in Jekyll, but none of them satisfied both of the criteria I had defined as necessary to make the menu system ready for a non-technical client to use easily:

* __Recursive__ – I want my primary (header) and secondary (navigation) menu structure and the associated styling (e.g. active page underlined) to hold true regardless of where I am in the menu tree. This is useful when a landing page that is linked from the primary menu has several siblings you'd like to be able to page between via a secondary navigation menu. To visualize this, check out [the Feeding Texas "About" page](http://www.feedingtexas.org/about/).
* __Dynamic__ – when I add a page, I want the menu to be updated... automatically. This is helpful because all content managers need to do is create a new Markdown file and, voila! – a new menu item. 

## Popular Approaches and Why They Fall Short
For both of the above criteria to be true, we cannot use either of the most popular Jekyll menu solutions I found on the web.

### Data-Driven Approach
The data-driven approach I found to be popular \[[1][1],[2][2],[3][3]\] falls short because using a YML data file (e.g. `_data/menu.yml`) to scaffold the menu tree is not dynamic. At worst, the data file needs updating each time we add a page \[[2]\] or, at best, when we add a new menu level \[[1][1]].

### Frontmatter-Driven Approach
Jekyll helpfully stores a `site.pages` variable that can be looped over in the following way to generate a list of all pages in the site.

{% raw %}
~~~html
    <ul>
      {% for p in site.pages %}
        <li>
          <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
      {% endfor %}
    </ul>
~~~    
{% endraw %}

This technique is powerful, but limited. We certainly don't get all we need without some more Liquid work.

For example if we wanted to style the active menu item, we could change the line outputting the link from the above snippet to...

{% raw %}
~~~html
    <a {% if p.url == page.url %}class="active"{% endif %} href="{{ p.url }}">{{ p.title }}</a>
~~~
{% endraw %}

Here we make use of the `page.url` variable, which refers to the URL of the current page, to add special styling to the active menu item.

We could also add arbitrary frontmatter variables to all pages to achieve a number of different goals. For example, if we wanted to order the output of `site.pages` in some arbitrary way, we could add a `weight` frontmatter variable to each page and sort by said property before we start our loop.

{% raw %}
~~~html
    {% assign pages = site.pages | sort:"weight"  %}
    {% for p in pages %}
      do something
    {% endfor %}
~~~
{% endraw %}

We could also group pages we wanted to appear in the same subnav (think back to Feeding Texas' [about](http://www.feedingtexas.org/about/) page linked above).

{% raw %}
~~~html
    {% for p in site.pages %}
      {% if group == "group1" %}
        do something
      {% endif %}
    {% endfor %}
~~~
{% endraw %}

While powerful, these solutions require the maintenance of frontmatter variables among all pages on the site – something a content manager would like to avoid.

## The Solution: USE URLs!
The fact that my initial Googling did not turn up any examples of folks leveraging URLs to generate menus shocked me. URLs are, after all, a machine readable representation of a menu tree!

Using the powerful `site.pages` variable and some fancy Liquid, I was able to achieve a no-maintenance solution for generating multi-level menus:

{% raw %}
~~~html
{% assign url_parts = page.url | split: '/' %}
{% assign url_parts_size = url_parts | size %}
{% assign rm = url_parts | last %}
{% assign base_url = page.url | replace: rm %}

<ul>
{% for node in site.pages %}
  {% if node.url contains base_url %}
    {% assign node_url_parts = node.url | split: '/' %}
    {% assign node_url_parts_size = node_url_parts | size %}
    {% assign filename = node_url_parts | last %}
    {% if url_parts_size == node_url_parts_size and filename != 'index.html' %}
      <li><a href='{{node.url}}'>{{node.title}}</a></li>
    {% endif %}
  {% endif %}
{% endfor %}
</ul>
~~~
{% endraw %}


The code above is set up to be used as [an include](http://jekyllrb.com/docs/templates/#includes). Let's walk through the file to get a better sense of what it's doing...

First we need to get the URL of the current page so we know where we're currently at in the menu tree.

{% raw %}
~~~html
    {% assign url_parts = page.url | split: '/' %}
~~~
{% endraw %}
  

Here we are also splitting the URL into an array so we can ask additional questions like, "how many levels deep are we?"

{% raw %}
~~~html
    {% assign url_parts_size = url_parts | size %}
~~~
{% endraw %}
  
Knowing the size of the array gives us our depth in the menu tree, which is helpful to render items at the same level of depth (again Feeding Texas' [about](http://www.feedingtexas.org/about/) page).

However, knowing our menu depth does not give us all we need to generate an appropriate subnav, as we likely do not want _all_ pages the same depth, but rather pages at the same depth that share the same parent menu item.

For example, if we're on the page generated by `hunger-atlas.md` we want our subnav to contain it and its `snapshot-texas.md` sibling. 

Temp image: ![menu-depth](https://cloud.githubusercontent.com/assets/3582018/4709107/03dd7960-589d-11e4-8ecc-74d444e3a2f5.png)

This currently broken image will be used for the live post:![menu-depth](/assets/images/feeding-texas-menu-depth.png)

We don't want `/news/blog/foo/index.html` although it's at the same menu level as `/learn/communities/hunger-atlas/index.html`.

To accomplish this, we'll generate a `base_url` to give us a relative sense of where we are in the menu tree.

{% raw %}
~~~html
    {% assign rm = url_parts | last %}
    {% assign base_url = page.url | replace: rm %}
~~~
{% endraw %}

Note we're removing the implicit `index.html` from the URL. This assumes we have not set a [permalink](http://jekyllrb.com/docs/permalinks/) for the relevant pages.

Now we're ready to start our loop through `site.pages`:

{% raw %}
~~~html
    <ul>
    {% for node in site.pages %}
      {% if node.url contains base_url %}
        {% assign node_url_parts = node.url | split: '/' %}
        {% assign node_url_parts_size = node_url_parts | size %}
        {% assign filename = node_url_parts | last %}
        {% if url_parts_size == node_url_parts_size and filename != 'index.html' %}
          <li><a href='{{node.url}}'>{{node.title}}</a></li>
        {% endif %}
      {% endif %}
    {% endfor %}
    </ul>
~~~
{% endraw %}

In this loop we ask 3 things – all of which must be true to add a page to the subnav menu:

1. Does this page's URL contain the `base_url`? This eliminates pages at the same menu depth, but with different parent items
2. Is the page at the same menu depth as the page currently being viewed? This eliminates items below the current menu depth
3. Is page's filename `index.html`? This eliminates pages that should exist one level higher in the menu tree

The last point requires a little explanation...

There are two ways of creating pages in Jekyll:

* [Named HTML files](http://jekyllrb.com/docs/pages/#named-html-files)
* [Named folders containing index HTML files](http://jekyllrb.com/docs/pages/#named-folders-containing-index-html-files)

If you're using the former method, you don't need to do check #3. I assumed the latter because it's the more difficult menu generation scenario and many will opt for the clean URLs it produces.

In addition to clean URLs, using the "Named folders" method to create pages allows for implicit parent page detection. Adding a parent page link to the subnav improves the user experience by allowing users to descend and ascend the menu tree. Without a parent page link, if the user clicked a link that took them deeper down the menu tree, they would be presented with a different subnav than the previous page (remember, we only see subnav items at the current level of the menu tree) and have no way of getting back other than to use their browser's "back" button.

Generating the parent page link is straightforward since you already have the `base_url` and know the name of the file will be `index.html`, so I'll spare you the walkthrough.

## Roundup
Although Jekyll is a static site generator, you have all you need when the site is being built to achieve dynamically generated menus without writing a custom plugin. Although it requires some legwork up front, this solution creates a CMS-like user experience for content managers without the performace overhead of the CMS.

That said, after building a dynamic menu system for a platform that does not include one, I'll never take the ease and value of Drupal's menu system for granted again.

[1]: http://christianspecht.de/2014/06/18/building-a-pseudo-dynamic-tree-menu-with-jekyll/
[2]: http://www.tournemille.com/blog/How-to-create-data-driven-navigation-in-Jekyll/
[3]: https://github.com/Painted-Fox/jekyll-site-menus
[4]: http://stackoverflow.com/questions/9053066/sorted-navigation-menu-with-jekyll-and-liquid
