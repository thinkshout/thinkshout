---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: MailChimp adds Mandrill Integration & Campaign Creation
created: 1337978931
permalink: blog/2012/05/lev/mailchimp-adds-mandrill-integration-campaign-creation/
tags:
- MailChimp
- modules
- Drupal
- Drupal Planet
- Drupal Give

short: A long list of improvements and new features
author: lev
---
We've previously written about a [complete rewrite of the MailChimp module](/blog/2011/06/lev/mailchimp-20-anatomy-drupal-module-rewrite), and while our most recent changes aren't quite as big, they're significant enough that we want to share the details with the community.

## Mandrill
<img src="https://blog.mandrill.com/images/mandrill-shield.gif" style="float: right; margin: 0px 0px 10px 10px" />

[Mandrill](http://www.mandrill.com/) is MailChimp's new transactional email offering, intended to replace the [MailChimp STS](http://blog.mailchimp.com/mailchimp-launches-transactional-email-service-on-top-of-amazon-ses) service. Rather than being based on top of [Amazons SES](http://aws.amazon.com/ses/), Mandrill is built on MailChimp's own infrastructure:

> Mandrill runs on the delivery infrastructure that powers MailChimp, the world’s best email service provider.

The [release announcement](http://blog.mandrill.com/public-beta-of-mandrill-smtp-email-service.html) contains list of current Mandrill features, and there are many more exciting things coming down the pipe.

> * Uses MailChimp's awesome email delivery engine
> * Has a [simple and powerful API](http://mandrillapp.com/api/docs/)
> * Allows simple sending directly using SMTP
> * Tracks opens and clicks
> * Automatically adds Google Analytics tracking data to your URLs
> * Has pretty, visual reports of your email results
> * Allows you to tag your messages and see your stats filtered by tag
> * Integrates with MailChimp's templating system, letting you export your MailChimp templates to Mandrill and use them in your transactional emails

The initial [beta release](http://drupal.org/node/1600788) of the [Mandrill module](http://drupal.org/project/mandrill) is modeled closely on the STS version, but provides additional options like tracking clicks and improved graphical reports powered by Google Charts out of the box. Our roadmap includes:

* Improved reports with filter and display settings.
* The ability to target which types of emails to use Mandrill for, E.g., use Mandrill for the contact form but not password reminders.
* Integration with MailChimp templates.

The [STS module](http://drupal.org/project/mailchimp_sts) has been removed from the core MailChimp package and is available as a standalone project for existing users. It will not be actively maintained. New or adventurous users should definitely go with Mandrill and only use STS if you have a project that's already running it.

## Campaigns
There's long been a demand to add the ability to create campaigns containing Drupal content from within Drupal and it's finally been added with the new [7.x-2.5 release](http://drupalcode.org/project/mailchimp.git/tree/refs/heads/7.x-2.x:/modules/mailchimp_campaign), along with a very long list of improvements and features. The new [MailChimp Campaign submodule](http://drupalcode.org/project/mailchimp.git/tree/refs/heads/7.x-2.x:/modules/mailchimp_campaign), contained in the core MailChimp package, allows users to:

1. Create a campaign.
2. Send campaigns.
3. View statistics.

The module adds an input filter, which is applied to every section in a selected template, which converts a macro in the following format into rendered Drupal content.

    [mailchimp_campaign|entity_type=node|entity_id=1|view_mode=teaser]
    
We sought an approach that combined flexiblity with ease of use, sacraficing a bit of the former for the latter. But this lets users inject *any* Drupal entity, using any view mode, into a template section mixed with additional non-Drupal content. Users can also choose to create a campaign that doesn't contain Drupal content at all using this tool. It can also be combined with additional input filters to provide other formatting assistance.

When saved, the rendered content, along with the MailChimp list and other campaign data is sent to MailChimp and *hung* on a custom campaign entity within Drupal. New campaigns are saved as drafts and can be edited so long as they have not been sent.

<img src="/sites/default/files/MailChimp_|_Site-Install-20120525-121341.jpg" />

Sent campaigns have statisics available, including graphical charts powered by Google Charts, similar to those used in Mandrill.

<img src="/sites/default/files/Test_campaign_title_|_Site-Install-20120525-122237.png" />

## Summary
Aside from adding Mandrill and Campaign creation, and removing STS, there's a long list of improvements and new features, including improved Rules integration from @fago. We welcome any feedback, either here or in the queue. Thanks and enjoy the new features!
<!--break-->
