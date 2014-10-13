---
title: Success building CMS-less production sites with Jekyll
layout: post
author: alex
published: true
featured: true
short: |
  The challenges and solutions of building a CMS-less site that can be managed by the layman.
tags:
- jekyll
- ruby
- nonprofit
date: 2014-10-13 16:00:00
---
Serving nonprofits, ThinkShout is no stranger to the "small organization, big impact" problem. The problem being: small organizations have budgets commensurate with their size and goals for which the sky is the limit.

To resolve this problem requires acute awareness of how to build what is necessary and sufficient to allow an organization to meet their goals. In other words, "how can we build everything this organization needs and nothing more."

When [Feeding Texas](http://www.feedingtexas.org/) approached us to redesign their site, it became clear we could leverage both their small size _and_ their large ambitions as "pros" for using [Jekyll](http://jekyllrb.com/). Feeding Texas is an organization working to provide food security to Texans through a statewide network of food banks, scalable public action that empowers Texans to collaboratively solve their hunger problems, and guiding the public conversation surrounding hunger in Texas. The site is designed to advance this work insofar as it engages visitors at a local level first and leads them to connect with Feeding Texas in their state-wide effort to end hunger. More specifically, generating interest about hunger in individual communities motivates people to want to do their part to resolve the much larger issue Feeding Texas is at the center of.

### Why Jekyll is suitable for small organizations needing to make a big impact
Feeding Texas two characteristics shared by many small organizations:

1. Limited capacity to generate and update content
2. Need to appear as big as a BIG organization

Jekyll is the glass slipper for this dilemma for two reasons:

1. **Large budget savings by not implementing an in-site CMS** – a small content management team means relatively simple content management needs. No reason to use a full-blown CMS like Wordpress or Drupal provide.
2. **Rapid development and excellent DOM control** allowed these savings to be reinvested in the site's visual presentation with maximum returns

However, this left us with one big engineering question...

### Jekyll has no CMS. How do we allow non-technical end users to manage content!?

Our solution to this problem is multi-faceted...

#### GitHub for content management

Since all content for a Jekyll site is stored in text files (markdown, csv, HTML, etc.) all content can be managed from the GitHub interface. Alternatively there are tools like [Prose](prose.io) that are well integrated with Jekyll and allow for a more robust content editing experience.

##### Complex content management with simple CSV inputs
Tools like Github allow for simple updates like changing text on a page, but can also allow for complex content management as is the case with Feeding Texas' [zip-code detail pages](http://www.feedingtexas.org/zip/78056/). These pages are generated from a CSV input that holds data for each zip code in Texas. The CSV file is processed when the site is built by a [custom Ruby plugin](https://github.com/thinkshout/feeding-texas/blob/master/_plugins/csv_to_page.rb) that creates a page for each zip code. From a content management standpoint, this means Feeding Texas can update hundreds of pages in 3 simple steps:

1. Edit the CSV file with whatever tool they'd like (Excel, etc.)
2. Copy and paste the contents of the file into the GitHub interface
3. Commit the updated file

This commit then triggers a re-build of the site wherein each zip code detail page will contain the updated CSV data.

##### Reusable content blocks

Another popular content management concept that was difficult to implement in Jekyll until the 2.0.0 release was blocks of content that could be stored in a single place and used in multiple places around the site. [Collections](http://jekyllrb.com/docs/collections/) made this much easier. On the Feeding Texas site we created collections for several things ranging from [calls to action (scroll to page bottom)](http://www.feedingtexas.org/learn/communities/hunger-atlas/) to [staff profiles](http://www.feedingtexas.org/about/staff/) that can be placed anywhere on the site by specifying their index (where index could be any YAML frontmatter variable). So, for example, if a Feeding Texas content manager wanted to create and use a new call to action block, they would do two things:

1. Create a markdown file for the block and include a frontmatter variable like this: ```index: 1```.
2. Then to apply the new block to a page, they'd specify the block's index as a frontmatter variable in the page's markdown file like this: 

```
calls_to_action:
  - 1
  - 2
```
...and our templates do the rest.

##### Challenges of using GitHub as a content management tool
One difficulty of using GitHub for content management is there is no way to add image or video files through the GitHub interface. This is problematic because it is something content managers expect to be able to do, and we cannot simply add the files to the (compiled) live site directory (via FTP for example) because each commit triggers a wipe and a rebuild of said directory. To work around this problem, we created an Amazon S3 bucket dedicated to storing assets (images, videos, etc.) and reference the assets statically anywhere they need to be used on the site.

As a side note, the site is also hosted on an S3 bucket and we did consider putting both S3 buckets behind a CDN, but ultimately decided this was not necessary. That said, it'd be a trivial way to increase site performance if we ever wanted a boost.

Since assets are stored on a server that will persist, management of them becomes very straightforward. Feeding Texas uses S3's built in file management UI (pictured below), but you could just as easily use [Transmit](http://panic.com/transmit/) or any other FTP client.
![S3 file management UI](/assets/images/blog/amazon-s3-file-mgmt-ui.png)

#### Travis CI for deployment
[Travis](https://travis-ci.com) is a continuous integration platform that is tightly integrated with GitHub. With a [single configuration file](https://github.com/thinkshout/feeding-texas/blob/master/.travis.yml), we were able to set up a fully functional deployment workflow that includes a staging and a production site. A commit to a particular branch in GitHub triggers Travis to build and deploy the site automatically to a specified endpoint. So, for example, editing and committing a file in the ```staging``` branch triggers a deployment to the staging site whereas a commit to the ```live``` branch triggers a deployment to the live site. For a more in depth look at how to configure a deployment workflow like this, check out [Lev's post on how we're doing it for the ThinkShout site](http://thinkshout.com/blog/2014/08/deployment-workflow-travis-jekyll-travis-s3/).

As an added bonus we can leverage GitHub's pull request feature as a content management tool. For example, a staff writer could create several pieces of content in the ```staging``` branch and then bundle those commits into a pull request for their editor to approve and merge into the ```live``` branch.

Our Travis configuration file also specifies tests to run before deploying a new build of the site, which prevents a bad commit from generating a broken site. Travis has several testing frameworks [baked in](http://docs.travis-ci.com/user/gui-and-headless-browsers/), but if those aren't enough you can also install tools via your Travis configuration file. We, for example, [install CasperJS](https://github.com/thinkshout/feeding-texas/blob/master/.travis.yml#L7) for our tests.

###We did it! A CMS-less site ready for production use!
Having thought our way around using a full-blown CMS, like Wordpress or Drupal provide, we got two big wins:

1. **A lightening fast site** – because Jekyll sites are static all of the "heavy lifting" is done when the site is being generated; no database calls or logic layer to slow things down. Also no in-site CMS!
2. **Time to spend making the site look like a million dollar project** – because we spared ourselves the time it would have taken to configure a CMS, we were able spent it integrating neat JavaScript like the maps and charts you seen on [zip code detail pages](http://www.feedingtexas.org/zip/78056/).

I'm looking forward to building more Jekyll sites and am personally thrilled we devised a way to leverage it's strengths to work in cooperation with the needs of our nonprofit client base.