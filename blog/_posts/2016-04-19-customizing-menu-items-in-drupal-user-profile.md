---
layout: blog
body-class: blog-post
topic: technology
title: Customize Menu Items in Drupal User Profile
author: nancy
published: true
featured: false
short: Learn how to change menu items with a little bit of code.
tags:
  - Drupal
  - Drupal Planet
  - Drupal User Profile
  - Customize Menus
  - Drupal 7
date: 2016-04-19 13:00:00
image: /assets/images/thinkshout-logo1.jpg
---

We were recently asked by a client to edit the user profile view page on their site. This client needed us to move the link to the user’s contact form out of the tab area at the top of the profile and replace it with a link that appears further down in the content of the user’s profile. While this is not something you can do through the admin interface in Drupal 7, it is easy to do with just a few lines of code in a custom module, which I will show you how to do here.

Prior to adding our custom code, the link to the contact form appears as a tab. 

![Customize Menu 1](/assets/images/blog/custom-menu-1.png)

The "Contact" menu item starts out as a tab because the Drupal contact module originally creates the menu item and assigns it the type MENU_LOCAL_TASK. (See [Menu item types](https://api.drupal.org/api/drupal/includes!menu.inc/group/menu_item_types/7) for a list of the possible menu types and their uses in Drupal.) In order for us to change the type, we can use Drupal’s [hook_menu_alter()](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_menu_alter/7) function to change the item to the MENU_CALLBACK type, which will remove it from the display, but keep it available as a valid path. 

~~~php
/**
 * Implements hook_menu_alter().
 */
function mymodule_menu_alter(&$items) {
  // Remove the 'contact' tab.
  $items['user/%user/contact']['type'] = MENU_CALLBACK;
}
~~~

Now it is no longer a tab, but we still need make use of Drupal’s [hook_user_view_alter()](https://api.drupal.org/api/drupal/modules%21user%21user.api.php/function/hook_user_view_alter/7) to insert it into the content of the profile before it is rendered on the page.  

~~~php
/**
 * Implements hook_user_view_alter().
 */
function mymodule_user_view_alter(&$build) {
  // Check to see if this user has allowed others to contact him/her.
  if ($build['#account']->data['contact']) {
    // Create the text for the link using the account info to get the user’s first name.
    $link_text = $build['#account']->field_first_name['und'][0]['safe_value'] ? "email "
      . $build['#account']->field_first_name['und'][0]['safe_value'] : "email";
    // Use the l() function to create the link.
    $contact_link = l($link_text,'user/' . $build['#account']->uid . '/contact');
    // Insert it into the $build array.
    $build['contact_link'][0]['#markup'] = "<div class=\"field\"><div class=\"field-label\">" 
    . t('Contact') . ":&nbsp;</div><div class=\"field-items\"><div class=\"field-item even\">"
    . $contact_link . "</div></div></div>";
    // Insert into the user details that group we created in the display mode in admin interface.
    $build['#group_children']['contact_link'] = 'group_user_details';
  }
}
~~~

After the custom code and a quick cache clear, the tab is gone and there is a link to the form within the body of the profile.

![Customize Menu 2](/assets/images/blog/custom-menu-2.png)

I won’t go into creating a custom module; that's a bit beyond the scope of this post, but there is a tutorial for [creating a custom module](https://www.drupal.org/node/1074360) on drupal.org.

Shout out to Greg Boggs for his assistance!

