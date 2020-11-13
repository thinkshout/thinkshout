---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: RedHen and Mandrill - 10-minute Setup for a Bulk Mail Tool
created: 1342711784
permalink: blog/2012/07/tauno/redhen-and-mandrill-10-minute-setup-bulk-mail-tool/
tags:
- RedHen
- nonprofit tech
- Drupal Give
- Drupal Planet
- Mandrill
short: RedHen CRM is a native CRM solution for Drupal 7.
author: tauno
---
### Introduction

RedHen CRM is a native CRM solution for Drupal 7. If you haven't heard about it, check out our recent [blog announcements](/blog/category/redhen). [Mandrill](http://mandrill.com) is a pay-as-you-go transactional email service provided by [MailChimp](http://mailchimp.com). This spring, ThinkShout was fortunate to have the opportunity to release a [Mandrill integration module](/blog/2012/05/lev/mailchimp-adds-mandrill-integration-campaign-creation) for Drupal.

In this brief tutorial, I'll show you how to quickly set up a bulk mailing tool in Drupal leveraging [RedHen CRM](http://drupal.org/project/redhen), [Views Bulk Operations](http://drupal.org/project/views_bulk_operations) (VBO), and [Mandrill](http://drupal.org/project/mandrill).

### Getting Started

This tutorial assumes that you have a RedHen CRM instance up and running. If you haven't played around with RedHen yet, you can get started with our [demo installation profile](http://drupal.org/project/redhen_demo).

Once you have RedHen running, you simply need to download and enable [VBO](http://drupal.org/project/views_bulk_operations) and the [Mandrill](http://drupal.org/project/mandrill) module.

### Configuring the Mandrill Module

Your next step is to [set up a Mandrill account](http://www.mandrill.com/signup/) and configure your API keys. *(Don't worry, Mandrill has a very generous freemium plan - so you can test things out without needing to pay.)* Below is a screenshot of Mandrill's API credentials interface:

![](https://dl.dropbox.com/s/n2zfahekulj64u2/mandrill_api.png)

Next, you'll need to set your API key and configure the Mandrill module:

![](https://dl.dropbox.com/s/47845cezqc7tx6t/mandrill_config.png)

That's it! Now we're ready to create our bulk mailing interface with VBO.

### Building Your Bulk Mailer in VBO

RedHen CRM ships with a custom VBO action for sending email to RedHen contacts:

![](https://dl.dropbox.com/s/jazmh8udkow11zp/bulk_mailer_vbo_setting.png)

When used on a RedHen Organization, this same action will send an email to the primary contact of each selected organization. In this simple example, we will create a VBO view that allows us to filter contact records based upon their RedHen membership status:

![](https://dl.dropbox.com/s/8quf5p937gvvl2j/bulk_mailer.png)

Of course, this is just one example of how you can build your own VBO-enabled Views of RedHen data. For a quick start, consider creating some active memberships on contacts and importing this [Views export](https://gist.github.com/3114504) into your copy of the RedHen Demo install profile.

### Now Send Some Mail!

That's all it takes. Using the example bulk mailer interface above you can quickly select one or more contacts to email and then click "Send RedHen Email". From there, you can write a rich-text message including trackable URL links:

![](https://dl.dropbox.com/s/uuevsjdx5j3o2mv/bulk_mailer_2.png)

Upon sending, Mandrill will provide you with email statistics within your Drupal site:

![](https://dl.dropbox.com/s/7nwpqzljb9aqicr/mandrill_data.png)

### In Conclusion

Obviously this is a pretty simple example of a bulk mailing tool. You can do considerably more advanced things mixing and matching RedHen, VBO and Mandrill. You could also trigger automated mass mailings leveraging RedHen, Mandrill, and [Rules](http://drupal.org/project/rules).

Our purpose here is to highlight the flexibility and unlimited possibilities of RedHen CRM and associated modules. We look forward to you sharing your own RedHen recipes with us in the future!
