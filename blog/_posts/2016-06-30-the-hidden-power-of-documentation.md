---
layout: blog
body-class: blog-post
topic: technology
title: The Hidden Power of Documentation
homepage: true
author: joe
published: true
featured: true
short: Joe discusses the many benefits of project documentation.
tags:
  - Drupal
  - Drupal Planet
  - Drupal 8
  - Documentation
date: 2016-06-30 15:00:00
image: http://thinkshout.com/assets/images/ts_icon.jpg
header-image: /assets/images/ts_redesign/blog/up-and-theming1.jpg
header-image-alt: "Image: Model Thinkshout Employees"
---

Anyone who works on team-based projects knows how handy good project documentation is, and how frustrating it can be when that documentation is out of date, incomplete, or just not there. But there are other benefits to good documentation aside from convenience, and a solid system for writing and maintaining documentation is the key.

## Defining Documentation

Before we begin, we should be clear about what we mean when we say 'Project Documentation' (Docs for short). We're referring to the information for team members (developers, designers, Project managers, and engineers) who join a project at some poiont after inital development has begun, or even long after a project is complete, such as would be on a maintenance team.

Good docs allow these team members to get up to speed on a project with a minimum of questions for existing or previous team members. In an ideal world, docs alone would suffice in getting someone set up and working on new tasks, bugfixes, or other project tasks.

## Additional Benefits

The convenience of good docs is apparent to anyone who joins a project after it has begun, but consider some of the other benefits:

* Junior developers will be able to reference docs, instilling confedence.
* A team member leaving your company will not cause as much of a 'knowledge gap'.
* _Consistent_ docs allow any team member to quickly jump in and out of projects as needed, providing project managers with additional flexibility in resource allocation.
* Long-dormant projects can be resurrected quickly, even if none of the original team members are available.
* Figuring out where a project's code is, how to install it locally, how to make/commit changes to production, and tracking down the original wireframes, designs, and planning docs can take days if the orginal team members are not available. Good docs can cut this time to under an hour, or even minutes in some cases.
* Docs that accompany open-source projects are especially useful in saving the end-user AND the maintainer's time.

## A Solid Foundation

The keys to good docs are _consistancy_, _accuracy_, and _completeness_:

### Consistancy

As for the Wiki, we have a template we use for every project's docs, so you don't have to search for the information among 40 different docs styles. Your project's needs may differ, but this should be a good starting point (this is in Markdown):

~~~markdown
## Current Status

(Site Type / Status. Drupal, WordPress, under development, maintenance, etc...)

## Site Build Info

* [Wireframes](URL)
* [Budget](URL)
* [Implementation overview](URL)
* [Migration Spreadsheet](URL)
* [Style Guide](URL)

## Build Team

* Name (Team Lead)
* Name (Backend)
* Name (Frontend)
* Name (PM)
* Name (Design/UX)

## Hosting

* [Dev](URL)
* [Test](URL)
* [Live](URL)

## Issue Tracking

[Redbooth Tasks](URL)

## Deploying Code  
Note: it is a good practice to run backups before deploying.

    `cd ~/projects/PROJECTAME;git pull;./scripts/deploy.sh`  

## Installation Notes

Clone into `projects` folder, install to `~/Sites/`:

    cd ~/projects
    git clone git@github.com:thinkshout/PROJECTNAME.git
    cd PROJECTNAME
    composer update
    ./scripts/build.sh ~/Sites/PROJECTNAME root root PROJECTNAME

Download db and files from [production](production backup URL)

Install the db by opening Sequel Pro, deleting the PROJECTNAME db,  
adding a new PROJECTNAME db, and importing the live db, then truncating  
all of the cache_* tables. 

Install the files by unzipping the file download and copying them  
to `~/Sites/PROJECTNAME/sites/default/files`, then run:  

    chmod -R 777 ~/Sites/PROJECTNAME/sites/default/files
    drush cc all
    drush fra -y

Log in: drush uli

Disable cache and JS/CSS file aggregation   
at http://PROJECTNAME.dev/admin/config/development/performance


## Front-end Setup  
Theme directory is at:  
`~/Sites/PROJECTNAME/profiles/PROJECTNAME/themes/custom/PROJECTNAME`

To get Sass running, `cd` to that directory and run `bundle`  
Thereafter, you only need to run `rake serve` from the theme directory.

~~~

## Location, Location, Location

Having your docs in one place, or in the same place on every project, is the first step in making them easy to find - after all, what good are the docs if nobody can find them? ThinkShout uses Github for all of it's projects, so we take advantage of the fact that every project on GitHub has a free Wiki. A link in the README.md to the wiki means everyone can find the docs in seconds.

## Part of Your Process



