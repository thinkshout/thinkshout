---
title: Deploying a Jekyll Site on GitHub, Travis CI, and Amazon S3
layout: post
author: lev
featured: true
short: |
  Using Travis CI to deploy a Jekyll based site to Amazon S3.
tags:
- Drupal Planet
- Jekyll
date: 2014-08-22 16:00:00
---

When we [launched the new version of ThinkShout.com](http://thinkshout.com/blog/2014/03/technology-behind-thinkshout/) last spring, something glaring was missing. That little something is what companies like Pantheon and Acquia have worked so hard to solve for more complex Drupal sites, namely a deployment workflow making it dead simple to deploy changes to your site and preview them before publishing to a production server. At the time of launch, we had some rudimentary tools in place, namely a set of Rake tasks to build the site and deploy to separate staging and production environments.

This worked fine for the uber geeks among us, who had a full ruby stack running and were proficient using git and running terminal commands. But for those less technically inclined, not so good. Not to mention, the lack of automation meant lots of room for errror. The talented team at [Development Seed](http://www.developmentseed.org/) created [Jekyll hook](https://github.com/developmentseed/jekyll-hook), a node based app that listens for notifications from GitHub then builds and deploys the site based on a number of configuration options or customizations to the build script. That seemed like a good solution, and we even started work on our own [fork of the project](https://github.com/thinkshout/jekyll-hook). It was moving along nicely, and we had it running on [Heroku](http://heroku.com), which largely eliminated the need for maintaining a server. Our customizations allowed us to deploy to S3 using the powerful [s3_website gem](https://github.com/laurilehmijoki/s3_website) and deploy to different buckets depending on the branch being committed. Still, this solution required a good deal more care and maintenance than a typical site hosted on Pantheon or Aquia and lacked any built in visual status or notifications.

Around the same time, I received a great tip while attending CapitalCamp: use Travis CI to test, build, and deploy the site. This was such a such a simple and great idea that I couldn't help but slap myself on the head for not thinking of it sooner. Travis is one of the leading continuous integration platforms with tight GitHub integration. It's free for open source projects and charges a modest monthly fee for private ones. It's also dead simple to configure, comes with loads of built in features, and requires little to no ongoing maintenance. While I knew of Travis, you can't help but see those nice "build passing" images on all your favorite open source projects, ![Build Passing](https://api.travis-ci.org/travis-ci/travis-web.svg?branch=master, I didn't realize just how powerful it can be. Some highlights include:

* Supports all the major platforms including PHP, Ruby, Node, Python, and Java.
* Lots of major databases and service are avaialble, E.g., MySql, PostgreSQL, Redis, Memcache, etc.
* Has built in notifications via email, IRC, and other popular services
* Can run your test suites and report back the status
* Built in deployment to a number of platforms such as Heroku and Amazon, in addition to your own server.

The secret to all this Travis magic lies in a `.travis.yml` file located in the project root. For ThinkShout.com, it looks something like this:

```yaml
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
```

I won't go through this line by line, [there's great documentation for that](http://docs.travis-ci.com/user/build-configuration/), but basically this tells Travis:

* That we need an environment running Ruby 2.0.0.
* To execute `./_scripts/travis_build.sh` for our build.
* To only trigger the build on the master and live branches.
* Triggers a notification in our HipChat project room.

The build scrip is very simple as well:

```bash
#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  bundle exec rake stage
elif [[ $TRAVIS_BRANCH == 'live' ]] ; then
  bundle exec rake publish
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
```

While we could put script commands directly into `.travis.yml`, having a bash script affords us some additional flexibility, in our case to deploy to different S3 buckets based on the branch being committed to.

When all is said and done, we have a simple automated deployment workflow, as illustrate below

![deployment workflow](/assets/images/blog/jekyll-travis-s3.png)

Now the ThinkShout.com deployment workflow goes something like this:

1. Make a commit to the master branch. This can be done directly in GitHub, using Prose.io, or the old fashioned way in your own working copy. Note that new features are done in feature branches, which do not trigger a build, and are eventually merged into master for review.
2. The changes are pushed to our staging site for review within a couple minutes.
3. When everything looks good, a pull request is opened comparing master to live.
4. After any final discussions are complete, the pull request is merged and the code is pushed to the production S3 bucket.

That's it, done. No Ruby stack, no Jekyll build or compass compile, no worrying about S3 access keys. We're excited to refine this workflow further, including adding automated tests using PhantomJS, and put it to a real test for an upcoming site launch for a client. Stay tuned!
