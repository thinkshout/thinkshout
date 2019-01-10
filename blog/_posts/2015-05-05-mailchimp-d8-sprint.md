---
title: Monkeying Around with D8
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: marci
published: true
featured: false
short: Porting the MailChimp Module to Drupal 8 for DrupalCon LA
tags:
- Drupal Planet
- Open Source
- MailChimp
- Events
- Modules
- Team Sprints
- Drupal
- Drupal Community
date: 2015-05-05 13:30:00
---
## Leading the Charge

I have used A LOT of email marketing service providers over the years and my opinion of them was twofold: they were all similar and none of them were particularly great. Was it possible that this was just a category of business that would never be exciting or innovative? Was I destined to be a project manager who half-heartedly recommended whatever email service provider I was using most at the time to clients? 

_Enter the Chimp..._

Despite its playful name, [MailChimp](http://www.mailchimp.com) made a serious shift in a category that had always had potential but lacked a true champion. My first thought when I used the tool was that even if the feature set was identical to all its competitors, MailChimp’s user interface alone was what set it apart. But once I dug into its capabilities, I became a bona fide fan (dare I say ambassador) of the brand. From automated email workflows and slick segmentation capabilities, to the [Chimpadeedoo] (http://mailchimp.com/features/mobile-signup-forms/) tablet app that facilitates email sign-ups without an internet connection, MailChimp became the new king of the jungle.

Fast forward a few years, and here I am working at ThinkShout, MailChimp’s Drupal partner. We built and maintain the MailChimp Drupal module, which is used by nearly 22,000 websites. 

If you are familiar with MailChimp’s motto - listen hard and change fast - (or if you just read the first couple paragraphs of this blog post), then it should come as no surprise that innovation is at the heart of MailChimp’s culture. With the release of Drupal 8 looming this Fall, MailChimp and ThinkShout saw a unique opportunity to lead the charge by porting one of the most popular email modules to be D8 compatible. 

## The Only Way Through it is Through it

Being a trailblazer isn’t easy, and MailChimp understood that pushing the envelope on D8 development would require a significant investment of time and resources. While the core MailChimp module is relatively simple, the bundled submodules are feature-rich and technically complex. 

Let’s recap what the MailChimp module allows you to do:

* Any “object” in Drupal that has an email address, say a User, Contact, or even a Comment, can be automatically subscribed to a list and segmented based on other attributes, like their zip code.
* Display a list subscription status on an entity or a subscription form.
* Map Drupal Data, such as name and address, to merge fields in MailChimp.
* Create forms to allow site visitors to sign up for any Mailchimp List or combination of Lists.
* Create Pages, Blocks, or both to display forms.
* Create campaigns containing any Drupal entity, or entities, as content.
* Send campaigns created in Drupal through MailChimp or Drupal.
* View campaign statistics and email activity for all list subscribers.

Luckily, one of the greatest aspects of our partnership with MailChimp is our shared passion for recognizing opportunity in challenges and giving back to the community. With that spirit, a couple of ThinkShout engineers dove in head first with the goal of porting the majority of the popular D7 module’s features over to D8 in time for a beta release at [DrupalCon LA] (https://events.drupal.org/losangeles2015). During the process, they realized that the available Drupal 8 documentation wasn’t keeping up with the speedy pace of D8 development. Over the course of several weeks, our engineers updated documentation and created examples to make life (or at least development) a little easier for the next developer looking to create something similar.

## It’s a Sprint, Not a Marathon

With the conference approaching, it was time to call on the ThinkShout village to help put the polish on the new module. Since nine heads are better than two when it comes to user testing and QA, we scheduled a sprint to focus our engineering department on providing that critical perspective needed at the end of a large development project.

![mailchimp_roadmap1.jpg]({{ site.baseurl }}/assets/images/blog/mailchimp_roadmap1.jpg)

During our afternoon sprint, our team ran a battery of tests (both human and automated) to document and resolve bugs. Our engineering staff has grown quite a bit recently, so the sprint also provided an opportunity for knowledge sharing about MailChimp and D8 development across the team. As a non-engineer fly on the wall, it was exciting to witness the energy at the sprint table, as bugs were closed and high-fives were thrown.

## The Future is Now

So far, I’ve focused on what some of the challenges of early D8 development have been, and you’re surely wondering by now “So, what do you think about D8?” Short answer: we’re excited, and we think you should be, too. 

Drupal 8 standardizes module development by enforcing PSR-4 compliant namespaces. Whereas D7 allows developers to dictate where a form or entity is placed, for example, D8 loads files in the correct path automatically. What does this mean for developers? Well, it means time saved by not having to search an entire codebase to find where the developer before you placed a form. And because this structure is more in line with general engineering practices, it will be easier for any developer to ramp up for Drupal development.

But the benefits aren’t just for developers. We are also excited about the efficiencies that will be created for our nonprofit clients. Not only do they stand to benefit from the streamlined development approach, but that shift in approach will also make it easier to find resources to maintain and enhance their sites.

## Learn More About the New MailChimp Module

Come and see us at [DrupalCon LA] (https://events.drupal.org/losangeles2015), where our very own [Lev Tsypin] (/team/lev/) will be giving a [lightning talk] (https://events.drupal.org/losangeles2015/sessions/mailchimp-drupal-anatomy-successful-partnership) about the evolution of MailChimp's support for Drupal, the basics of how the integration works, and a hint at what's to come for Drupal 8. Don’t worry if you can’t make it to the talk because we’ll also be hanging out in the MailChimp booth. And if you spot one of us (you’ll recognize us by our ThinkShout hoodies), stop us! We’d love to chat about what we’ve learned about D8 and why were are excited for its release. Also, be sure to check out [past blogs](/blog/category/mailchimp/) we've written about our work on the MailChimp module.


