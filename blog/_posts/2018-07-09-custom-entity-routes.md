---
layout: blog
body-class: blog-post
topic: technology
title: Automatic Page Generation with Custom Entity Routes
homepage: false
author: joe
published: true
featured: false
short: Drupal's paragraphs module can be used to make child pages automatically by using custom entity routes.
tags:
  - Drupal Planet
  - Drupal
  - Modules
  - Paragraphs
  - Entity Routes
date: 2018-07-09 09:02:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---

One of the most useful items in the Drupal 8 toolbox is the [Paragraphs Module](https://www.drupal.org/project/paragraphs). By creating custom paragraph types, you can have much finer control over the admin and content creation process in Drupal.

A recent client of ThinkShout needed a content type (office locations) to include 'sub-pages' for things like office hours, services, and other items depending on the location. Most of the sub-page content was pretty simple, but they also needed to have direct links, be printable, and have the same header as the parent page. This ruled out an Ajax solution.

We've been using Paragraphs to make configurable content throughout the site, and since the sub-pages only have Title and Content fields, we thought they would be a good fit here as well. We then decided to explore the possibility of using custom entity routes to fulfill the other requirements.

To start, we created two additional view modes for the sub-page paragraphs called `Sub-page` and `Menu link` containing the Content and Title fields respectively. By keeping these fields in separate view modes, we make it much easier to work with them.

Next we created a [custom module](https://www.drupal.org/docs/8/creating-custom-modules) to hold all of our code, `ts_sub_pages`. In addition to the standard module files, we added the file `ts_sub_pages.routing.yml`, which contains the following:

~~~yml
ts_sub_pages.sub_pages:
  path: '/node/{node}/sub-page/{paragraph}'
  defaults:
    _controller: '\Drupal\ts_sub_pages\Controller\TSSubPagesController::subPageParagraph'
    _title_callback: '\Drupal\ts_sub_pages\Controller\TSSubPagesController::getTitle'
  options:
    parameters:
      node:
        type: entity:node
      paragraph:
        type: entity:paragraph
  requirements:
    _permission: 'access content'

~~~

This defines a unique system path based on the parent node ID and the paragraph entity ID. It would look like `https://example.org/node/12345/sub-page/321`. It also defines the call to the _controller_ and the _title_callback_, essentially a location where we can create functions to manipulate the entity and its route. The `options` define the things to pass into the controller and title callback functions, and we also define access permissions using `requirements`.

One of the odd things about the _controller_ and _title_callback_ calls is that they look like a path, but are not. They have a predefined (and minimally documented) structure. You must do the following to make them work:

* Create two folders in your module: `src/Controller` (case is important).
* Create a file called `TSSubPagesController.php` - this must match the call.
* Define a class matching `TSSubPagesController` in `TSSubPagesController.php`
* Define a function matching `subPageParagraph` inside the `TSSubPagesController` class.

Example below. The names of the controller file, class, and function are up to you, but they must have the same case, and the file and class must match.

Digging into the `TSSubPagesController.php` file, we have a setup like so:

~~~php
<?php

namespace Drupal\ts_sub_pages\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * TS Sub Pages controller.
 */
class TSSubPagesController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function subPageParagraph(Paragraph $paragraph, Node $node, Request $request) {
~~~

Here we have the namespace - this is our module. Note again that the `src` is taken for granted. Next are the Symfony/Drupal `use` statements, to pull in the classes/interfaces/traits we'll need. Then we extend the `ControllerBase` class with `TSSubPagesController`, and define our `subPageParagraph` function. The function pulls in the `$node` and `$paragraph` options we defined in `ts_sub_pages.routing.yml`.

Now we can finally get to work on our sub-pages! Our goal here is to bring in the parent node header fields on every sub-page path. In the Drupal admin interface, go to 'Manage Display' for your content type. In our case it was `/admin/structure/types/manage/location/display`. Scroll to the bottom and under 'Custom display settings' you'll find a link to 'Manage view modes'. We added a mode called `sub-page`, and added all of the fields from our Location's header.

Now we can bring that view of the node into the sub-page using the `subPageParagraph` function we defined above:

~~~php
<?php

public function subPageParagraph(Paragraph $paragraph, Node $node, Request $request) {
  $node_view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
  $node_header = $node_view_builder->view($node, 'sub_page');

  $paragraph_view_builder = \Drupal::entityTypeManager()->getViewBuilder('paragraph');
  $paragraph_body = $paragraph_view_builder->view($paragraph, 'sub_page');

  return ['node' => $node_header, 'paragraph' => $paragraph_body];
}
~~~

We get the node and paragraphs using `getViewBuilder`, then the view modes for each. The node's 'sub-page' view mode contains all of the header fields for the node, and the paragraph 'sub-page' view mode contains the paragraph body. We return these, and the result is what looks like a page when we visit the base paragraph url of `/node/12345/sub-page/321`. The title is missing though, so we can add that with another small function inside the `TSSubPagesController` class (we call it using the `_title_callback` in `ts_sub_pages.routing.yml`):

~~~php
<?php

/**
 * Returns a page title.
 */
public function getTitle(Paragraph $paragraph, Node $node) {
  $node_title = $node->getTitle();
  $paragraph_title = $paragraph->field_title_text->value;

  return $node_title . ' - ' . $paragraph_title;
}
~~~

Now we need to build a menu for our sub-pages. For this we can just use the 'sub-pages' paragraph field on the parent node. In the admin display, this field is how we add the sub-page paragraphs, but in the public-facing display, we use it to build the menu.

First, make sure you include it in the 'default' and 'sub-page' displays as a Rendered Entity, using the "Rendered as Entity" Formatter, which has widget configuration where you need to select the "Menu Link" view mode. When we set up the Paragraph, we put the Title field in the 'Menu Link' view. Now the field will display the titles of all the node's sub-pages. To make them functional links, go to the 'Menu Link' view mode for your sub-page paragraph type, make the Title a 'Linked Field', and use the following widget configuration:

~~~
Destination: /node/[paragraph:parent_id]/sub-page/[paragraph:id]
Title: [paragraph:field_title_text]
~~~

![menu-link-settings.png](/assets/images/blog/menu-link-settings.png){:.center}

Next we need to account for the fact that the site uses URL aliases. A node called 'main office' will get a link such as `/locations/main-office` via the [Pathauto module](https://www.drupal.org/project/pathauto). We want our sub-pages to use that path.

We do this by adding a URL Alias to the sub-page routes on creation (insert) or edit (update). In our module, we add the following functions to the `ts_sub_pages.module`:

~~~php
<?php
/**
 * Implements hook_entity_insert().
 */
function ts_sub_pages_entity_insert(EntityInterface $entity) {
  if ($entity->getEntityTypeId() == 'paragraph' && $entity->getType() == "custom_subpage") {
    _ts_sub_pages_path_alias($entity);
  }
}

/**
 * Implements hook_entity_update().
 */
function ts_sub_pages_entity_update(EntityInterface $entity) {
  if ($entity->getEntityTypeId() == 'paragraph' && $entity->getType() == "custom_subpage") {
    _ts_sub_pages_path_alias($entity);
  }
}

~~~

These get called every time we add or update the parent node. They call a custom function we define just below. It's important to note that we have a custom title field `field_title_text` defined - your title may be the Drupal default:


~~~php
<?php
/**
 * Custom function to create a sub-path alias.
 */
function _ts_sub_pages_path_alias($entity) {
  $sub_page_slug = Html::cleanCssIdentifier(strtolower($entity->field_title_text->value));

  $node = \Drupal::routeMatch()->getParameter('node');
  $language = \Drupal::languageManager()->getCurrentLanguage()->getId();

  $nid = $node->id();
  $alias = \Drupal::service('path.alias_manager')->getAliasByPath('/node/' . $nid);
  $system_path = "/node/" . $nid . "/sub-page/" . $entity->id();

  if (!\Drupal::service('path.alias_storage')->aliasExists($alias . "/" . $sub_page_slug, $language)) {
    \Drupal::service('path.alias_storage')
      ->save($system_path, $alias . "/" . $sub_page_slug, $language);
  }
}
~~~

This function gets the sub-page paragraph title, and creates a URL-friendly slug. It then loads the paragraph's node, gets the current language, ID, and alias. We also build the system path of the sub-page, as that's necessary for the `url_alias` table in the Drupal database. Finally, we check that there's no existing path that matches ours, and add it. This will leave old URL aliases, so if someone had bookmarked a sub-page and the name changes, it will still go to the correct sub-page.

Now we can add the 'Home' link and indicate when a sub-page is active. For that we'll use a custom twig template. The `field.html.twig` default file is the starting point, it's located in `core/themes/classy/templates/field/`. Copy and rename it to your theme's template directory. Based on the field name, this can be called `field--field-sub-pages.html.twig`.

The part of the twig file we're interested in is here:
{% raw %}
~~~twig
{% for item in items %}
  <div{{ item.attributes.addClass('field__item') }}>{{ item.content }}</div>
{% endfor %}
~~~
{% endraw %}
This occurs three times in the template, to account for multiple fields, labels, etc. Just before each of the `for` loops, we add the following 'home' link code:

{% raw %}
~~~twig
{% if url('<current>')['#markup'] ends with node_path %}
  <div class="field__item active" tabindex="0">Home</div>
{% else %}
  <div class="field__item"><a href="{{ node_path }}">Home</a></div>
{% endif %}
~~~
{% endraw %}
Next, we make some substantial changes to the loop:
{% raw %}
~~~twig
{% set sub_text = item.content['#paragraph'].field_title_text.0.value %}
{% set sub_path = node_path ~ '/' ~ sub_text|clean_class %}
{% if url('<current>')['#markup'] ends with sub_path %}
<li{{ item.attributes.addClass('field__item', 'menu-item', 'active') }}>{{ sub_text }}</li>
{% else %}
<li{{ item.attributes.addClass('field__item', 'menu-item') }}><a href="{{ sub_path }}">{{ sub_text }}</a></li>
~~~
{% endraw %}

Here, `sub_text` gets the sub-page title, and `sub_path` the path of each sub-page. We then check if the current url ends with the path, and if so, we add the active class and remove the link.

And that's it! The client can now add as many custom sub-pages as they like. They'll always pick up the parent node's base path so they will be printable, direct links. They'll have the same header as the parent node, and they will automatically be added or deleted from the node's custom context-aware menu.

Hmm, maybe this would make a good [contributed module](https://www.drupal.org/contribute/development)?
