---
title: Drupal and Salesforce Integrations Get Some (Data) Integrity
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: lev
published: true
featured: false
short: Adding data integrity and other enterprise features to the Drupal-Salesforce integration.
tags:
- Salesforce
- Drupal Planet
- Open Source
- Nonprofit Tech
- Team Sprints
- Drupal
- Drupal Community
date: 2015-04-21 17:00:00
---

Hot on the heels of our [all-hands-on-deck sprint to release](/blog/2015/01/reimagined-sprints-redhen-raiser/) [RedHen Raiser](https://www.drupal.org/project/redhen_raiser), we decided to change gears to focus on some of our marquee open source contributions, namely the [Salesforce Suite](https://www.drupal.org/project/salesforce).

The Salesforce Suite has been around since Drupal 5 and it’s evolved quite a bit in order to keep up with the ever-changing [Salesforce](http://salesforce.com) and Drupal landscapes. Several years ago, we found ourselves relying heavily upon the Salesforce Suite for our Salesforce-Drupal integrations. But there came a point where we realized the module could no longer keep up with our needs. So we, in collaboration with the maintainers of the module at the time, set out to rewrite the suite for Drupal 7.

We completely rewrote the module, leveraging Drupal's entity architecture, Salesforce's REST API, and OAUTH for authentication. We also added much-needed features such as a completely new user experience, the ability to synchronize _any_ Drupal and Salesforce objects, and a number of performance enhancements. This was a heck of an undertaking, and there were dozens of other improvements we made to the suite that you can read about in this [blog post](/blog/2012/11/lev/salesforce-rest-oauth/). We’ve maintained this module ever since and have endeavored to add new features and enhancements as they become necessary. We realized this winter that it was time for yet another batch of improvements as the complexity and scale of our integrations has grown.

In addition to over 150 performance enhancements and bug fixes, this release features an all new Drupal entity mapping system which shows a log of all synchronization activity, including any errors. You can now see a log entry for every attempted data synchronization. If there’s a problem, the log will tell you where it is and why it’s an issue. There’s now a whole interface designed to help you pinpoint where these issues are so you can solve them quickly.

![Salesforce Activity](/assets/images/blog/salesforce-activity.png)

Administrators can even manually create or edit a connection between Drupal and Salesforce objects. Before this update, the only way to connect two objects was to create the mapping and then wait for an object to be updated or created in either Drupal or Salesforce. Now you can just enter the Salesforce ID and you’re all set.

![Salesforce Edit Mapping](/assets/images/blog/salesforce-edit.png)

Take the following example to understand why these improvements are so critical. Say that your constituents are volunteering through your Drupal site using the [Registration module](https://www.drupal.org/project/registration). The contacts are created or updated in [RedHen](https://www.drupal.org/project/redhen) and then synced to Salesforce. For some reason, you can see the new volunteers in Drupal, but they are not showing in Salesforce. It used to be that the only clue to a problem was buried in the error log. Now, all you have to do is go to the RedHen contact record, and then click “Salesforce activity,” and you’ll see a record of the attempted sync and an explanation of why it failed. Furthermore, you can manually connect the contact to Salesforce by entering the Salesforce ID.

Finally, you can now delete existing mappings, or map to an entirely different content type. The bottom line is that module users have more control of, and insights into, how their data syncs to Salesforce. You can [download version 7.x-3.1](https://www.drupal.org/node/2452127) from Drupal.org and experience these improvements for yourself.

We’ve been hard at work polishing several other of our modules and tools, like the RedHen suite and Entity Registration, which also saw new releases. We’ll tell you more about what you can expect from those new versions in our upcoming blogs.

Want to chat about our module work at [DrupalCon](https://events.drupal.org/losangeles2015) in LA? You can find us hanging out with our friends from [MailChimp](/blog/category/mailchimp/) at their booth. We’d love to talk to you more about what we’re working on.
