---
title: "Sprinting on Entity Registration"
layout: blog
body-class: blog-post
topic: process
header-image:
header-image-alt:

author: stephanie
published: true
featured: true
short: We put our heads together to tackle the Entity Registration module.
tags:
- Drupal
- Drupal Planet
- Entity Registration
- Team sprints
- Open source
- Interns
- Event registration
- Module release
date: 2015-08-05
---

We started hosting monthly sprints in order to pool our resources and give back to the open source community. We’re committed to maintaining our contributions that Drupal users rely upon - heck, we rely on them, too - and we owe it to this community to keep improving upon them. Not only that, but our own internal community here at ThinkShout grows as a result. There’s a camaraderie that develops when we all rally behind one cause, and it shows after every sprint in the way we collaborate on our projects.

This month, we focused on one of our most widely-adopted Drupal modules: [Entity Registration](https://www.drupal.org/project/registration). 

There are nearly 10,000 sites currently using the Entity Registration module to power event signups. The module is supported by an active group of 43 developers who have contributed over 500 commits to the project. If you registered for a DrupalCon prior to this year, you’ve probably used this module. It’s been the canonical registration tool in Drupal because of the balance it strikes between ease of use and flexibility. We’ve built everything from simple signup forms for small, free events, to complex paid event registration workflows with tens of thousands of registrants. 

The sprint resulted in a much-needed release of the Entity Registration module: [7.x-1.5](https://www.drupal.org/node/2544986). We knocked out a chunk of issues, added a bunch of nifty new features, and paved the way for some even *bigger* new features. Additionally, we made our initial [port of Registration to Drupal 8](https://www.drupal.org/node/2543160) on a completely different branch.

What’s more, we had our interns on hand to participate in their very first sprint! [Daniel](/blog/2015/06/meet-the-interns/) even managed to make eight commits to Entity Registration. It was one of the most exciting Thursdays we’d had in a while. And that’s saying something, since bowtie Thursdays are pretty epic. 

For this sprint, we broke into three teams. Team one focused on resolving the highest priority items in the issue queue, team two worked on building out a roadmap for upcoming features in the 2.x release, and team three began working on the D8 port.  

Team one resolved over twenty issues in the queue and triaged nearly double that. I sat down with developers Gabe Carleton-Barnes, Jaymz Rhime, and Greg Boggs to discuss this latest sprint in detail. 

**Gabe, your team was responsible for tackling the issue queue. How did you and your team divide and conquer those tickets?**

**Gabe**: We started with the most important issues, and items that were prioritized in the issue queue already. We distributed them among our team, reproduced the issues, and came up with solutions. We had a lot of newer ThinkShout folks working on the queue, and our interns were on hand as well to help. It was a great opportunity for them to to get in there and give some feedback to the community. We were able to also get feedback from the community about these issues, evaluated their proposed solutions, and if they made sense, we implemented them as part of the fix.

**What were some of those bigger fixes?**

**Gabe:** One of the more noteworthy had to do with anonymous registrations and permissions. Each time you create an event, you can allow people to register in different  ways. Registration by email address is one way, so anonymous users can provide an email address and not necessarily need to log into the site. But in order to make that work, you had to allow anonymous users with a permission called "allowed to register other people." It logically worked at the time, but it was a little confusing for people setting up the module for the first time. So we took that out, which also provides a bit of a security buffer so you don’t have a bunch of anonymous users signing up with several different emails.

**Let’s shift gears and talk about features. It sounds like there are some exciting changes in the works for the Entity Registration module.**

**Greg**: We started the process of refactoring entity registration in a big way. I created a [roadmap](https://www.drupal.org/node/2543164) for the 2.x release of the module, which is important because there are contributors active in the Drupal community that are contributing to our module. So if we’re going to commit large chunks of new features to the module, it’s important to describe those to the other active developers working on the module so they know what’s coming and can participate in those changes. 

**Jaymz**: We developed a plan for implementing the biggest new features, and we’ve made some headway in service of those new features. We’re hoping to have these features ready to roll out in a month or so.

**Greg**: There are two big features we’re prioritizing right now. The first is making entity registration work with any kind of entity, which is important for Drupal sites that use more than just "users." This is a massive change that will drastically affect how this form will work. Right now, only users can register for events. With this feature, any entity will be able to register, whether it’s a contact, and email, etcetera, which is going to give both site owners and event registrants more options for both managing and registering for events. The second is the implementation of multiple registrations on a single event registration form.

**Jaymz**: Both of these are features that have sort of worked in the past, but needed some fine-tuning. So now we’re adding true support for both of them.

**Greg**: So many people use this module, and many of them are new to Drupal, which means this module has a very active issue queue. One of my top priorities is to respond to these issues, which I did during the sprint, ensuring people knew where to go for more support, reviewed proposed solutions, and so on.

**Jaymz**: We really appreciate the support from the community, and we owe a lot of this module’s success to their contributions. It takes a village sometimes, or in this case, a team sprint, and Entity Registration is proof of that.

*There are a lot of exciting things in the works for Registration. We can’t thank the community enough for their support of this module, and we’re looking forward to bringing it to Drupal 8. In the mean time, we hope you’ll give 7.x-1.5 a whirl and let us know what you think! Be on the lookout for updates about our progress and the new features coming in the near future.*

