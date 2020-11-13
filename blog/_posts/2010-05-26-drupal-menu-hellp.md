---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: Drupal Menu Hell(p)
created: 1274939908
permalink: blog/2010/05/lev/drupal-menu-hellp/
tags: 
short: I recently had to implement what seemed like a very simple feature for a client...
author: lev

---
I recently had to implement what seemed like a very simple feature for a client, moving several of the local tasks located on a user's profile page into the site's primary menu. The menu paths in question are dynamic, E.g, /user/%/edit, /user/%/orders, /user/%/notifications, etc., which at first seemed like slight complication. So how to tackle this? At first blush, one might think that you can just use the Menu module to add a dynamic menu item though the GUI or menu API. Well, that won't work. You can only create a menu item that way for an existing path that you have access to. Luckily, Drupal provides a hook that seems like the perfect solution,
<code>
function hook_menu_alter(&$items) {
  // Example - disable the page at node/add
  $items['node/add']['access callback'] = FALSE;
}
</code>

Great, so I can change the type of the menu items I want to alter by doing something like the code below and problem solved!
<code>
function mymodule_menu_alter(&$items) {
  $items['user/%user/edit']['type'] = MENU_NORMAL_ITEM;
}
</code>

WRONG! At least that's what I realized after much trial and error. Turns out that menu items with wildcards will NOT now show up in the menu tree, and there are no warnings or explanations to that effect. I never found that documented anywhere, only came across it in my trusty copy of <a href="http://www.amazon.com/Drupal-Development-Second-John-VanDyk/dp/1430209895">Pro Drupal Development</a>, along with following some trails in the code and on another blog post. But that's not where the confusion ends, because menu items with wildcards can appear in the menu tree if the wildcard is a function name that ends with <em>to_arg</em>, e.g., <em>user/%user_uid_optional</em>,  and <em>user_uid_optional_to_arg()</em> can be found in <a href="http://api.drupal.org/api/drupal/modules--user--user.module">user.module</a>. So I'm getting closer, but how do I change those menu items since they don't have one of those nifty to_arg() wildcards? Well, I couldn't think of a way, so in the end, I created my own menu items using <em>user_uid_optional_to_arg()</em> as the placeholder. The code looks something like this,
<code>
function mymodule_menu() {
  $items['mymodule/orders/%user_uid_optional'] = array(
    'title' => 'My Orders',
    'page callback' => '_mymodule_reroute',
    'page arguments' => array(2, 1),
    'access callback' => '_mymodule_access_account',
    'access arguments' => array(2),
    'type' => MENU_NORMAL_ITEM,
    'menu_name' => 'primary-links'
  );
  $items['mymodule/notifications/%user_uid_optional'] = array(
    'title' => 'Notifications',
    'page callback' => '_mymodule_reroute',
    'page arguments' => array(2, 1),
    'access callback' => '_mymodule_access_account',
    'access arguments' => array(2),
    'type' => MENU_NORMAL_ITEM,
    'menu_name' => 'primary-links'
  );
  $items['mymodule/recurring-fees/%user_uid_optional'] = array(
    'title' => 'Recurring Fees',
    'page callback' => '_mymodule_reroute',
    'page arguments' => array(2, 1),
    'access callback' => '_mymodule_access_account',
    'access arguments' => array(2),
    'type' => MENU_NORMAL_ITEM,
    'menu_name' => 'primary-links'
  );  
}

function _mymodule_util_reroute($user, $tab) {
  drupal_goto('user/'. $user->uid .'/'. $tab, NULL, NULL);
}
</code>

Notice the simple and, in my opinion, hack-ish reroute function that actually directs users to the correct destination. In many ways, this is duplicate code, not resilient in the face of changes in other modules, and the href on the new links doesn't match the final destination. Since in this case these links are only available for authenticated users, I'm not worried about SEO implications. So that's my solution to the <em>simple</em> problem of adding some account related links to the primary menu, and I don't like it one bit (even though I burned way too much time on it!). Are there better approaches? I hope so, feedback welcome!

<em>Note that this article was originally published by Lev at http://www.levelos.com/blog/2010/05/drupal-menu-hellp.</em>
