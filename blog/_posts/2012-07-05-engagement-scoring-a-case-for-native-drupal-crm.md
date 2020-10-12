---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: Engagement Scoring - A Case for Native Drupal CRM
created: 1341522069
permalink: blog/2012/07/sean/engagement-scoring/
tags:
- nonprofit tech
- RedHen
- Drupal Give
- Drupal Planet
short: Measuring the interactions between site visitors and your website.
author: sean
---
**Engagement scoring** - often referred to as "engagement analytics" or "engagement metrics" - is a relatively new concept in measuring the interactions between site visitors and your website. Web analytics packages such as Google Analytics generally focus on measuring *quantitative* analytics - or the number of page visits and clicks. Engagement scoring focuses on measuring the *quality* of these interactions by weighting the value of different types of interactions. For example, sharing an article from your website to a social network might be worth *5 engagement points*, whereas commenting on a blog post might be worth *10 engagement points*.

For almost half a decade, the Drupal [User Points](http://drupal.org/project/userpoints) module has provided a framework for measuring website engagement of *logged-in* site visitors.

> **But what about tracking the engagement of anonymous site visitors?**

The majority of Drupal websites that we build allow anonymous users to leave comments on blog posts, fill out surveys via Webform, make e-commerce transactions and/or sign up for events. Often such transactions require the visitor to provide an email address. What if all of these engagements could be tracked over time by an anonymous visitor's email address? And what if the data that we collect on these individuals could be easily funneled into a CRM solution?

## Enter RedHen CRM Engagement Scoring

[RedHen CRM](http://drupal.org/project/redhen) is a native CRM solution built in Drupal 7. I won't go into the larger, general RedHen description here, as you can [read more about RedHen on our blog](/blog/tag/redhen). The focus of this post is on the RedHen Engagement system. The RedHen Engagements sub-module provides an API and framework for tracking and **measuring** engagement, through a configurable scoring system, for both authenticated users and anonymous visitors. Anonymous visitors are currently tracked by a given email address, but we have future plans to add session and IP address tracking as well.

The module integrates out of the box with the "RedHen Notes" module, so that offline interactions with RedHen contacts - such as phone calls or in-person meetings - can be tracked and scored. The module also integrates with [Rules](http://drupal.org/project/rules), so that you can programmatically score different types of engagement.

![Anne's engagement](https://dl.dropbox.com/s/ap2wwzeez9kf0q8/engagement_scores.png)

The screenshot above provides a look at the engagement scoring report for an individual contact in RedHen CRM. (A contact's total engagement score is also included on the summary tab.) The first score referenced in this list refers to engagement points assigned manually based upon the creation of a RedHen note capturing an offline conversation:

![Offline note](https://dl.dropbox.com/s/ost2yevtihg7uk5/engagement_scoring_note.png)

The value of each type of engagement score can be configured through RedHen's admin interface. Likewise, new types of engagement scores can be created:

![Manage engagement scores](https://dl.dropbox.com/s/6o8diqt0d49xgum/manage_engagement_scores.png)

## Rules Integration

The RedHen Engagements module's integration with Rules is where things get really interesting:

![Rules](https://dl.dropbox.com/s/x1fkmnkj5ezpegj/rules.png)

Admittedly, our team hasn't completely fleshed out all the possible Rules that could trigger engagement scores. *(We're hoping some of you will help us out with that…)*

At this time, the RedHen Engagements module can automatically score three different types of engagement:

* Event registrations created via the [Entity Registrations](http://drupal.org/project/registration) module.
* Blog comments left by authenticated users or anonymous blog comments when anonymous commenting is configured to require an email address.
* [Webform](http://drupal.org/project/webform) submissions from authenticated site users. (Note: since webform doesn't require an email address for anonymous users, scoring anonymous submissions requires a bit more work and the inclusion of an email field in the webform components.)

In the future, we hope to support more interactions, such as user logins, user account creation, and e-commerce transactions.

For an example of how Rules are configured, check out how a Rule is created for scoring blog comments:

The first step is to create a new Rule that fires after saving a new comment:

![Comment event](https://dl.dropbox.com/s/fwllhiefei9nf6j/rules_comment_event.png)

Once the Rule has been created, we configure the Rule to trigger our new "Engagement - Score comment engagement" action:

![Comment action](https://dl.dropbox.com/s/c7bh6gntmohcqfm/engagement_action.png)

Here we can choose which scores will be provided when a comment is created:

![Comment action settings](https://dl.dropbox.com/s/ipcijem4l963uqp/engagement_action_comments.png)

Notice that using "Rules Conditions" we can get even more granular in scoring different types of comments with different engagement score values. Hypothetically, you could choose to score comments left on "blog" nodes differently from comments left on "page" nodes. You could also score anonymous comments differently than comments from authenticated users.

## What's Next?

Now that we have a basic framework in place for engagement scoring in RedHen CRM, we are excited to start developing a more robust engagement score reporting interface, similar to the [Google Analytics Reports](http://drupal.org/project/google_analytics_reports) interface. A quick and dirty wireframe of this interface is shown below:

![engagement dashboard](https://dl.dropbox.com/s/fwapawaenk4a9ce/Engagement_report.png)

## Get Involved!

While ThinkShout is largely focused on developing RedHen CRM features that support our nonprofit and "association management" clients, we see great opportunities for this module across a wide variety of verticals. We encourage you to download the tools and start playing around on the RedHen farm!
