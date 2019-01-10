---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: What we're up to; what we're into
created: 1320865619
permalink: blog/2011/11/sean/catching-up/
tags:
- Drupal Planet
- ThinkShout

short: Alas, the "we should blog about that" queue is getting pretty heavy here at the office.
author: sean
---
Alas, the "we should blog about that" queue is getting pretty heavy here at the office. It's been a busy ten months since Lev and I officially opened the doors here at ThinkShout, Inc. And as we've been talking with developers this month about coming on board with the team, we've realized that we're missing an opportunity to share with the community what's been inspiring us in our own work, as well as in the Drupal community at large.

This blog post does a poor job of addressing that fact. But here goes...

## What we're into... ##

### Responsive design ###

Over the last two months we've come to embrace responsive design as the starting point on every project for which we can influence site architecture decisions. Diving into responsive has affected almost every aspect of our sales, development and project management processes. It's changed the way that we scope projects, the way that we prioritize features, the way that choose graphic design partners, and the way that we choose browser-based technologies for building interactive maps, jquery-driven slideshows, etc.

Interestingly, in embracing responsive we're also managing to get ourselves out of the IE6/7/8 cross-browser support business. By _selling_ responsive design in the project estimation process, we are better able to convince clients of the value in embracing modern browser platforms - as opposed to developing for the lowest of the low compatibility issues.

Soon we'll have a couple case studies and technical write-ups of our responsive theming work - as well as how responsive has affected our wireframing process. But what I can say now is that we're designing for mobile _first_ and that we're deep into the [Omega](http://drupal.org/project/omega) theme camp.

### Leaflet and MapBox ###

As maintainers of several [OpenLayers-based modules](/blog/2011/09/lev/openlayers-love-drupal-7), we've been involved in the Drupal mapping space for quite some time. However, because of our interest in mobile and HTML5, this summer we started work on a new [Leaflet module](http://drupal.org/project/leaflet) for Drupal. We've also been getting heavily into Development Seed's [MapBox](http://mapbox.com) tool suite. We've been doing our own custom cartography work, producing watershed-based map [tilesets](http://tiles.mapbox.com/thinkshout/map/map-1318268325327). In addition, this winter we will be helping Oregon's [The Intertwine](http://theintertwine.org/) launch a new urban trails guide for the Portland area which leverages responsive design, Leaflet, and custom Tilemill tiles served up via Tilestream.

## What we're up to... ##

The truth is that there's not much difference between what we are _into_ and what we're _up to_. We are really fortunate to work with clients to share our interest in open source contributions and who give us the opportunity to tinker with new technologies. But for the purposes of this post, I guess I'll make the distinction.

### Content Migrations ###

Geeky, I know...But our newest team member, [Brandon Lee](/team#brandon), has been enjoying the heck out of working on a complex migration of the content from two Drupal 6.x sites and one Drupal 5.x site to a single Drupal 7.x site. In the process, he's had the opportunity to roll up his sleeves and get into the weeds of the [Migrate 2.x](http://drupal.org/project/migrate) module.

Lev and I couldn't be more excited for Brandon to develop this passion. I'm doubtful that we'd ever try to position ourselves as the next [Cyrve](http://cyrve.com/), but it's great to bring on this skill set.

### Event Registrations ###

This spring we had the opportunity to develop a custom event management tool for our friends at [Manhattan Kayak Company](/portfolio/manhattan-kayak-company) in NYC. Abstracting that work into a Drupal contributed module, we've been actively working on an entity-base event sign-up tool for Drupal 7.x. The project is currently called [Entity Registrations](http://drupal.org/project/registration). We're talking with the good folks who manage the [Signup module](http://drupal.org/project/signup) about porting our work there as the 7.x-2.x branch of sign-up, as well as potentially working the module into Drupal's [Conference Organizing Distribution, cod](http://drupal.org/project/cod).

We're also excited to have a number of larger client engagements this winter that will fund new features for this entity-based registration system, an approach we've had some success with and discussed at the recent [BADCamp NP Summit](http://2011.badcamp.net/drupal-non-profit-summit). We anticipate releasing CRM integration, paid event management, and group-based sign-up features over the next few months - so stay tuned.

### MailChimp, MailChimp, MailChimp ###

MailChimp is one of our favorite technologies - as well as one of our favorite clients. Over the last 10 months, the usage of our [MailChimp integration module](http://drupal.org/project/mailchimp) has more than doubled to just shy of 6K. This summer we released an integration with MailChimp's transactional email service - allowing Drupal sites to send all outgoing mail via MailChimp, as well as to collect robust delivery analytics from the service.

With a number of CRM-related projects on our horizon, we will be working hard over the next few months to build out a third integration with MailChimp's campaign feature - which, in short, will allow us to develop bulk-email tools natively in Drupal.

### Native Drupal CRM ###

In addition to a number of Salesforce integration projects, this winter we will be lighting a fire under [Red Hen CRM](http://redhencrm.com) - the native Drupal 7.x CRM initiative we started just prior to DrupalCon Chicago. It's still unclear whether or not we'll piggy back this work off of another project, such as Trellon's CRM initiative. Regardless of the details, we are very excited for the opportunity to contribute more time, energy, and code to this important Drupal initiative.

## Other teasers... ##

Obviously there's always more to get excited about. So, here are a few phrases describing other stuff that we're excited for tackling this winter: open data, custom JSON parsers for the Feeds module, the Open App Marketplace, Drupal 7.x distributions, [Pantheon](http://getpantheon.com), custom Solr facets, the Media module, QR codes, smarter usage of EntityFieldQuery, developing our own Drupal-base virtual project board, etc...

## Help us... ##

That's right. We've got a lot going on and are looking to bring on another senior-level Drupal engineer. So, if you know anybody who would like to live in always-sunny PDX, Oregon - have them check out the following [announcement](/blog/2011/10/sean/thinkshout-hiring).
