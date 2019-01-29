---
layout: blog
body-class: blog-post
topic: technology
title: Unlocking the Mystery of Custom Twig Functions
homepage: false
author: maria
published: true
featured: false
short:
tags:
  - Drupal Planet
  - Drupal
  - Twig
  - "Twig Tweak"
  - "Twig Field Value"
  - "Twig functions"
  - Drupal 8
date: 2019-01-29 12:00:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---
When Drupal 8 came out, it introduced the Drupal community to the concept of separating the theming layer from the logic layer through the [Twig](https://twig.symfony.com/) templating language. This had many advantages. For one, instead of needing to know PHP, a themer could just know Twig  -- an extremely stripped-down templating engine that has a [few syntax elements, minimal built-in operators, and only about 50 provided functions](https://twig.symfony.com/doc/2.x/). Additionally, the limited list of available functions makes it much harder to shoehorn heavy logic or even more dangerous things like SQL queries directly into the theming layer.

There are, of course, trade-offs. While the list of functions Twig provides is quite robust, it didn’t take long for Drupal developers to recognize snippets of code they needed to do over and over again within their templates. As such, Drupal provided [a handful of custom functions](https://www.drupal.org/docs/8/theming/twig/functions-in-twig-templates) and [filters](https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates) specific to core functionality, like the ‘without’ filter, which “Removes child elements from a copy of the original array” -- i.e. lets you print the contents of a render array without certain fields.

The contrib space provides even more options for Twig themers -- modules like [Twig Tweak](https://www.drupal.org/docs/8/modules/twig-tweak/cheat-sheet-8x-2x) or [Twig Field Value](https://www.drupal.org/project/twig_field_value) provides additional functions and filters for things themers often need to do over and over, like render a block within a template, or grab a field’s raw value.

But sometimes you still find yourself repeating the same code over and over within your templates. Maybe it’s a bit of logic specific to the project you’re working on. Or maybe it’s a piece of code that needs logic too complex to be put in a template. Or maybe it requires context not easily accessible within the template, like a setting controlled in the Drupal admin area.

In these cases you can create your own custom Twig functions.

### What you'll need:

Creating a custom Twig filter is relatively simple. You’ll just need the following things to begin:

- A custom module you can add code to
- A service declaration .yml file with reference to the twig.extension tag
- A class that extends the `\Twig_Extension` class

If you have those things, you can create as many Twig filters or functions as you’d like from within one class file. Making the filters or functions available is just one cache clear away!

### A practical example:

Note, the finished module created below is also available [here](https://gist.github.com/mariacha/5f7834b28536b336031827946f7e3c90).

Let’s say you want to print out a field label within a template. For example, the default Drupal 8 Article display shows the label for the Tags field:

![Test Article](/assets/images/blog/Add_a_raw_text_format.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Adding in raw text format</span>

Let’s say we also, for some reason, wanted to put the “Tags” label somewhere else on the page, like right under the node’s “Submitted” information. Out of the box, you can use Twig to get the label’s raw value if you’re extending your node.twig.html file:

`{{ content.field_tags['#title'] }}`

That works!

![with-tags](/assets/images/blog/with-tags.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>With Tags</span>

Now, suppose a site builder decides they don’t want to show the label on the Tags field anymore. They go into the admin area, change the field value on the label from “Above” to “Hidden”, and reload the entity.

![Backend](/assets/images/blog/backend.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>backend</span>

![Part Tags](/assets/images/blog/part-tags.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>part tags</span>

If you’re using the Twig Field Value module and use this syntax:

`{{ content.field_tags|field_label }}`

The same thing happens. That’s because the field_label function doesn’t take into account the settings on the admin side either.

If we want to print out a label in a custom place, but still have the label respect the admin settings, we can create our own Twig function. Building on the idea of the Twig Field Value module’s filter “field_label” filter, let’s call our custom function “field_respectful_label”.

As outlined above, first you need to create a service. The quickest way to do this is using the Drupal console [“generate:service”](https://hechoendrupal.gitbooks.io/drupal-console/content/en/commands/generate-service.html) command.

Let’s assume you’ve already got a module called  “custom_twig”. The command to generate this service would look like this:

~~~html
$ drupal generate:service

 // Welcome to the Drupal service generator
 Enter the module name [address]:
 > custom_twig

 Enter the service name [custom_twig.default]:
 > custom_twig.my_custom_twig_items

 Enter the Class name [DefaultService]:
 > MyCustomTwigItems

 Create an interface (yes/no) [yes]:
 > no

 Do you want to load services from the container? (yes/no) [no]:
 > no

 Enter the path for the services [/modules/custom/custom_twig/src/]:
 >

 Do you want proceed with the operation? (yes/no) [yes]:
 >


 // cache:rebuild

 Rebuilding cache(s), wait a moment please.


 [OK] Done clearing cache(s).


Generated or updated files
 1 - modules/custom/custom_twig/custom_twig.services.yml
 2 - modules/custom/custom_twig/src/MyCustomTwigItems.php
~~~

This creates two files. The custom_twig.services.yml file:

~~~html
services:
  custom_twig.my_custom_twig_items:
    class: Drupal\custom_twig\MyCustomTwigItems
    arguments: []


And the MyCustomTwigItems php file:

<?php

namespace Drupal\custom_twig;

/**
 * Class MyCustomTwigItems.
 */
class MyCustomTwigItems {

  /**
   * Constructs a new MyCustomTwigItems object.
   */
  public function __construct() {

  }

}
~~~

We now need to alter these files slightly. For the services.yml file, we will need to remove the “arguments” line, and add a reference to the twig extension tag:

~~~html
services:
  custom_twig.my_custom_twig_items:
    class: Drupal\custom_twig\MyCustomTwigItems
    tags:
    - { name: twig.extension }
~~~

In the MyCustomTwigItems.php file, we can make a few changes as well. First, the MyCustomTwigItems class must extend the \Twig_Extension class. We can also get rid of the constructor, which leaves you with a very bare class declaration:

~~~html
/**
 * Class MyCustomTwigItems.
 */
class MyCustomTwigItems extends \Twig_Extension {

}
~~~

You now have a skeleton service in place, but it’s currently not doing anything. To let Twig know about a new Twig filter, you implement the “getFilters” method on this class:

~~~html
/**
   * {@inheritdoc}
   */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter('field_respectful_label', [$this, 'getRespectfulFieldLabel']),
    ];
  }
~~~

The syntax above links up the string “'field_respectful_label'” (which will be used in our twig templates) to the method  'getRespectfulFieldLabel', a function we’ll create within our current MyCustomTwigItems class. Note that this syntax means you can call your custom filter whatever you want, although you will want to stick to the accepted coding style for Twig functions (lowercase letters and underscores, aka snake_case) and Drupal class methods (lowerCamelCase). Also notice that here we’re extending the “getFilters()” method on the parent class. There’s also a “getFunctions()” method, which is how you’d define a function. For more on the difference between Filters and Functions in Twig, refer to the [Extending Twig documentation](https://twig.symfony.com/doc/2.x/advanced.html).

Then you just write your custom method! Here’s the full code for the getRespectfulFieldLabel method, which you’d place anywhere within the MyCustomTwigItems class declaration:

~~~html
/**
  * Twig filter callback: Only return a field's label if not hidden.
  *
  * @param array $build
  *   Render array of a field.
  *
  * @return string
  *   The label of a field. If $build is not a render array of a field, NULL is
  *   returned.
  */
 public function getRespectfulFieldLabel(array $build) {
   // Only proceed if this is a renderable field array.
   if (isset($build['#theme']) && $build['#theme'] == 'field') {

     // Find out the label value.
     $disrespectful_label = isset($build['#title']) ? $build['#title'] : NULL;

     // Find out the visibility status of the label.
     $display_label = isset($build['#label_display']) ? ($build['#label_display'] != 'hidden') : FALSE;

     return ($disrespectful_label && $display_label) ? $disrespectful_label : NULL;
   }
   return NULL;
 }
~~~

If we now use our custom twig filter in the node.html.twig file, the label behaves as expected:

`{{ content.field_tags|field_respectful_label }}`

![No Tags](/assets/images/blog/no-tags.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>no tags</span>

There is now no label showing up on the front end, because we’ve hidden the label in the backend. If I went and changed the label visibility setting to “Above”, the label does show up. No code changes required:

![Both Tags](/assets/images/blog/both-tags.png)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>both tags</span>

And with that you have a new, custom Twig filter.

In conclusion, I hope this article demystifies the functions and filters you can use with Twig in Drupal 8. And if you’re inspired, feel free to use [the example code](https://www.google.com/url?q=https://gist.github.com/mariacha/5f7834b28536b336031827946f7e3c90&sa=D&ust=1548371907267000&usg=AFQjCNGTPYjYdcbnEYtpSf3LMf__MlKBiA) as a starting point for your own custom functions or filters.
