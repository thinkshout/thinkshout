---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: "Chimpfestation, A Closer Look at the New MailChimp Module"
published: true
featured: false
author: gabe
date: 2014-05-27 13:00:00
short: There are plenty of features to go ape for in our latest beta release of the MailChimp Module.
tags:
- Drupal Planet
- Drupal Give
- MailChimp
- modules
- email marketing
---

## Your Basic Monkey

A few weeks ago, we released [the initial beta of the 3.x version of the MailChimp Module](https://drupal.org/node/2260305) on Drupal.org. The third major revision of the MailChimp Module for Drupal 7 is actually the fifth major revision of the module, including two versions for Drupal 6. ThinkShout Partner [Lev Tsypin](/team/lev/) rolled the first release in January of 2008, and the first version of the project page included a little information about his goals for the module:
> Right now, I am focusing on 3 types of integration:

> 1. Using hook_user to maintain a members list in MailChimp.
> 2. Having an opt in field in the user profile which uses one of the MC merge fields to allow for segmenting the members into those who want to receive communications.
> 3. Having an anonymous sign up form to enroll users in a general newsletter.

The module (and the project page!) have both come a long way since then, but the functionality described in that initial post has remained the core of the module through each version: _anonymous signup forms_ and _authenticated subscription control_ describe the core use cases that have resulted in over 15,000 installs. Sure, there's campaign integration, activity reporting, and all sorts of bells and whistles around list and subscription management, but anonymous signup forms and user-based subscription control have always been the bread and butter.

## Identity Crisis

Building on the success of the MailChimp module, ThinkShout has made the contribution of robust, useful Drupal modules a core part of our business. In building [Entity Registration](https://drupal.org/project/registration), [RedHen](https://drupal.org/project/redhen), [Salesforce v3](https://drupal.org/project/salesforce), [Leaflet](https://drupal.org/project/leaflet), and a bunch of other great modules, we've often leveraged Drupal 7's Entity and Field systems to make our tools as versatile and abstract as possible, allowing for any imaginable use-case.

We had a bit of a wake-up call when one of our favorite clients, [The Salmon Project](http://www.salmonlove.com/), asked us to integrate their fancy new RedHen CRM directly with MailChimp. Integrating RedHen Contact Entities doesn't actually match up with either of these: _anonymous signup forms_ and _authenticated subscription control_.

It was time to bring ThinkShout's signature versatility and abstraction to ThinkShout's signature module.

## Monkeys Everywhere!

The first thing we did was de-couple the configuration of anonymous signup forms and authenticated subscription control. The MailChimp Lists configuration UI had grown into a bit of a monster: it included 16 separate options, not counting merge field sync settings, ranging from the **submit button label** (on the signup form) to the **roles allowed** (to access the list on user configuration pages). For version 3, rather than framing everything around each list, we broke things out by their Drupal-side functionality:

1. The Signup Module was created for generating anonymous list signup forms.
2. The List Module now provides a field type: "MailChimp Subscription", which, modeled on Entity Registration's successful architecture, leverages Drupal's Field API to allow any entity to become an independently-controlled MailChimp list subscriber.

What does this mean? If all you need to do is generate some anonymous subscription blocks or pages, the MailChimp Signup module has you covered. Just enable it, go to the "Signup Forms" tab in the MailChimp Admin UI, and create a signup! The UI lets you generate blocks or pages easily, include one or more lists on each form, pick which merge fields to include, and voila!

![signup_ui.png](/assets/images/blog/signup_ui.png)


If, however, you want to subscribe some type of entity to a MailChimp List (like a user, say, or a RedHen contact), you can now do that lickity-split using Field UI:


![field_type.png](/assets/images/blog/field_type.png)


This handy MailChimp Signup field will insist on being tied to one of your MailChimp lists. Once that's done, you can configure instances of this field like you would any other Drupal field. It will automatically pull in the available Merge Fields and let you select which properties or fields from the entity you want to push into these fields:
![field_instance_config.png](/assets/images/blog/field_instance_config.png)
Want to default your entity to be subscribed to the list? Use field UI's built-in configuration options. Use field display options to hide the field if you want to, or display it as a form right on the entity.

Do you want to get the old role-based subscription behavior? Easily done with a field on your user bundle and a simple rule or two! We've included the [custom rules actions](http://cgit.drupalcode.org/mailchimp/tree/modules/mailchimp_lists/mailchimp_lists.rules.inc?h=7.x-3.x) you need, and there's even an example rule in the [README](http://cgit.drupalcode.org/mailchimp/tree/modules/mailchimp_lists/README.txt?h=7.x-3.x#n36) file in the MailChimp Lists submodule.

What this all boils down to is do what you want! You can MailChimp-ify any entity on your site with an email address in under 5 minutes. So go ape!

## Peeling Away Campaign Complexity

ThinkShouter [Dan Ruscoe](/team/dan/) brought huge improvement to the Campaign module, including the ability to send to list segments from directly within Drupal and some awesome UI improvements. We have long offered the ability to pull site content into campaigns, but you had to come up with the exact token for the content on your own: not the simplest task, especially if you have a non-developer creating your campaigns.

Now? A simple drop-down interface generates the token for you. Create a view mode for your entity types specifically for use in campaigns, or re-use an existing view mode. Just select your content type, the view mode, and search by title, and the module generates the token. Pop it into your campaign anywhere you want.


![site_content_embed_ui.png](/assets/images/blog/site_content_embed_ui.png)

We also added a handy mergefield key selector patterned after the Token UI.
![merge_vars_ui.png](/assets/images/blog/merge_vars_ui.png)

## Other Evolutions

We didn't stop with fancy configuration options. Heck, we didn't _start_ with fancy configuration options. The goofs at MailChimp HQ released the 2.0 version of their API, and we wouldn't want you using that Late Pleistocene 1.x nonsense, so we re-wrote the entire core of the MailChimp Module to leverage the new API. While we were at it, we re-wrote the asyncronous functionality to make it much simpler and less error-prone. It may not be easy enough for a chimp to understand quite yet, but it's certainly more tolerant of a little monkeying.

## Climb Aboard!

You can download the [MailChimp Module 7.x-3.0 beta](https://drupal.org/project/mailchimp) now. We're already using it on a few sites and it's working great. So give it a try and let us know what you think!
