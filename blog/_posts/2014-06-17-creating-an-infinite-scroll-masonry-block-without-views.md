---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: "Creating an Infinite Scroll Masonry Block Without Views"
published: true
featured: false
author: alex
date: 2014-06-17 17:00:00
short: Having trouble applying infinite scroll to custom block content? We've got a process for that.
tags:
- masonry
- Drupal Planet
- Drupal
- Javascript
---

The [Views Infinite Scroll module](https://drupal.org/project/views_infinite_scroll) provides a way to apply infinite scroll to the output of a view, but if you want to apply infinite scroll to custom block content, you're out of luck. I found myself in this position while developing a recently-launched site for [The Salmon Project](http://www.salmonlove.com), which I'll use as a loose reference point as I walk you through my solution to applying both Masonry and Infinite Scroll to custom block content.

## Overview

1. Creating a block to hold our paged content that can be placed on a page
1. Generating a paged content array to return as block content
2. Applying Masonry to the paged content block
3. Applying Infinite Scroll to the paged content block
4. Creating an Infinite Scroll trigger

### Creating a block to hold paged content
The first step is creating a block to hold our custom paged view that can be placed on a page. To create the block, we'll use a `hook_block_info()` followed by a `hook_block_view()`.

~~~php
<?php
function my_module_block_info() {
  $block['masonry_content'] = array(
    'info' => 'Masonry content',
  );
  return $block
}

function my_module_block_view($delta = '') {
  $block = array();
  $block['subject'] = '';
  $block['content'] = my_module_masonry_content();
}
~~~

Here, we've defined which function we'll be generating our paged view from; namely `my_module_masonry_content`.

### Generating a paged content array
Within our `my_module_masonry_content` function, we'll create a paged view of nodes. To do so, we'll use an EntityFieldQuery with the "pager" property, which causes the results of the query to be returned as a pager.  

~~~php
<?php
$query->pager(3);
~~~

The argument passed to the pager function determines how many results at a time will be returned; this is analogous to setting the number of items to be shown per page in a view – keep this bit in mind, as we'll return to it later when implementing the infinite scroll.


Now we'll add some query conditions and, finally, execute the query.
These conditions are, of course, site specific, but I'm including them as an example for thoroughness. For help constructing your EntityFieldQuery query, see [the EntityFieldQuery api documentation page](https://api.drupal.org/api/drupal/includes!entity.inc/class/EntityFieldQuery/7).

~~~php
<?php
$query->fieldCondition('field_example', 'value', array('value1', 'value2'), 'IN');
$query->propertyCondition('status', '1');
$results = $query->execute();
~~~

In this example, I've requested all nodes that have a `field_example` value of `value1` or `value2` and are published (i.e. node status property is equal to 1).

Once we have our results set, we will need to create a renderable array to return as the block content.

~~~php
<?php
foreach ($node_result['node'] as $row) {
  $node = entity_load_single('node', $row->nid);
  $output[] = node_view($node, 'category_term_page');
}
~~~

Then we'll apply pager theming to the output by explicitly adding it to the returned renderable array.

~~~php
<?php
$output['pager'] = array('#theme' => 'pager');
~~~

We then return our output array and get to the JavaScript…

### Applying Masonry to the paged content block
To apply Masonry to the paged block content, we'll need some JavaScript so let's create a new JavaScript file within our module's js directory (`js/my_module.js`). This file will depend on the [Masonry JavaScript library](https://github.com/desandro/masonry) so we'll need to load it in addition to our new, custom JavaScript file.  

---

#### Loading the required libraries
For optimal performance, we only want to load our JavaScript when the `masonry_content` block is present. To conditionally load the JavaScript we'll use a `hook_block_view_alter()`.

~~~php
<?php
function my_module_block_view_alter(&$data, $block) {
  // only load libraries if masonry_content block is present
  if ($block->module == 'my_module' && $block->delta == 'masonry_content')
    $module_path = drupal_get_path('moduel', 'my_module');
    $data['content']['#attached']['js'][] = $module_path . '/js/my_module.js';
    $masonry_path = libraries_get_path('masonry');
    $data['content']['#attached']['js'][] = $masonry_path . '/dist/masonry.pkgd.min.js';
  }
}
~~~
---

