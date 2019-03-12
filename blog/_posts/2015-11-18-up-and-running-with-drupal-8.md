---
layout: blog
body-class: blog-post
title: Up and Running with Drupal 8
author: joe
published: true
featured: false
short: "Get going with Drupal 8 with the help of our two-part guides."
tags:
  - Drupal Planet
  - Drupal 8
  - Github
  - Drush
  - Development
date: 2015-11-18 13:00:00
image: /assets/images/thinkshout-logo.png
topic: technology
---

It’s November 2015, and Drupal.org is rolling out [Drupal 8 release candidates](https://www.drupal.org/project/drupal)! Heck, Drupal 8 is coming out *this week*. For many devs, that means we need to figure out how to install, sync, and set up a site theme. Here at ThinkShout, learning is part of the job - we have dedicated time every week to learn new things and share them, be it in a blog post, at our weekly engineering meetings, or at our weekly team lunch.

For the last few months, we’ve made learning Drupal 8 our singular focus. The ‘D8 Bookclub’ has been getting assignments, doing their homework, and sharing their findings internally. We’ve now spent enough time with Drupal 8 that we can share what we’ve learned, the little gotchas and hard-to-find code snippets, as well as the general change in philosophy that has occurred in the shift from D7 to D8.

We generally agree that one of the things keeping people from digging into Drupal 8 is the difficulty of getting it installed and running in a deployable way, which is a must-have if you want to have a team working on a project. This article will walk you through Drupal 8 installation and configuration sync. The follow-up article (*Up and Theming with Drupal 8*) will cover theme setup and configuration, so that you can finally get going with theming in D8.

## Installing Drupal 8 ##

The [composer install](https://github.com/drupal-composer/drupal-project) method is being widely proposed as the replacement for `drush make`. The `composer.json` file is to `composer install` what a [drush make](http://www.drush.org/en/master/make/) file is to `drush make`. The drupal-composer github repo has a composer template called [drupal-project](https://github.com/drupal-composer/drupal-project) that will get us up and running with just the basics necessary to have a working site.

For command-line manipulation, you’ll need to be using [Drush 8](https://www.lullabot.com/articles/switching-drush-versions). Like most dev shops, we use version control ([Git](http://xkcd.com/1597/)) as well as a `local->dev->test->live` server setup. There are a few gotchas here:

The composer template mentioned above works great for a basic D8 install, but if you want it customized (additional packages, post-install commands, etc), you will have to:

* [download](https://github.com/drupal-composer/drupal-project/archive/8.x.zip) the full composer profile
* unzip the files
* update the `composer.json` and `scripts/composer/post-install.sh` files
* run `composer install` locally.

This is the method we’ll be using for the rest of this post.

First, [install composer](https://getcomposer.org/doc/00-intro.md). We’re using OSX with [Homebrew](http://brew.sh/), so this is fairly simple - `brew install composer`. Note: after implementing this, add this to your `.bashrc` (or similar):

~~~bash
export PATH="$HOME/.composer/vendor/bin:$PATH"
~~~

Next, ensure you have [Drush 8](https://www.lullabot.com/articles/switching-drush-versions) installed. We prefer the [Composer global install](http://docs.drush.org/en/master/install-alternative/#install-a-global-drush-via-composer) approach to make updating Drush as simple as running `composer global update`.

Next, [download](https://github.com/drupal-composer/drupal-project/archive/8.x.zip) the full composer profile, and unzip it into an appropriate local directory (We use a `~/Sites/` directory to hold all of our projects).

Note: the Drupal Composer project updates regularly. If you run into any errors, re-download it. You could alternately create an [installation profile](https://www.drupal.org/node/2210443) in the `web/profiles` folder, but that seems to be a tad under-documented and still not fully baked.

Now that we have a default site scaffold in place, we can get back to the post-install method. If you want to run the site installer after composer installs Drupal, in the `post-install.sh` file, you would add:

~~~bash
cd web;drush si --site-name="SITENAME" --db-url=mysql://root:PASSWORD@HOSTNAME/DBNAME -y;cd ../
~~~

For the above, replace `SITENAME, PASSWORD, HOSTNAME`(we use localhost) and `DBNAME`.

One of the D8 Bookclub challenges was completing the installation without any warnings appearing on the Status Reports page at `/admin/reports/status`. We also want to specify the configuration sync directory, so that it’s not site-unique.

The trick here is to use a series of permission and site config tweaks. After the site install code above, add the following to your `post-install.sh`:

~~~bash
chmod 777 web/sites/default/s*;

#Prepare the custom sync directory, which will sit outside of the web root

if [ ! -d configs ]
then mkdir -m777 configs
fi

echo "\$config_directories['sync'] = '../configs';" >> web/sites/default/settings.php

echo "\$settings['trusted_host_patterns'] = array('SITENAME\.dev$',);" >> web/sites/default/settings.php

chmod 444 web/sites/default/s*

chmod -R 777 web/sites/default/files
~~~


This will make the `settings.php` file editable, create a sync directory below the web root (bonus security!), add the sync directory path, add the [trusted host pattern](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!DrupalKernel.php/function/DrupalKernel%3A%3AsetupTrustedHosts/8) (a new D8 requirement), secure the file, and make the `web/sites/default/files` folder globally writable.

Now you’re ready to run the installation! From the base directory, run:

~~~bash
composer install
~~~

This will take a while, since it’s downloading Drupal and all the modules.
After initial installation, perform a full export and an immediate import/sync of your site configuration profile. This can be done two ways:

1. Via the gui: `/admin/config/development/configuration/full/export`  

   Save this export file! Any subsequent sites will need this as a starting point so that entity mismatches don’t occur.

2. Via Drush (run from the `/web` directory):  

~~~bash
drush config-export
drush config-import sync
~~~

This will export and then sync all of your config files in the configuration directory we specified in the post-install script.

You would then check in this version of the site - a commit message such as ‘Base Site profile’ would be helpful. Here’s a quick set of command-line git repo creation commands, starting with an installation of hub, the [command-line wrapper](https://hub.github.com/) for GitHub (this will allow you to use GitHub’s 2-factor authentication):

~~~bash
brew install hub
git init
hub create
git add .
git commit -m 'Base Site profile'
git push --set-upstream origin master
~~~

After that, you can check out additional sites by creating a directory, cd into that directory, and running a git clone command inside it, such as:

~~~bash
git clone git@github.com:USER/REPOSITORY.git .
~~~

Now you can run `composer install to build your clone.

Optional: edit the `post-install.sh prior to running `composer install` if you’d like your clone to have a different hostname, db, etc.

## Syncing Sites##

Site configurations are only exportable to sites that have the same UUID and have synced using the shared base configuration profile. To find your site’s UUID, cd to the web folder of the base site, then run `drush config-get system.site`. After that, any new site can be synced using these steps immediately after a fresh install (either via download or Git clone):

~~~bash
drush config-edit system.site (Update the UUID to match the base site)
~~~

If you manually saved the files, upload the base site config profile, but do not sync it


 -OR-


If you cloned the repo, the files should be in place. If the git repo has moved beyond the base install, check out the repo at the ‘Base Site Profile’ stage mentioned above using `git reset --hard $SHA1` (where $SHA1 is the SHA of the Base Site Profile)

~~~bash
drush config-import --partial
~~~

Important Note: Every new instance MUST start with the same base configuration profile, otherwise you may have entity mismatch issues, even with the partial import. After the initial sync is complete, you can pull in config files via Git and sync will work as expected, even over multiple configuration changes.

## Creating a Theme##

This will be covered in our next post: "Up and Theming with Drupal 8."

## Disclaimer##

The post was written at the end of 2015 while Drupal 8 was still in a Release Candidate stage. While some effort will be made to keep the post up-to-date, if it’s after 2016, you should probably be adding the year you are currently in to your Google search, or better yet, check the docs on [Drupal.org](https://www.drupal.org/drupal-8.0).  
