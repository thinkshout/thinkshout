---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: Don't let arrays make you loopy!
created: 1370625669
permalink: blog/2013/06/brandon/dont-let-arrays-make-you-loopy/
tags:
- Drupal Planet
- HowTo
- PHP
short: PHP provides some nice functions that can get you what you need from an array without having to loop through a huge Drupal Node array.
author: brandon
---
As a Drupal developer, I spend 90% of my time mucking with PHP arrays. And as much as I love a foreach control structure, PHP provides some nice functions that can get you what you need from an array without having to loop through a huge Drupal Node array.

For example, say I wanted to filter some nodes to see if they were referencing a specific Vocabulary term: The [array_filter](http://php.net/manual/en/function.array-filter.php) function can be used to filter out empty values from an array, but it can also be used with a callback function to filter based on whatever specification you want:

Here's the simple "Filter out empty values" behavior:

<?php
    $array = array(
      1 => 'Apple',
      2 => NULL,
      3 => 1,
    );
    $filtered_array = array_filter($array);
    print_r($filtered_array);
    // Returns: Array ( [1] => Apple [3] => 1 )
?>

But what if we wanted to filter for anything with a specific value?

<?php
    function apple_callback($item) {
      if($item == 'Apple') {
        return TRUE;
      }
      return FALSE;
    }
    $callback_filtered_array = array_filter($array, 'apple_callback');
    print_r($callback_filtered_array);
    // Returns: Array ( [1] => Apple )
?>

### Dynamically filtering with a closure

As of [PHP 5.3](http://www.php.net/manual/en/functions.anonymous.php), the callback function can also be a "closure", or anonymous function. This allows for dynamically setting the value for the filter, which is awesome:

<?php
    function filter_closure($filter_value) {
        return function($item) use($filter_value) {
        return $item == $filter_value;
      };
    }

    $dynamic_variable = 'Apple';
    $anonymous_filter = filter_closure($dynamic_variable);
    $array_filtered_closure = array_filter($array, $anonymous_filter);
    print_r($array_filtered_closure);
    // Returns: Array ( [1] => Apple )
?>
