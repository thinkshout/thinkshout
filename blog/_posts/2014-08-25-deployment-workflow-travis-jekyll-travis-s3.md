---
title: Deploying a Jekyll Site on GitHub, Travis CI, and Amazon S3
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

author: lev
featured: false
short: Using Travis CI to deploy a Jekyll based site to Amazon S3.
tags:
- Drupal Planet
- Jekyll
date: 2014-08-25 16:00:00
---

When we [launched the new version of ThinkShout.com](/blog/2014/03/technology-behind-thinkshout/) last spring, something glaring was missing. That little something is what companies like [Pantheon](https://getpantheon.com) and [Acquia](https://www.acquia.com/products-services/acquia-cloud) have worked so hard to solve for more complex Drupal sites: an automated deployment workflow making it simple to push changes to your site and preview them before publishing to the production server. At the time of launch, we had some rudimentary tools in place, namely, a set of Rake tasks to build the site and deploy to separate staging and production environments.

This worked fine for the über-geeks among us who had a full Ruby stack running and were proficient using git and running terminal commands. But for those less technically-inclined, it was not so good. Not to mention the lack of automation left ample room for errors. The talented team at [Development Seed](http://www.developmentseed.org/) created [Jekyll hook](https://github.com/developmentseed/jekyll-hook), a node-based app that listens for notifications from GitHub and then builds and deploys the site based on a number of configuration options or customizations to the build script. That seemed like a good solution, and we even started work on our own [fork of the project](https://github.com/thinkshout/jekyll-hook). It was moving along nicely, and we had it running on [Heroku](http://heroku.com), which largely eliminated the need for maintaining a server. Our customizations allowed us to publish to S3 using the powerful [s3_website gem](https://github.com/laurilehmijoki/s3_website) and deploy to different buckets depending on the branch being committed to. Still, this solution required a good deal more care and maintenance than we were comfortable with, maintaining a separate build server, and lacked any built-in visual status or notifications.

Around the same time, I received a great tip while attending CapitalCamp: use [Travis CI](http://travis-ci.org) to test, build, and deploy the site. This was such a great idea that I literally slapped myself on the head for not thinking of it sooner. Travis is one of the leading continuous integration platforms, has tight GitHub integration, is free for open source projects, and charges a modest monthly fee for private ones. It's also dead simple to configure, comes with loads of built-in features, and requires little to no ongoing maintenance. While I knew of Travis I didn't entirely realize how powerful it was. Some highlights include:

* Supports all the major platforms including PHP, Ruby, Node, Python, and Java
* Lots of major databases and service are available: MySql, PostgreSQL, Redis, Memcache, etc.
* Has built-in notifications via email, IRC, and other popular services
* Can run your test suites and report back the status
* Built-in deployment to a number of platforms such as Heroku and Amazon, in addition to your own server

The secret to all this Travis magic lies in a `.travis.yml` file located in the project root. For ThinkShout.com, it looks something like this:

~~~yaml
language: ruby
rvm: 2.0.0
script: "./_scripts/travis_build.sh"
branches:
  only:
  - master
  - live
env:
  global:
  - secure: ...
  - secure: ...
notifications:
  hipchat:
    rooms:
      secure: ...
~~~

I won't go through this line by line, [there's great documentation for that](http://docs.travis-ci.com/user/build-configuration/), but basically this tells Travis:

* We need an environment running Ruby 2.0.0.
* Execute `./_scripts/travis_build.sh` for our build.
* Only trigger the build on the master and live branches.
* Trigger a notification in our HipChat project room.

The build script is very simple as well:

~~~bash
#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  bundle exec rake stage
elif [[ $TRAVIS_BRANCH == 'live' ]] ; then
  bundle exec rake publish
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
~~~

While we could put script commands directly into `.travis.yml`, having a bash script affords us some additional flexibility; in our case, to deploy to different S3 buckets based on the commit branch.

When all is said and done, we have a simple automated deployment workflow that looks like this:

![deployment workflow]({{ site.baseurl }}/assets/images/blog/jekyll-travis-s3.png)

The explicit version of the workflow goes like this:

1. Make a commit to the `master` branch. This can be done directly in GitHub, using Prose.io, or the old fashioned way in your own working copy. Note that new features are built in feature branches which do not trigger a build, and are merged into master only when they are ready for review.
2. The changes are automatically pushed to our staging site for review within a couple minutes.
3. When everything looks good, a pull request is opened comparing master to live.
4. After any final discussions are complete, the pull request is merged and the code is pushed to the production S3 bucket.

That's it, done. No Ruby stack, no Jekyll build or Compass compile, no worrying about S3 access keys. We're excited to refine this workflow further, including adding automated tests using PhantomJS, and put it to a real test for an upcoming site launch for a client. Stay tuned!
