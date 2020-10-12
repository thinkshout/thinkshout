---
layout: blog
body-class: blog-post
title: Porting ThinkShout to Drupal 8
homepage: false
author: gabe
published: true
featured: true
short: Bringing our open source contributions to Drupal 8
tags:
  - Drupal Planet
  - Drupal
  - Drupal 8
  - Drupal modules
  - RedHen
  - Entity Registration
  - MailChimp
  - Mandrill
  - Salesforce
  - Development
date: 2016-02-23 15:00:00
image: /assets/images/thinkshout-logo1.jpg
topic: archive
header-image: /assets/images/ts_redesign/blog/up-and-theming1.jpg
header-image-alt: "Image: Model Thinkshout Employees"
---

A fundamental part of ThinkShout’s philosophy and business is to not only use great open source tools, but to [actively give back](/blog/2015/03/the-how-and-why-of-open-source/) to the open source community. The most recognizable part of that contribution is in the form of Drupal modules: over 60,000 Drupal sites run on ThinkShout technology! This strategy has been a huge [win for our clients](/blog/2014/09/small-business-of-nonprofits/), who get features, bugfixes, and security updates from the community because they are sharing code. We benefit from this work as well, as it enhances our profile in the community and helps us generate leads for new projects. Of course, the vast majority of these sites are built on Drupal 7, which [released](https://www.drupal.org/drupal-7-released) in the same month that [ThinkShout was founded](/blog/2016/01/five-years/).

The exciting and much-anticipated release of Drupal 8 has given us a lot to think about. Internally, we’ve been running a Drupal 8 "book club" to give our development team a chance to dive in and figure out what’s going on with D8. While we’ve bathed in the glories of Composer, Twig, and YAML files galore, we’ve also had a chance to start upgrading a few of our favorite modules to Drupal 8!

With support from the incredible folks over at [MailChimp](http://mailchimp.com/), we’ve already got a working release of the [MailChimp integration module](https://www.drupal.org/project/mailchimp) for Drupal 8, and are hard at work on the [integration with Mandrill](https://www.drupal.org/project/mandrill), MailChimp’s awesome transactional email service, which may have a Drupal 8 release before this blog post goes live.

This is a great start, but it’s really only the tip of the iceberg: ThinkShout has about 50 modules released for Drupal 7! As much as we’d love to dive in and update all of them for Drupal 8 today, that’s not particularly practical. To better focus our work, I analyzed some of these modules so we can prioritize them and look for opportunities to work with our partners and clients to get the most useful, popular, and important modules upgraded to Drupal 8 first.

Of our 50 modules, we started by de-prioritizing anything that was:

* Extremely narrow in purpose ([Entity Reference Plus Data](https://www.drupal.org/project/er_plus))

* Blocked by another module’s Drupal 8 development ([Apache Solr Geo](https://www.drupal.org/project/apachesolr_geo), lots of others)

* Offers modest functionality replaceable by custom code ([Footer Message](https://www.drupal.org/project/footer_message)) or

* Just not seeing much usage ([Instagram Realtime](https://www.drupal.org/project/instagram))

That left us with around 10 projects, among them MailChimp and Mandrill, which we were already working on. We wanted to pick a manageable number of these remaining modules to get started on.

Based on community usage, the priorities of our clients, and perceived usefulness, it was clear that the [Registration module](https://www.drupal.org/project/registration) belonged on this list. The story of Registration’s development is connected to the story of ThinkShout’s fledgling years and open source philosophy, so it’s an added bonus that Registration will be part of our early push into Drupal 8.

ThinkShout has also carved out a reputation as experts in the CRM world, with [RedHen](https://www.drupal.org/project/redhen), our leading Drupal-integrated CRM, and the [Salesforce Suite](https://www.drupal.org/project/salesforce), a fabulous tool for integrating Drupal sites with Salesforce. Though these modules don’t have the 5-digit usage numbers that Registration or MailChimp have, they still have lots of users who are very engaged, and are central to the needs of our clients. We added them to the top of the list for Drupal 8 consideration.

In thinking about the rest of our modules and the nature of our work, it became clear that these three projects really stand out from the rest: they are our "Big 3", and we set about creating a roadmap for developing them on Drupal 8.

You can already see the beginnings of this work! At our team sprint on February 11, we put together an outline for bringing RedHen to Drupal 8, and pushed the first commits to Drupal.org.

![porting-thinkshout.jpg](/assets/images/blog/porting-thinkshout.jpg)
*These are our sprint faces!*

As of February 11, all of the Big 3 have nominal Drupal 8 branches.

As we kick off four Drupal 8 sites in the first part of this year, we will be working with our clients to bring Registration, RedHen CRM, and Salesforce Suite to Drupal 8. All three should update beautifully, as they are built on top of Entity API, which is part of Core in D8.

We will also be focusing our internal open source contribution hours on these three projects to kickstart their jump into the Drupal 8 sea. If you’re looking for awesome CRM or registration systems for your Drupal 8 site, fear not! They are on their way.

We have two Drupal 8 sites utilizing ThinkShout core technologies scheduled for launch this summer, so look for a release of RedHen in the spring!

Our next round of prioritization will depend significantly on the progress of Commerce solutions in Drupal 8: once that landscape settles, we have some projects that will jump up that priority list, including:

* [Registration Commerce](https://www.drupal.org/project/registration_commerce), our favorite paid registration solution

* [RedHen Donation](https://www.drupal.org/project/redhen_donation), our CRM-integrated, single-page donation tool

* [Commerce IATS](https://www.drupal.org/project/commerce_iats), the payment integration module for our favorite nonprofit-focused payment processing partner, [iATS Payments](http://home.iatspayments.com/) 

So if you’re a fan of our Commerce integrations, or [Add to Cal](https://www.drupal.org/project/addtocal), or even little [Bean Entity View](https://www.drupal.org/project/bean_entity_view) (I know I am): stay tuned! We love these tools, we love that you’re using them, and we look forward to bringing you even more awesome stuff for Drupal 8 than we have for Drupal 7!

