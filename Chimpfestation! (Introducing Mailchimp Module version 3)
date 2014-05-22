---
layout: post
published: false
featured: false
---

## Your Basic Monkey

A few weeks ago, we released Mailchimp Module version 7.x-3.0-beta1 on Drupal.org. The third major revision of the Mailchimp Module for Drupal 7 is actually the 5th major revision of the module, including 2 versions for Drupal 6. ThinkShout Partner Lev Tsypin rolled the first release in January of 2008, and the first version of the project page included a little about his goals for the module:
> Right now, I am focusing on two types of integration:

> 1. Using hook_user to maintain a members list in MailChimp.
> 2. Having an opt in field in the user profile which uses one of the MC merge fields to allow for segmenting the members into those who want to receive communications.
> 3. Having an anonymous sign up form to enroll users in a general newsletter.

The module (and the project page!) have both come a long way since then, but the functionality described in that initial post has remained the core of the module through each version: _Anonymous signup forms_ and _Authenticated subscription control_ describe the core use cases that have resulted in over 15,000 installs. Sure, there's Campaign integration, Activity reporting, and all sorts of bells and whistles around list and subscription management, but Anonymous signup forms and User-based subscription control are the bread and butter.

## Identity Crisis

Building on the success of the Mailchimp module, ThinkShout has mode the contribution of robust, useful Drupal modules a core part of our business. In building [Entity Registration](https://drupal.org/project/registration), [RedHen](https://drupal.org/project/redhen), [Salesforce v3](https://drupal.org/project/salesforce), [Leaflet](https://drupal.org/project/leaflet), and a bunch of other great modules, we've often leveraged Drupal 7's Entity and Field systems to make our tools as versatile and abstract as possible, to allow their use in as many different sites as possible.

We had a bit of a wake-up call when one of our favorite clients, [The Salmon Project](http://www.salmonlove.com/), asked us to integrate their fancy new RedHen CRM directly with Mailchimp. Integrating RedHen Contact Entities doesn't actually match up with either of these: _Anonymous signup forms_ and _Authenticated subscription control_.

It was time to bring ThinkShout's signature versatility and abstraction to ThinkShout's signature module.

## Monkeys everywhere!

The first thing we did was to de-couple the configuration of Anonymous Signup Forms and Authenticated Subscription Control. The Mailchimp Lists configuration UI had grown into a bit of a monster: it included 16 separate options, not counting merge field sync settings, ranging from the Submit button label on the signup form the the Roles that were allowed to access this list on their User pages. Rather than framing everything around each list, we broke things out by their Drupal-side functionality:

1. The Signup Module was created for generating anonymous List Signup forms.
2. The List Module now provide a Field type: "Mailchimp Subscription", which leverages Field UI to allow any Entity to become an independently-controlled Mailchimp List Subscriber.

What does this mean? If all you need to do is generate some anonymous subscription blocks or pages, the Mailchimp Signup module has you covered. Just enable it, go to the "Signup Forms" tab in the Mailchimp Admin UI, and create a signup! The UI lets you generate blocks or pages easily, include one or more lists on each form, pick which Merge Fields to include, and voila!
![Screen Shot 2014-05-22 at 4.27.43 PM.png](/assets/images/blog/Screen Shot 2014-05-22 at 4.27.43 PM.png)