Now that we've got our required JavaScripts, let's take a look at how to apply Masonry to our paged content block.

~~~javascript
// within my_module.js
var container = $('#my-module-masonry-content);
container.masonry({
  // Masonry options
  itemSelector: '#my-module-masonry-content article.node'
});
~~~

In this case, we're selecting the \<div> that has our block id and the node items within that \<div>.

Doing this will apply Masonry _once_ to the items present after the initial page load, but since we are going to be loading more items via the pager, we'll need to re-apply Masonry after those new items are loaded. We haven't defined the "change" action yet, but will later when implementing the infinite scroll JavaScript.

~~~javascript
// necessary to apply masonry to new items pulled in from infinite_scroll.js
container.bind('change', function() {
  container.masonry('reloadItems');
    container.masonry()
  });
});
~~~

Now that we've got Masonry applied to our block content, let's move on to getting the infinite scroll behavior in place.

## Applying Infinite Scroll to the paged content block
To pull new items into our content block (to which Masonry is being applied) we'll leverage the [Autopager library](https://code.google.com/p/jquery-autopager). This means we'll need to add Autopager to the list of JavaScript to be loaded conditionally when our block is present.  

---

#### Loading more required libraries
Again, we'll use `drupal_get_path()` and `libraries_get_path()` to retrieve  more required JavaScript from within our `hook_block_view_alter()`.

~~~php
<?php
$autopager_path = libraries_get_path('autopager');
$data['content']['#attached']['js'][] = $autopager_path . '/jquery.autopager-1.0.0.js';
~~~
---

Now that we've got Autopager and `my_module_infinite_scroll.js` loaded, let's apply the infinite scroll…

The first thing we need to to is define the parameters that will be passed to Autopager.

~~~php
<?php
// Make sure that autopager plugin is loaded
if($.autopager) {
  // define autopager parameters
  var content_selector = '#my-module-masonry-content';
  var items_selector = content_selector + 'article.node';
  var next_selector = '.pager-next a';
  var pager_selector = '.pager'
~~~

Notice that `$content_selector` matches the selector we used to apply Masonry to each piece of block content. This is because Autopager will, behind the scenes, retrieve more content similar to what's already on the page when we click the "next" link.

The `$next_selector` and `$pager_selector` selectors are what target the "next" and "1, 2, 3…" links our pager exposes and, not incidentally, what Autopager uses to retrieve the next set of content. Recall from above our query returns 3 nodes at a time so the "next" link will cause 3 more nodes to be shown.

Though necessary to retrieve more content, we don't want to see these pager links so let's hide them.

~~~javascript
$(pager_selector).hide();
~~~

…and now create our Autopager handler.

~~~javascript
var handle = $.autopager({
  autoLoad: false,
  appendTo: content_selector,
  content: items_selector,
  link: next_selector,
  load: function() {
    $(content_selector).trigger('change');
  }
});
~~~

The `$(content_selector).trigger('change')` bit is a key component of this snippet because the "change" action is what we are using to apply Masonry to new items added to our block (see the `container.bind('change'…` bit above).

## Triggering the infinite scroll function

The Autopager handler we just defined acts as our gas with respect to the infinite scroll action, but we also need a brake. The following snippet, taken from `views_infinite_scroll.js` uses some fancy math to determine when the user has hit page bottom and only calls `handle.autopager('load')` when this is the case, effectively acting as the brake.

~~~javascript
// Trigger autoload if content height is less than doc height already
var prev_content_height = $(content_selector).height();
do {
  var last = $(items_selector).filter(':last');
  if(last.offset().top + last.height() < $(document).scrollTop() + $(window).height()) {
    last = $(items_selector).filter(':last');
    handle.autopager('load');
  }
  else {
    break;
  }
}
while ($(content_selector).height() > prev_content_height);
~~~

You'll notice on [The Salmon Project site](http://www.salmonlove.com) I am not using infinite scroll; instead I opted for a "View more" button to trigger the `autopager('load')` action and some logic in the function bound to the "change" action to hide said button.

Regardless of the method you choose as a trigger, all the method needs to do is call Autopager's load function (analogous to hitting the hidden "next" pager link) to load more content.

And there you have it, an infinite scroll masonry block that loads 3 more nodes each time the user hits page bottom without the use of the Views module.
