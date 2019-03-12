---
layout: blog
body-class: blog-post
topic: technology
title: The Hidden Power of Documentation
homepage: false
author: joe
cta-id: 1
published: true
featured: false
short: Joe discusses the many benefits of project documentation.
tags:
  - Drupal
  - Drupal Planet
  - Drupal 8
  - Documentation
date: 2016-07-12 12:00:00
image: /assets/images/thinkshout-logo.png
header-image: /assets/images/blog/documentation-blog-header.jpg
header-image-alt: "The Hidden Power of Documentation"
---

Anyone who works on team-based projects knows how handy good project documentation is, and how frustrating it can be when that documentation is out of date, incomplete, or just not there. But there are other benefits to good documentation aside from convenience, and a solid system for writing and maintaining documentation is the key.

## Defining Documentation

Before we begin, we should be clear about what we mean when we say 'Project Documentation' (Docs for short). We're referring to the information for team members (developers, designers, project managers, and engineers) who join a project at some point after initial development has begun, or even long after a project is complete, such as a maintenance team. This is different than User/Tech docs (how things work on a site), and Code docs (Comments, README files, etc.). 

Good docs allow these team members to get up to speed on a project with a minimum of questions for existing or previous team members. In an ideal world, docs alone would suffice in getting someone set up and working on new features, bugfixes, or other project tasks.

## Additional Benefits

The convenience of good docs is apparent to anyone who joins a project after it has begun, but consider some of the other benefits:

* Junior developers will be able to reference docs, instilling confidence.
* A team member leaving your company will not cause as much of a 'knowledge drain'.
* _Consistent_ docs allow any team member to quickly jump in and out of projects as needed, providing project managers with additional flexibility in resource allocation.
* Long-dormant projects can be resurrected quickly, even if none of the original team members are available.
* Figuring out where a project's code is, how to install it locally, how to make/commit changes to production, and tracking down the original wireframes, designs, and planning docs can take days if the original team members are not available. Good docs can cut this time to under an hour, or even minutes in some cases.
* Docs that accompany open-source projects are especially useful in saving the end-user AND the maintainer's time.

## Location, Location, Location

Having your docs in one place, or in the same place on every project is the first step in making them easy to find - after all, what good are the docs if nobody can find them? ThinkShout uses GitHub for all of its projects, so we take advantage of the fact that every project on GitHub has a free Wiki. A link in the README.md to the wiki means everyone can find the docs in seconds.

## A Solid Foundation

The keys to good docs are _consistency_, _accuracy_, and _completeness_:

### Consistency

For our Wiki, we have a template we use for every project's docs, so we don't have to search for the information among 40 different documentation styles. Your project's needs may differ, but this should be a good starting point (this is in Markdown):

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
* Name (Back-end)
* Name (Front-end)
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

### Accuracy

The nice thing about having your docs in a wiki is that everyone in your organization can edit them if they discover they are out of date. When a new team member is added to a project, encourage them to work from the docs and see how far they can get without asking for clarification or dealing with an unexpected error. And make sure they update the docs to reflect their experience - the only time docs are 'done' is when _anyone_ can use them reliably _every_ time. If you have to ask what something means, it's likely that the next person will need to know that too - so update the docs!

### Completeness

Every project has its quirks and exceptions to the standard procedures - usually for good reason. Good docs will not only note exceptions to standard procedures, but also explain why. In addition, sometimes a 'Phase 2' project will require additional information. Make note of these major updates with details such as planning info, principals, dates, and an overview of what was accomplished.

Sometimes a developer will run across coding environment issues that hold them up - this is quite common for the complex front-end setups needed to compile SASS into CSS. Front-end developers sometimes take these setups for granted, but documenting that install process can mean that your back-end developer can handle small CSS changes without assistance:

~~~markdown
To get Sass running, `cd` to that directory and run `bundle`  
Thereafter, you only need to run `rake serve` from the theme directory.

NOTE: If you get a 'not found' error after running `bundle`,  
run `gem install bundler`, then `bundle install`.
~~~

## Part of Your Process

Finally, it's not enough to have all of these wonderful docs in place and forgotten - they have to be a part of your project setup and launch checklist, and it needs to a part of every project, big or small.

Consistent, accurate, and complete project documentation will save time, make your code easier to maintain, improve team confidence, and do a great service to every developer who comes to your project after it's finished. Docs Rocks!

