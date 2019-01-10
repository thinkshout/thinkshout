---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: 10 hot topics in nonprofit Drupal tech
created: 1364513534
permalink: blog/2013/03/sean/10-hot-topics-nonprofit-drupal-tech/
tags:
- Drupal
- Drupal Planet
- Drupal Give
- nonprofit tech
- 13ntc
short: As the technology conference season ramps up, these are foremost on our radar.
author: sean
---
At ThinkShout, we spend as much time as possible dreaming up and implementing new ways to leverage Drupal to meet the web technology needs of the nonprofit organizations we serve. 

As the technology conference season ramps up, these 10 topics and tools are foremost on our radar: 

### 1. Upcoming nonprofit Drupal events and gatherings
On April 11th, ThinkShout, [ZivTech](http://zivtech.com), [Forum One](http://forumone.com/), [Promet](http://promet.com) and [Trellon](http://www.trellon.com/) will host the second-annual **"[NTC Drupal Day for Nonprofit Professionals](http://www.nten.org/ntc/precon/drupal)"** at this year's Nonprofit Technology Conference (NTC) in Minneapolis. This full-day event is geared toward IT decision-makers who either currently manage, or are considering, the Drupal content management system. If you're a Drupal professional service provider specializing in the nonprofit sector, an in-house nonprofit software developer, a Drupal power-user, or an executive nonprofit staffer responsible for managing website and web application procurement and maintenance, you should join us. Tickets are limited for this *free* pre-conference event, so if you're interested in attending, [book your spot](http://nten.org/ntc) today!

**[DrupalCon PDX](http://portland2013.drupal.org/node)** is also right around the corner. While admittedly few of the selected sessions have been designed for nonprofits, the nonprofit turnout for DrupalCon is incredibly strong and there are likely to be many "birds of a feather" sessions aimed at the needs of nonprofits.

On the first day of DrupalCon, May 20th, ThinkShout and our partners will also be hosting a free, [full-day event](http://pdxdrupalnpo-es2005.eventbrite.com/?rank=1)  specifically for nonprofits that leverage Drupal. In addition to great content, this event will close with a happy hour. _(Can you say free beer for nonprofits?)_

### 2. Nonprofit-specific Drupal Distributions
[Distributions](http://www.slideshare.net/loubabe/drupal-distributions-an-open-source-product-model) are all the rage in the Drupal developer community. We're still a bit on the fence regarding their place as a starting point in meeting the needs of our nonprofit clients -- but a number of our colleagues and partners in nonprofit tech are developing nonprofit Druapl Distributions that show considerable promise.

Of all the nonprofit Drupal Distros we've seen, **[OpenOutreach](http://openoutreach.org/)** continues to impress us most, striking a good balance between prescriptive, out-of-the-box features and a robust core. We're also excited to see that our friends at [Jackson River](http://jacksonriver.com) are close to a public Drupal 7 release of [Springboard](http://www.jacksonriver.com/blog/springboard-drupal-distro), their open source Drupal-Salesforce solution.

### 3. Native CRM implementations
**[RedHen CRM](http://drupal.org/project/redhen)** and **[CRM Core](http://drupal.org/project/crm_core)** are continuing to progress *in co-opetition* as robust and mature Constituent Relationship Management (CRM) solutions built natively in Drupal 7. Of course, as the lead developers on RedHen CRM, we're obviously more than a little bit biased towards our own toolset. But we're excited to see that the overall adoption of these native CRM solutions has grown by over 700% in the last year.

Within the CRM/CMS space, **[engagement scoring](/blog/2012/07/sean/engagement-scoring)** (often refered to as "[marketing automation](http://en.wikipedia.org/wiki/Marketing_automation)" or "marketing intelligence" in the business world) is will play a key role in helping nonprofits both improve online fundraising efforts and create more meaningful engagement opportunities with their constituents.

### 4. Moving from Plone/Salesforce to Drupal/Salesforce
Earlier this month, the nonprofit technology industry was saddened to hear the announcement that one of its long-standing leaders, [Groundwire](http://groundwireconsulting.com/), would be closing its doors.

Groundwire was a pioneer in offering nonprofits integrated CRM/CMS solutions built on top of Plone and Salesforce. With Plone's usage statics dropping off substantially over the last few years, and without the support of Groundwire, we anticipate that many of the hundreds of nonprofits still using this suite of tools will soon be looking to the Drupal community for alternatives.

Similarly, with Convio's [announcement](http://www.convio.com/our-products/common-ground.html) earlier this year that it will be deprecating the Common Ground platform, we see an ever-growing need for Drupal solutions that integrate tightly with enterprise CRM offerings such as Salesforce.

Fortunately, ThinkShout (with contributions from Jackson River, Message Agency, DesignHammer, PINGV Creative, and many other talented developers) recently released a complete [rewrite](/blog/2012/11/lev/salesforce-rest-oauth) of the Salesforce integration suite for Drupal. Leveraging [RedHen CRM](http://drupal.org/project/redhen), [Drupal Commerce](http://drupal.org/project/commerce), [MailChimp](http://drupal.org/project/mailchimp), the [Entity Registration](http://drupal.org/project/registration) module and the [Salesforce Suite](http://drupal.org/project/salesforce), we're focused on building out a robust set of nonprofit fundraising and enagement tools to fill the technology gap that will soon be left by Plone/Salesforce and Common Ground.

### 5. Recurring payments with Drupal Commerce
Recurring payments, such as monthly pledges or automatic membership renewals, are tricky to implement in Drupal, particularly when integrating with Drupal Commerce. The [Commerce Card on File](http://drupal.org/project/commerce_cardonfile) module shows a lot of promise, as does the [Recurly](http://drupal.org/project/recurly) module. But the needs of most nonprofits engaged in online fundraising and membership campaigns go beyond what's currently possible in the Drupal contrib space.

Stay on the lookout for some contrib work we're plotting for a recurring payments solution built on top of Drupal Commerce and the [IATS](http://home.iatspayments.com/) payment processing solution. We're implementing a customized IATS solution for one of our clients now, with the hope that we'll be able to abstract this work in the near future for the rest of the nonprofit Drupal community.

### 6. Event management solutions built with Drupal
Last year, ThinkShout released the [Entity Registrations](http://drupal.org/project/registration) module, which provides a robust and flexible suite of tools for managing event registrations. The ER module currently powers over 2,300 Drupal websites and was recently added to Acquia's [Drupal Commons](http://commons.acquia.com/) distribution.

Last year, our colleague [Joseph Pontani](http://drupal.org/user/1014606) also released a Drupal Commerce integration for the ER module called [Commerce Registration](http://drupal.org/project/commerce_registration). With Commerce Registration, website visitors can purchase a ticket to an event and then enter information about each person they are signing up for the event. This module provides a similar sign-up and checkout process as the UC Sign-up module for Drupal 6.

While we leverage Commerce Registration on many of our client projects, we've found that there are many instances in which our clients need to capture registration information _before_ going through the Drupal Commerce checkout process. To that end, we are currently working on a a contributed module called "Registration Commerce" that reverses the workflow of the Commerce Registration module.

Suffice it to say, the tools for managing paid event registrations with Drupal are under rapid development and we're excited to see the Drupal community rally to provide nonprofits with more flexible and lower-cost alternatives to SaaS event management solutions.

### 7. Transactional email with Mandrill integration
I've been building Drupal websites for nonprofits for over 7 years and I've gotta say, my #1 heachache when launching a new website has always been dealing with outgoing Drupal website emails. I'm sure you can relate. How many times have you had a client tell you that they aren't receiving password reset emails? Or that the contact form isn't sending them emails?

Enter the [Mandrill module](http://drupal.org/project/mandrill). [Mandrill](http://www.mandrill.com/) is a transactional email service provided by the good folks over at [MailChimp](http://mailchimp.com/). Leveraging Mandrill, we can ensure high email delivery rates, as well as pull email click-through analytics into Drupal.

Leveraging the Mandrill module, RedHen CRM, and Views Bulk Operations, we're able to build low-cost, easy-to-use bulk mailing tools natively in Drupal. You can learn how to set one up yourself with these [instructions](/blog/2012/07/tauno/redhen-and-mandrill-10-minute-setup-bulk-mail-tool).

### 8. MapBox integration
The Drupal community has long benefited from great mapping integrations that leverage JavaScript libraries such as [OpenLayers](http://drupal.org/project/openlayers) and [Leaflet](http://drupal.org/project/leaflet). These solutions face challenges when it comes to mapping very large datasets, however, or when the design requirements of a website require customizing the look and feel of the underlying base map tiles.

Fortunately, our friends at [MapBox](http://mapbox.com) have recently released a new [javascript mapping library](http://mapbox.com/mapbox.js) for managing collections of custom MapBox map tile sets.

We're currently working on a contributed module wrapping this new javascript library. The [MapBox.js module](http://drupal.org/project/mapboxjs) provides a new exportable entity type for managing MapBox map "presets". These presets allow a website administrator to mix and match MapBox tile sets and embed these maps on any node or other Drupal entity.

### 9. Foundation prototyping and the Zen theme
About six months ago, our front-end development team took the plunge and started building all of our website prototypes with Zurb's [Foundation framework](http://foundation.zurb.com/). With Foundation, we can build _clickable_, responsive wireframes hosted as GitHub Pages.

While Foundation has increased the speed with which we can prototype Drupal websites, and in turn reduce wireframing costs, the production task of translating these prototypes into a Drupal theme remains.

Fortunately, our friends over at [FunnyMonkey](http://funnymonkey.com/) are actively working on a new Zen-based theme called [Zoundation](http://drupal.org/project/zoundation) that replicates Foundation-specific markup, so that your Foundation [SASS](http://foundation.zurb.com/docs/sass.html) can be reused as part of your Drupal theme.

### 10. Drupal-2-Drupal data migrations
Data migrations are fun! _(Or at least our nerdy developers think so.)_ That said, upgrading Drupal websites to D7 is often expensive and complex. These complexities have been greatly reduced by Acquia's release of the [Drupal-2-Drupal migration module](http://drupal.org/project/migrate_d2d). Admittedly, the module lacks a user interface, but as a developer tool, it's allowed us to dramatically reduce migration costs for our clients.

## Summing up
While Drupal can't wash your car or make you toast, it continues to be a great web application development platform for solving the technology needs of our favorite progressive causes and nonprofit clients. We look forward to discussing these tools and opportunities further at the **[Drupal Day for Nonprofits](http://www.nten.org/ntc/precon/drupal)** at the NTC as well as the **[Nonprofit Drupal Day](http://pdxdrupalnpo-es2005.eventbrite.com/?rank=1)** at DrupalCon. We hope you'll be able to join us for these conversations!
