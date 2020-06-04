---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: 'MailChimp 2.0: Anatomy of a Drupal module rewrite'
created: 1309465429
permalink: blog/2011/06/lev/mailchimp-20-anatomy-drupal-module-rewrite/
tags:
- Drupal
- Drupal Planet
- MailChimp
- modules

short: A major milestone for integration between MailChimp and Drupal.
author: lev
---
<a href="http://mailchimp.com"><img src="/sites/default/files/freddie.png" alt="Freddie" height="177" width="150" style="float:right; margin: 0 0 20px 0"></a>I first wrote the [MailChimp module](http://drupal.org/project/mailchimp) for a side project I was working on (MomHub) towards the end of 2007. It was my first standalone module, and the first one I posted on [drupal.org](http://drupal.org). That module, and every update since, has basically offered the ability to synchronize a site's users with more one or more MailChimp lists based on role, in addition to standalone subscription forms. Over the years, the module has grown in popularity along with the MailChimp service itself, and there are now nearly [4000 reported installs](http://drupal.org/project/usage/mailchimp). Still modest, but a sizable base which needs to be taken into consideration when releasing updates.

I quickly faced a challenge many contributors encounter as their modules grow in terms of usage and complexity. These challenges include finding the time to maintain and support the module and adding new features when there is no support from a client or employer. In this case, [MailChimp](http://mailchimp.com) came to the rescue and partnered with ThinkShout in late 2010 to sponsor the module. We agreed to maintain and support the current Drupal 6 version and rewrite the module for Drupal 7, for which we have just completed a [release candidate](http://drupal.org/node/1204522).
<!-- break -->
## Why a rewrite
* Nearly 4 years of technical debt, time to start clean.
* Initial architectural decisions could have been better. It was my first module!
* Take full advantage of changes in the MailChimp API.
* New features and API changes in Drupal 7, which we've used whenever possible:
  1. Entities
  2. Tokens
  3. Form states
  4. Queue system for batch processing during cron
  5. Mail interface
  6. Custom cache bins
  
## What's new
### Modular architecture
The origin module had all of the features crammed into a single module, with a focus on meeting the needs of a very specific feature set. The result was features that were difficult to extend / alter, and almost no API interfaces for developers to interact with the MailChimp API outside of the fairly narrow use case the module handled. For 2.0, we split out the module into a fairly minimalist API module, with a submodule for each primary use case. In addition to providing much needed flexibility, this makes the module much more lightweight as submodules can be enabled/disabled as needed, or just the API module can be used for custom development. The module is currently bundled with the following:

1. mailchimp.module: Core API integration and general settings.
2. mailchimp_lists.module: This contains much of the functionality of the original module, namely synchronizing Drupal users with MailChimp lists and enabling subscriptions, albeit with many improvements.
3. mailchimp_sts.module: Allows all site emails to be sent through the MailChimp STS API by exposing it as a Drupal mail interface.

As significant new features are added, the additions will be as new submodules, or standalone projects dependent on just mailchimp.module.
## Lists as first class citizens, err, entities
In MailChimp 2.0, lists are entities, enabling all the entity goodness that Drupal 7 provides. The previous version simply saved each MailChimp list and its corresponding settings into a single serialized variable. There are several reasons this approach could be improved upon, not the least of which it forced a 1 to 1 correlation between MailChimp lists and their use on the site. Now, you can essentially create more than one _instance_ of a MailChimp list, assigning it unique meta data, exposing it as block, etc.

Since lists are entities, they are also field-able, allowing for customizations during enrollment, [Views](http://drupal.org/project/views) and [Rules](http://drupal.org/project/rules) integration, you name it! After much deliberation, we decided to base the entity structure on the [EntityAPI](http://drupal.org/project/entity), primarily to gain the Views and Rules integration essentially for _free_. Hat tip to everyone involved with that project.
## Revamped user interface
One of the major problems the module faced was a cluttered interface, especially when an organization had more than a few MailChimp lists. First off, all of the settings for the module and for each individual list were smashed into a single page, with nested collapsible fieldset hell. It seemed like a good and easy solution when first conceived, but fell apart as the number of settings grew, and completely failed to account for an organization having many lists. The approach we took was to first break out the list settings into their own tab / local task. The list landing page simply has a table of existing lists with summary information and links to edit the list and directly access the associated MailChimp list. There's also a local action for adding a new list. The list add/edit form itself lives on its own and is complex in its own right, especially with all the new features and settings. It still has a few of those fieldsets, but they are used to categorize the sections of settings. We're also taking advantage of form states to toggle the available settings based on the type of list selected. There's an ajax callback that occurs to get the available merge fields for the selected MailChimp list so they can be mapped to available user tokens. Below are some before and after screenshots for comparison.

**Before**
<a href="/sites/default/files/mailchimp_6_settings.png"><img src="/sites/default/files/mailchimp_6_settings.png" width="700"/></a>

**After**
<a href="/sites/default/files/mailchimp_2_0_lists_0.png"><img src="/sites/default/files/mailchimp_2_0_lists_0.png" width="700"/></a>
<a href="/sites/default/files/mailchimp_2_0_addlist.png"><img src="/sites/default/files/mailchimp_2_0_addlist.png" width="700"/></a>
## Performance, caching, and webhooks
The other single largest problem was performance. The module made way too many requests to the MailChimp API, and on the rare occasion, when the API was slow to respond or down, the corresponding Drupal site would also be affected. The two main situations the module was communicating with the API was to get a fully loaded list object and to get a users information for a given list. E.g, when subscription block was rendered, it would reach out to the API to get the list details and to determine if a user was subscribed to that list. Further, it would make a separate call to get the interest groups for the list. Caching to the rescue!

The main method to get information about a list, mailchimp_get_lists($list_ids = array(), $reset = FALSE), will now store list objects received from MailChimp in the default cache bin with a CACHE_TEMPORARY lifetime. That cache is flushed on request, when the $reset parameter is set to TRUE, or when the site-wide cache is cleared.

More importantly, the module adds a custom cache bin for mailchimp_users which stores the memberinfo object for each email address / MailChimp list combination. This is filled upon the first request, E.g., the first time a subscription form is shown for a given user / list, and is only cleared in the following situations:

1. A user updates their subscription through the Drupal site.
2. A user updates their subscription outside of the Drupal site and a [MailChimp webhook](http://apidocs.mailchimp.com/webhooks/) fires refreshing the cache. This is an optional setting available with each list.
3. A developer forces the cache reset.

With this architecture, requests to the MailChimp API are kept to a minimum while maintaining a fresh cache of all essential information on both MailChimp lists and user information.
## MailChimp STS
Aside from the mentioned improvements, the major new feature included with this release is integration with the [MailChimp STS API](http://apidocs.mailchimp.com/sts/1.0/). STS is essentially a wrapper around Amazon's SES with, according to [MailChimp's launch announcement](http://blog.mailchimp.com/mailchimp-launches-transactional-email-service-on-top-of-amazon-ses/), these additional features:

* Slightly simpler API
* Opens and click tracking
* Visual reports (all pretty and stuff) dashboard to see stats
* Keep more than 2 weeks of history, showing hourly stats for at least 6 months.
* You can tag your transactional messages with custom labels (up to 100), and see your stats filtered by tag (say, one for receipts and one for confirmation messages)
* Automate some of the SES limitations – if you exceed your daily or hourly quota by a small amount, we’ll queue the message for you and try to send it later.  If you send from an address you haven’t verified, we’ll again queue the message and automatically send the verification request

Drupal 7 has an elegant mechanism allowing sites to alter how emails are sent by implementing an instance of the [MailSystemInterface](http://api.drupal.org/api/drupal/includes--mail.inc/interface/MailSystemInterface/7) and setting a global variable indicating that it should be used. The module does this, passing the mail key as a tag to the STS send method so that site owners can view detailed reports for each type of email sent on their site. Report segments are hourly and include tag, number sent, bounces, rejects, complaints, opens, and clicks.

<a href="/sites/default/files/mailchimp_sts_reports.png"><img src="/sites/default/files/mailchimp_sts_reports.png" width="700"/></a>
## Roadmap
While this is a major milestone for integration between MailChimp and Drupal, we have lots of exciting additional features planned, in addition to what I'm sure will be plenty of refinement and issue resolution as usage of the new version grows. Pending feedback from the community, we're going to work on:

1. Campaign creation from within Drupal.
2. E-commerce 360 integration
3. Analytics 360 integration
4. Importing user level campaign data
5. Dynamic list creation based on select criteria
6. More granular control over when to use STS

We'd love to hear from you, both your feedback on the new module and thoughts on the roadmap.
