---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: Watershed Now! released!! (For geeks)
created: 1283357981
permalink: blog/2010/09/sean/watershed-now-released-geeks/
tags:
- Drupal
- Distributions
- Drupal Planet

short: We literally just tagged our first 0.1 release of Watershed Now! on GitHub this morning.
author: sean
---

Hey geeks, meet <a href="http://drupal.org/project/watershednow" target="_blank">Watershed Now!</a>, our first Drupal distribution.

You can read our <a href="/blog/2010/09/sean/watershed-now-released-non-geeks">non-geek post</a> to learn more about what Watershed Now! does. <em>What Watershed Now! is</em> is a Drupal 6.x installation profile coupled with a few custom modules, a few custom parent-child themes, and some nifty <a href="http://drupal.org/project/features" target="_blank">features</a>. We literally just tagged our first <a href="http://github.com/thinkshout/watershednow/tree/v0.1" target="_blank">0.1 release</a> of Watershed Now! on GitHub this morning. It's buggy and incomplete - but it's just good enough that we are going to use this tag as the starting point for one of our customers - and in doing so we will drop the cost of development for the site by 300%, while increasing our own profitability on the project.

<h2>Building Drupal Distributions</h2>

Our experience using the usual suspects for building Drupal distros (<a href="http://drupal.org/node/159730" target="_blank">installation profiles</a>, <a href="http://drupal.org/project/context" target="_blank">context</a>, <a href="http://drupal.org/project/boxes" target="_blank">boxes</a>, <a href="http://drupal.org/project/ctools" target="_blank">ctools</a>, <a href="http://drupal.org/project/strongarm" target="_blank">strongarm</a>, and <a href="http://drupal.org/project/features" target="_blank">features</a>) has been interesting to say the least. Features in particular has made a lot of codifying config easy, while also resulting in a lot of little headaches working around niggly bits of config that just don't want to make there way into code (<a href="http://drupal.org/project/wysiwyg_imagefield" target="_blank">WYSIWYG imagefield</a> settings on an imagefield cck field being one of those little bits that just doesn't want to work for me this morning...). Avoiding circular dependences between features that interact with each other or share/compete for strongarm settings has also been a bit of a challenge. All of this is new and there just doesn't seem to be a definitive best practice to fall back on when cobbling everything together.

In terms of writing installation profiles, reading through <a href="http://developmentseed.org" target="_blank">Development Seed's</a> .profile files for <a href="http://github.com/developmentseed/openatrium_dev/blob/master/openatrium.profile" target="_blank">OpenAtrium</a> and <a href="http://managingnews.com/download" target="_blank">Managing News</a> has been tremendously helpful, as has been taking advantage of Boris Mann's <a href="http://drupal.org/project/install_profile_api" target="_blank">Install Profile API</a> module - which provides a host of API calls for creating/manipulating nodes, user accounts, roles, permissions, menus, taxonomies, etc., on build.

<h2>Continuous Integration - The Next Step</h2>

Our next step in this adventure will be to start using <a href="http://hudson-ci.org/" target="_blank">Hudson</a> for continuous integration of the distro's build process. (We learned a ton from this <a href="http://www.slideshare.net/smerrill/continuous-integration-and-drupal" target="_blank">screencast</a>.) Hopefully we'll get to the point soon where we can afford to automate our testing of the distro with <a href="http://drupal.org/project/simpletest" target="_blank">SimpleTest</a>. But for now, we'll be using Hudson on a testing server to perform scratch builds on a GitHub commit hook - which will save us hours of starting at Drupal install screens locally every time we want to test changes to our installation process.

Admittedly, we've got a bit more work to go with Hudson. Setting it up to work with Drush is actually a pretty easy process on Ubuntu (our preferred distro), as Hudson (which runs on a Java server) can be installed via .deb package management. But the process and configuration of all these tools isn't the best documented yet (we wanta help change that...) and takes research and a lot of trial and error. And as far as we call tell, the best if not only way to run an installation profile via Drush at the command line in D6.x is to install <a href="http://groups.drupal.org/hostmaster2" target="_blank">Aegir</a> and leverage it's backend, <a href="http://drupal.org/project/provision" target="_blank">Provision</a>. (Drush for D7.x provides a simple "installsite" command that cuts out this step.)

<h2>Our Current Thinking on Service Companies Releasing Open Source "Products"</h2>

We've taken a lot of inspiration from Development Seed's writing on the concept of <em><a href="http://developmentseed.org/blog/2010/mar/12/sxsw-selling-your-milk-when-cow-free" target="_blank">How to sell your milk when the cow is free</a></em>. As a smaller Drupal shop, I don't know if/when building a targeted Drupal release for a niche nonprofit vertical like watershed conservation will actually make us more profitable financially. This summer we've invested well over a hundred unbillable hours abstracting out tools that we've been building for river conservation clients. We've got at least another 200 hours of polish before Watershed Now is a point-and-click installation even remotely comparable to Managing News. And then we've got to consider the marketing hours (like this blog post) and the support time that keeping this project going will take.

There is risk and significant opportunity costs for us in this project. But having done "the consulting thing" for ten years and having built fifty-plus Drupal websites for nonprofits over the last 5 years, I'm personally excited about creating this opportunity to invest in making something on the web consistently better, the opportunity to continually explore what's possible for my heroes in the conservation movement, and the opportunity to reduce the costs of technology so that ThinkShout can sustainably reach more organizations out there on the front lines of advocacy and community improvement.
