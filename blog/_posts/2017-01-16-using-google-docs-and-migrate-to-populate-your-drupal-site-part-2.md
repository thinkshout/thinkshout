---
layout: blog
body-class: blog-post
topic: technology
title: Using Google Docs and Migrate to Populate Your Drupal Site, Part 2
homepage: false
author: maria  
published: true
featured: true
short: In part 2, learn how to get your own migration up and running.
tags:
  - Drupal Planet
  - Drupal
  - Migrate
  - Google docs
  - Drush
date: 2017-01-16 14:00:00
image: https://thinkshout.com/assets/images/content-migrations-header.jpg
header-image: /assets/images/blog/content-migrations-header.jpg
header-image-alt: "Using Google Docs and Migrate to Populate Your Site, Part 2"
---

In [Part 1](https://thinkshout.com/blog/2017/01/using-google-docs-and-migrate-to-populate-your-drupal-site-part-1/), I talked about using Google Docs + Migrate to populate your site. Now we’re going to do that with the [Migrate Google Sheets](https://www.drupal.org/project/migrate_google_sheets) module. Below, I’ll provide the steps to get your own migration up and running, but if you prefer to experiment with a working example, [check out a demo of the Migrate Google Sheets Example module](https://live-mgs-demo.pantheonsite.io/) (provided as a submodule within Migrate Google Sheets). [All content on that site was built using this example Google Sheet](https://docs.google.com/spreadsheets/d/1spS1BeUIzxR1KrGK2kKzAoiFZii6vBHyLx_SA0Sb89M). 

## Setup: Install the Module

If you’ve already got a Drupal 8 site up and running, [you can install the module](https://www.drupal.org/docs/8/extending-drupal-8/installing-contributed-modules-find-import-enable-configure-drupal-8) in any of the normal ways. I’m assuming here that you have access to the site using [Drush](http://www.drush.org/en/master/), as it’s not possible to run migrations through anything but the command line at this time. At ThinkShout, we use composer to build our site distributions, and have [a repo for building the demo site here](https://github.com/thinkshout/mgs_demo).

## Step 1: Creating Your Custom Migration Module

The easiest way to get started on your own set of migrations is to copy the migrate_google_sheets_example submodule and rename it something of your own. Let’s say we rename it “my_migration.” Follow these steps:

1. Rename your .install file to “my_migration.install”, and change the function migrate_google_sheets_example_uninstall to “my_migration_uninstall”.
2. Delete the helper submodule “migrate_google_sheets_example_setup” entirely -- that is just necessary to build the content types required for the example module, but you shouldn’t need it for your migration module.
3. Rename your migrate_google_sheets_example.info.yml as “my_migration.info.yml” and open it up. At the very least, you’ll want to change the name of the migration to “name: my_migration” but you’ll also likely wish to remove the migrate_google_sheets:migrate_google_sheets_example_setup dependency. Mine ended up looking like this:

~~~yaml
name: my_migration
type: module
description: My Migrations
core: 8.x
package: Migrate
dependencies:
  - migrate_plus
  - migrate_tools
  - migrate_google_sheets
  - redirect 
~~~

When completed, your module structure should look like this:

![Module Structure](/assets/images/blog/google-sheets-migrate-1.png)

You are now ready to enable your My Migrations module. (Make sure you disable the migrate_google_sheets_example module first, if you’d previously enabled that!)

## Step 2: Create Your Spreadsheet

Assuming you have the Game and Landing page content types, you could now run the migrations in your “My Migrations” module and it will pull the data from the [Google Sheet](https://docs.google.com/spreadsheets/d/1spS1BeUIzxR1KrGK2kKzAoiFZii6vBHyLx_SA0Sb89M/edit).

But since you don’t have permissions to edit that sheet, you’re going to need to copy the existing sheet and create your own to do any customizations.

![Spreadsheet](/assets/images/blog/google-sheets-migrate-2.png)

When this is done, you’ll get a url like this:

https://docs.google.com/spreadsheets/d/YourLongHashIDHere where YourLongHashIDHere is your feed key.

Now you’ll need to publish your new spreadsheet. This is an option under “File” -> “Publish to the web”

![Spreadsheet](/assets/images/blog/google-sheets-migrate-3.png)

To verify that your migration module will be able to see the Google sheet, try opening an anonymous browser window and visiting the Feed version of the url, whose format is this:

https://spreadsheets.google.com/feeds/list/YourLongHashIDHere/SHEET/public/values?alt=json

If visiting that URL throws out a bunch of json, you’re ready to start migrating!

But of course, your current set of migration files still point to the old feed. In the my_migrations/config/install folder, you’ll need to find all instances of our feed string (1spS1BeUIzxR1KrGK2kKzAoiFZii6vBHyLx_SA0Sb89M) and replace them with your feed string.

## Step 3: Decide Which Migrations to Keep

The Migrate Google Sheets Example module provides one Migration Group (games_example) and 6 Migrations. Depending on your site configuration, some of these might be useful, like the menu_links and the blocks migrations, and some of them will not be so useful (like the node_game migration, likely). This is a good time to trim or modify any migrations that aren’t going to be useful for your Drupal site. That being said, here are a few things that the sample migrations demonstrate:

* Block UUIDs: When you place a block using the Block Layout screen, the block’s UUID is saved in config. If you’re running a migration over and over, your block’s ID will iterate on its own, but the UUID can remain constant if  you add it to the migration. [In the demo site](https://live-mgs-demo.pantheonsite.io/), this allows us to create a persistent CTA block in the header. 

![Module Structure](/assets/images/blog/google-sheets-migrate-4.png)

* Menu Links parents: You can specify that a menu link item has a parent from within the current migration. This lets us say /bohnanza and /hanabi are children of /games
* Page and Game redirects: These sheets demonstrate how to add the redirect from the url of content on an old site to the new home right in the content sheet. Try going to [https://live-mgs-demo.pantheonsite.io/that-fireworks-game](https://live-mgs-demo.pantheonsite.io/that-fireworks-game) and see where you end up.
* Related content as strings or ids: On the Page sheet, we have a reference to the “Related games” for the given page. This is an entity reference which we could fill with a couple of things. We could refer to the ID of the related games, as they are stored in the Games sheet, or we could do what we’ve done here and use the migrate_plus plugin “entity_lookup” to search for the related game node by name. 
As long as there is a Game node called Bohnanza, we’ll always link to the right one. This is particularly useful with Term references, where the name of the item ideally remains constant.

![Related Content](/assets/images/blog/google-sheets-migrate-5.png)

* Game downloadable file: Games have associated images, which are files hosted externally to the spreadsheet. In order to relate my game content to its image, I need to download the image, get it into the file_managed database table (creating a file entity) and THEN relate that entity to the current node. This is done with the following lines in the “node_games” migration:

~~~yaml
public_file_directory:
    plugin: default_value
    default_value: 'public://'
  public_file_uri:
    plugin: concat
    delimiter: ''
    source:
      - @public_file_directory
      - imagefilename
  field_image/target_id:
    -
      plugin: file_copy
      source:
        - image
        - @public_file_uri
    -
      plugin: entity_generate
  field_image/alt: imagealt
  field_image/title: imagetitle
~~~
  

You can keep as many or as few of the migration files as you’d like. You can also create new ones. 

## Step 4: Tell Drupal About Your Changes

Drupal 8 only sees the changes you’ve made to your migration yml files when you first install the module. That means that you need to uninstall and reinstall the module to make new changes show up. [ThinkShout has a Robo script that does this](https://github.com/thinkshout/mgs_demo/blob/master/RoboFile.php#L18), but the same thing can be  done in Drush:

~~~yaml
drush mr --all             # Rolls back all migrations
drush pmu my_migration -y  # Disables my migration module
drush en my_migration -y   # Enable my migration module
drush ms                   # Displays my current migration status
~~~

You can also string these together as one line:

~~~yaml
drush mr --all && drush pmu my_migration -y && drush pmu my_migration -y && drush ms
~~~

## Step 5: Run your migrations

This part is simple. To run all migrations, it’s a quick drush command:

`drush mi --all`

If you’d like to find out about all the possible options for the migrate-import command, you can run 

`drush help mi`

You can also see your list of migration groups at /admin/structure/migrate, and you can review your migrations by clicking “List Migrations.” The resulting page will give you the same output, more or less, that you get from running a `drush ms`. 

![Migrations](/assets/images/blog/google-sheets-migrate-6.png)

These pages are helpful to know about, as they give you an easy place to find errors logged during the migration process. However, you can’t currently run a migration from the UI ([although there is an issue for this](https://www.drupal.org/node/2470882)).

## Gotchas

But before we close, I do want to acknowledge some challenges we’ve seen in this approach.

Sad fact #1: HTML in a spreadsheet is ugly. 

Google Spreadsheets don’t let you make your rows smaller than the number of line breaks in a cell. So if you have pretty html with a bunch of line breaks, your row might be too tall to fit on your screen. [People have some clever workarounds for this](http://webapps.stackexchange.com/questions/6953/in-a-google-spreadsheet-how-can-i-force-a-row-to-be-a-certain-height), but so far we’ve not implemented any.

Sad fact #2: Sheet order matters (right now)

Maintaining the order of sheets isn’t top on everyone’s minds as they’re making changes to a spreadsheet, especially when duplicating tabs. Migrate Google Sheets asks for each sheet based on tab order. If I make a copy of the Page tab, the Game tab is now the fourth tab instead of the third tab. 

![Copy of page](/assets/images/blog/google-sheets-migrate-7.png)

As it stands now, the module will happily request columns that don’t exist on the third tab and then fail in puzzling ways.

There is currently [only one issue](https://www.drupal.org/node/2822948) in the issue queue for the Migrate Google Sheets module, and it’s to fix this. 

Sad fact #3: Google sheets must be publicly viewable to work (again, right now)

As the module exists right now, there’s no authentication involved, so any migrated content must be publicly viewable. [Google authorization is possible with Oauth2](https://developers.google.com/google-apps/spreadsheets/authorize), but that is not currently implemented. 

## Conclusion

Thanks for following along! I hope you found this series helpful. And don’t forget to visit the [Migrate Google Sheets](https://www.drupal.org/project/migrate_google_sheets) [issue queue](https://www.drupal.org/project/issues/migrate_google_sheets?categories=All) if you find any bugs, have an idea for a feature, or need help! 
