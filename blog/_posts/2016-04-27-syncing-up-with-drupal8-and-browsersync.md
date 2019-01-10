---
layout: blog
body-class: blog-post
topic: technology
title: Syncing Up with Drupal 8 and Browsersync
author: eric
published: true
featured: false
short: Theming trouble? Try Browsersync!
tags:
  - Drupal
  - Drupal Planet
  - Browsersync
  - Drupal 8
  - Theming
date: 2016-04-27 13:00:00
image: /assets/images/ts_icon.jpg
---

Drupal 8 theming can be irksome with cache-rebuilding and browser refreshing, especially with responsive design. Wouldn't it be great if you could just open your site on three different devices and have them update live as you edit your theme?

Let me introduce you to [Browsersync](https://browsersync.io/). Browsersync is a module for Node.js that allows you to sync your changes across browsers and devices.

## Preparing Drupal
This article assumes you have a working install of Drupal 8 and a theme in place. If you don’t, check out Joe Komenda’s post, [Up and Theming with Drupal 8](https://thinkshout.com/blog/2015/11/up-and-theming-with-drupal-8/). This will get you going.

Once you have D8 installed, you’ll need to turn off caching. Rename `sites/example.settings.local.php` to `sites/example.settings.local.php`.  You can rename the files with editor of choice, if you prefer, or run the following command from your site root :

~~~shell
$ cp sites/example.settings.local.php sites/default/settings.local.php
~~~

To be sure your changes are included, we’ll need to enable Drupal’s Null Cache Service. Uncomment the following line `sites/default/settings.php`:

~~~php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
~~~

Next, let’s disable the render cache and dynamic page cache. Uncomment the following in the same file.

~~~php
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
~~~

Finally, add the following to `sites/development.service.yml`:

~~~yaml
parameters:
  twig.config:
    debug : true
    auto_reload: true
    cache: false
~~~

Run `drush cr` from the root of your site to rebuild the cache.

## Installing Browsersync
Browsersync is installed using Node Package Manager (NPM). If you already have Node.js, then you already have NPM. If you don’t have it installed, head over to [nodejs.org](https://nodejs.org/en/).

Once Node.js and NPM are set up, install Browsersync with `npm install -g browser-sync`.  This will install it globally so that you don’t have to reinstall it every time you spin up a new project. Test that your installation is working by running `browser-sync -h` in your terminal. That should show all the usage, commands, and options for the plugin.

## Connecting Browsersync to Drupal
Let’s make the magic happen by connecting Drupal and Browsersync. Go to the root of your Drupal theme folder. Run `browser-sync start`. Browsersync will generate a script tag for you to place just before the closing body tag. Browser sync also has  UI. You’ll see a URL for your localhost and one for sharing the connection to other devices on the same network.

![Browsersync start](https://raw.githubusercontent.com/heypaxton/Posts/master/img/browsersync-start.png)

Let's add the script tag to your `html.html.twig` file just above closing `</body>` tag. This will add a connection to your Drupal environment and Browsersync.

<script src="https://gist.github.com/levelos/0187b29071c3a56c3579ea2d95f42296.js"></script>

Since Drupal will most likely be running on a local server configured by your LAMP stack, you'll need to run Browsersync with the proxy option. Run `browser-sync start --proxy <your site localhost>` in your terminal. For example, if your site is running at http://mysite.dev then use `browswersync start --proxy mysite.dev` Your browser will open automatically to http://localhost:3000. Now you should see "Connected to BrowswerSync" in the top right of your browser.

## Watching for Changes
Although Browswersync and Drupal are connected, we need to watch for changes. Let's run Browsersync with the the `--files` option. We'll watch changes to our CSS file and have it automatically update the browser with our changes. In your terminal run:

~~~shell
$ browswer-sync start --proxy mysite.dev --files "css/*.css" --no-inject-changes
~~~

This command tells Browswersync to start and watch for changes to files with the `.css` extension in the `css` directory. The `--no-inject-changes` option tells Browsersync to refresh the browser window instead of just injecting a new version of the stylesheet. Injecting the changes won't work because of the way Drupal imports our stylesheets. We need to reload to get the new version.

Try opening your site in Chrome, Firefox, and even on your mobile device browser. Once you make a change, you should see all of them automatically update.

## Where to Go from Here
Browsersync is a great tool for fast development and syncing your changes across multiple devices without having to manually reload each one. I recommend integrating Browswersync with your task manager of choice. Here are some resources to help you integrate with Grunt or Gulp:

- [https://browsersync.io/docs/grunt/](https://browsersync.io/docs/grunt/)
- [https://browsersync.io/docs/gulp/](https://browsersync.io/docs/gulp/)
