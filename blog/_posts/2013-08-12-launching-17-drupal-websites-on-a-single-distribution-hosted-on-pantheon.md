---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: Launching 17 Drupal websites on a single distribution, hosted on Pantheon
created: 1376332989
permalink: blog/2013/08/distribution-hosting-with-pantheon/
tags:
- Drupal Planet
- Drupal
- Distributions
short: How we built a flexible, integrated CMS & CRM solution for repeat deployment with Pantheon hosting
author: sean
---
## The challenge: To build a flexible, integrated CMS & CRM solution for repeat deployment

[The Forum of Regional Associations of Grantmakers](http://givingforum.org), a national network that supports and strengthens regional associations in their promotion of effective philanthropy to improve lives in their communities, consists of 34 geographically-based professional associations, each staffed by one to twenty+ people. Seventeen associations share a common technology platform. The Forum wanted to move away from a very custom content management solution and CRM to something more open and flexible. The associations chose Drupal for CMS, Salesforce for CRM, and ThinkShout to build the distribution, including the integration code for syncing Drupal with Salesforce. (Jackson River developed the Salesforce managed package.) 

## Why we considered Drupal multisite — but advised against it

Initially, we did consider going with Multisite. Two things kept us from recommending it for this particular client: 

1. Hard to customize. All 17 websites would be using the same codebase. It’s hard to manage that many customizations, and to pull in customizations across that many websites. 
2. Risky to update. Things can become quite fragile with Multisite, even in testing. If you screw up, you can take down 17 websites with just one click. 

Ultimately, we recommended the [Pantheon](https://www.getpantheon.com/) Zeus platform.

## Why Pantheon Zeus?

We recommended Zeus for a few reasons: 

1. One shared distribution. Pantheon is the only solution that allows a network of nonprofits to roll out a shared Drupal distribution. There are other ways to deploy and manage multiple websites running on a shared distribution — [Aegir](http://www.aegirproject.org/), for example, but Aegir can be difficult to deploy and maintain. Pantheon’s managed distribution tools are unbelievable. Without Zeus, we’d need to do another 100 hours of custom development operations. There’s nothing else on the market like it, period. 
2. Ease of updates and spinning up new sites. It’s also easy to merge specific distribution updates with custom work on a given instance.
3. High value. The out-of-the-box performance is really high compared to other offerings. Also, the pricing is significantly more competitive. The total cost of ownership on these sites is lower, too, because of the infrastructure Pantheon provides. I tell my clients they can’t just look at line items when they’re evaluating their options. They have to look at how it reduces development costs and streamlines support over time.
4. Responsive service. Zeus comes with a top-notch service level agreement. Other providers don’t always respond if you’re not on their highest-level plan. I’ve noticed that Pantheon treats their nonprofit clients the exact same way they treat everyone else. They’ve always been accessible and open to our feedback. 
5. Easier to customize. As a development shop, our goal is to build really custom, beautiful sites that are unique to each client. Because we have a lower-level feature set, all our clients need customizations, and we need Zeus. Zeus allows us to easily merge new features and custom code in and out. It’s better than anything else out there. 

## The solution

1. AN OUT-OF-THE-BOX DRUPAL DISTRIBUTION. We built a robust Drupal distribution offering significant functionality out of the box to every regional association, significantly reducing customization costs. Now each regional association has a common starting point and feature set, which can be extended to meet any unique needs.  
2. SALESFORCE INTEGRATION. Anyone with site-building skills can sync any Salesforce object with any Drupal entity. The distribution has a starting point for mappings, which are easy to change and customize. If an association wants to use the tools in its shared Salesforce template, it can roll out a version of the Salesforce package, spin up the distribution on Pantheon, then work with us or any other vendor to customize the package. ThinkShout also released a completely new version of the Salesforce integration suite for this project. 
3. A DISTRIBUTED RESOURCE LIBRARY. Having Pantheon allowed us to build a distributed resource library so each regional association can share resources for grantmakers directly with their colleague associations. The Forum anticipates a resource library of over 4,000 pieces of content that will grow over time. We’re using Apache Solr to index the content. 

Most of the sites are in staging right now, while others are slated to launch within the next 3 to 6 months. 

This fall, we’ll also roll out a feature that lets associations create their own public and private membership directory landing pages — without having to write new code.

## Any hiccups?
 
Our client knew they were early adopters of Zeus, and they were the first non-developers to deploy sites on Zeus. There have been some bumps along the road, but it’s easy to accept that things are new when Pantheon has such a high level of accountability. The team at Pantheon has been very attentive to our feedback, and quick to make reasonable changes to the platform to meet our client’s needs. 

## The outcome: Innovation made simple

Pantheon is the only tool that allows our clients to roll out websites one at a time by themselves, without needing to rely on us for feature and site deployments. If an association decides to launch, it has all the tools in hand to do that, without touching any code. That’s pretty unique. 

Each regional association can also manage its own customizations or pull in new innovations to give back to its distribution. For example, three regional associations can team up to develop and build a new feature, to be shared with all the other associations. 

The Zeus architecture makes it easy for us to take the code that powers new features, and roll it back into our distribution. Once we’re ready to push these changes upstream into the Zeus git repository, regional association website managers can log in, pull down the new functionality we’ve built, test it using Pantheon’s development workflow and tools, then deploy with two clicks. The interfaces for managing the three environments are very intuitive. It was easy to train our clients on how to manage code through the admin console.
