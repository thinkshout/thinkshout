---
layout: blog
body-class: blog-post
topic: technology
title: Using Google Docs and Migrate to Populate Your Drupal Site, Part 1
homepage: false
author: maria  
published: true
featured: false
short:  There's more than one way to migrate content to your site. In part one, we show you how with Migrate & Google Sheets.
tags:
  - Drupal Planet
  - Drupal
  - Migrate
  - Google docs
date: 2017-01-06 16:00:00
image: https://thinkshout.com/assets/images/content-migrations-header.jpg
header-image: /assets/images/blog/content-migrations-header.jpg
header-image-alt: "Using Google Docs and Migrate to Populate Your Site"
---

The problem:

Content management systems are extremely powerful, in that they let developers focus on what they do best -- build the infrastructure of a site, while allowing content editors to do what they do best -- create content.

But this can be a problem when building a new feature. How often have you heard something to this effect:

Developer: “That blank spot right there will be a neat slideshow, once you build it.”

Client: “I thought I was paying you to build it.”

The separation between content and development can lead to missed edge cases, unfounded assumptions, and wasted time for everyone involved.

There are a few workarounds to this problem. We often prototype our sites with dummy content (insert your [favorite Ipsum](http://www.cupcakeipsum.com/) here). But this, without fail, leads to some nasty surprises when the client starts entering real content. It’s suddenly much longer (or shorter) than the designer or developer intended. Or maybe the images are far too big. Or they’re all portraits where we expected landscapes. In short, [the arguments made against using Lorem Ipsum in designs](https://www.smashingmagazine.com/2010/01/lorem-ipsum-killing-designs/) go doubly once you start actually implementing fields on your Drupal site.

So what about more meaningful content -- maybe exported from another source? Modules like [Default Content](https://www.drupal.org/project/default_content) allow developers to export certain content for import during the initial site build. But that content has the disadvantage of requiring a developer’s intervention. The more of a nuisance it is to update the content, sync the database, change the fields, etc, the less likely you are to keep the content up-to-date.

At ThinkShout, we want to populate our client’s sites with content as soon as possible.

It doesn’t need to be the final content...

But it should be real content.

It shouldn’t necessarily be exactly what’s on the old site...

But it ought to be close…

In other words, our initial content needs to be easy to change -- easy enough that the client can do it. Easy enough that the developers don’t have to take a walk around the block to calm down when they find out the fields are changing (again). Easy.

## Our Solution Part 1: Migrate

“But isn’t Migration to Drupal hard?” I hear you saying.

It certainly was in Drupal 7, where the Migrate module had a (deserved) reputation for being difficult to use. Migrating from one Drupal site to another, or even from Wordpress to Drupal was relatively smooth, but if you really wanted to do something unusual, like migrate from a less-common CMS to Drupal, you were going to be writing a lot of custom code “glue” to get it all working.

In D8, Migrations have been moved to core. This means a few things. First, it means the core concept of entities is baked right in. In D7 migrations, you often had to hunt around for a plugin, hoping someone had written a Destination Handler for your favorite oddball entities, like [Redirects](https://www.drupal.org/node/1116408), or Addresses, or the dreaded Field Collections. In D8, an entity is an entity.

As such, with a solid knowledge of the [helpful migration plugins](https://www.drupal.org/docs/8/api/migrate-api/migrate-process) and two essential contributed modules, [Migrate Tools](https://www.drupal.org/project/migrate_tools) and [Migrate Plus](https://www.drupal.org/project/migrate_plus), you can write a robust migration of both content and config entities without writing code more complicated than a few .yml files. If you don’t believe me, I encourage you to [try upgrading your D6 or D7 site to D8](http://slides.com/illepic/d8-migrations) on a local or dev environment to see how much of your data is already in there.

That being said, what if I don’t have an existing site? Or what if I want to implement a new content strategy to go along with my fancy new site?

## Our Solution Part 2: Google Sheets

Throw that new content into a Google Doc!

Yes, spreadsheets are old school, but let’s take a minute to appreciate what they give us.

* **Spreadsheets are familiar.** When it comes right down to it, spreadsheets are the universal language of business. Putting content into little boxes gives us the ability to move those boxes around, highlight them, and sort them -- few UX experiences can get you so much information so quickly.

* **Spreadsheets are dynamic.** It doesn’t take hours of database planning to get information into a spreadsheet. Nor does it take hours of testing to rearrange or remove items from a spreadsheet. It doesn’t demand anything of your data architect other than “organize things by columns and rows.”

* **Spreadsheets are sharable.** We can enable a Google spreadsheet and share it with the client in a few minutes. Clients can start entering their data from day 1 (alright, maybe day 2 or 3). And they can update content as needed -- take it out of the sheet, update things, and change them.

* **Google spreadsheets have revisioning built in.** If someone really messes up a Google Doc, you can go back through its history and revert it. It’s a nice compromise between committing all your initial content to source control or just letting it live freely.

Ready to give it a shot?

Stay tuned for Part 2 of this series, where I go into detail about how to set up your own Google sheet Drupal 8 migration.

Can’t wait? Check out the [Migrate Google Sheets](https://www.drupal.org/project/migrate_google_sheets) module now! We’ve even set up a [sample site](https://live-mgs-demo.pantheonsite.io/) where content comes entirely from [an external spreadsheet](https://docs.google.com/spreadsheets/d/1spS1BeUIzxR1KrGK2kKzAoiFZii6vBHyLx_SA0Sb89M) to help you get started.
