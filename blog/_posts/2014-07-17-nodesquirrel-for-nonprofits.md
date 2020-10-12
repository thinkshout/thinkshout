---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: "Safeguard Your Nonprofit's Website with NodeSquirrel"
published: true
featured: false
author: stephanie
date: 2014-07-17 11:00:00
short: Looking for a low-cost layer of backup security for your website? Consider NodeSquirrel.   
tags:
- Drupal Planet
- NodeSquirrel
- Backup and Migrate
- Gorton Studios
- Nonprofit Tech
---

In our web hosts we trust, right? Right. They safeguard your nonprofit’s website, ensure it can handle your incoming traffic, and, perhaps most importantly, they backup your site so that if for some reason, your website ever imploded, it wouldn’t be lost for good.

But just how accessible are those backups? How surefire is your contingency plan? Have you tested it out? A lot of website administrators will find that actually initiating this plan isn’t as easy as it may seem. Those backups might take hours or days of ticketing and waiting to get a hold of, particularly if your website host is already inundated with other customer support issues. What then are you to do when something breaks and the site comes tumbling down?

![nodesquirrel.png]({{ site.baseurl }}/assets/images/blog/nodesquirrel.png)

Enter [NodeSquirrel](http://www.nodesquirrel.com/). NodeSquirrel is a Drupal backup service developed and maintained by [Gorton Studios](https://www.gortonstudios.com/). It gives site admins control over their site backups. I sat down with Gorton Studios’ Drew Gorton and Keri Poeppe to learn why nonprofits should consider making NodeSquirrel a part of their workflow. 

**Stephanie: So what exactly is NodeSquirrel?**

**Keri**: It’s a system for creating, managing, and securely storing website backups. Drupal developers out there will know the Backup and Migrate module. NodeSquirrel extends Backup and Migrate, allowing you to make backups of your website and store those backups in the cloud.

**Drew**:[ Backup and Migrate](https://www.drupal.org/project/backup_migrate/) is one of the most popular modules in Drupal. One of the reasons it’s so popular is because it’s easy to create a backup. But by default, that backup stays on your server. What we’re trying to do with NodeSquirrel is make it easy to get that backup off of your server and move it somewhere safer - in this case, Amazon’s cloud. What makes NodeSquirrel such an integral addition to your regular hosting is that it’s something you can use whenever you need to access those backups. Getting to your web host’s backups and testing them can be difficult - and just because they’re backed up doesn’t mean they actually work. With NodeSquirrel, there are no surprises. You can get into your backups, make sure nothing is corrupted, and restore it yourself rather than wait on your host.

**Stephanie: How does NodeSquirrel accomplish this?**

**Keri**: NodeSquirrel is an off-site destination, but the process of getting the copy of your site uses the Backup and Migrate Module.

**Drew:** Here’s an example: there was a NodeSquirrel user whose site was being backed up daily by their web host. Unfortunately, that organization had a major failure and needed to restore the whole site, but the backups they received from their host were unusable. The host had to go back two months to find a backup that actually worked. And, this was from a hosting service costing at least $100 a month.

NodeSquirrel, luckily, was running on their site and they were able to use one of the backups stored on the cloud. It saved them. The problem is that no one ever tests hosting company backups. It’s stored by your host, but no one ever goes back and to check the integrity of the backup and figure out if it can be used when something goes wrong. 

NodeSquirrel is different because it’s part of Drupal and the Drupal workflow. We’ve made it easy for you or your developer to retrieve and test your backups.

**Stephanie: What sets NodeSquirrel apart for the competition? What sort of functionality can I expect from it?**

**Keri**: It’s unique in that it makes a very specific kind of backup. It copies the database, code, and the files rather than making a backup of the whole server and all of the extra infrastructure. It’s not a lightweight backup, but it’s one that can be very targeted, and you can be more nimble with it. For example, if someone accidentally deletes a blog post or wipes out blocks on the homepage, you can quickly restore the website from a NodeSquirrel backup. You don’t need to spend lots of money or staff time recreating the blog post or home page! And you don’t need to call your hosting company to solve the problem. I think what distinguishes it from standard backup systems is how much control users have over the management of their backups. NodeSquirrel’s settings are managed in your site’s backend, so your website administrator has full control of your backup schedule and functions. Want to backup your site every hour? Go for it. Make the system as robust or as hands-off as you like. You can have that level of control and granularity.

**Stephanie: How can I tell if my organization needs a service like NodeSquirrel? Is there such a thing as being "too small?"**

**Drew**: It’s very affordable for anyone who’s invested time and money into their website and wants to safeguard that investment. The site is probably too valuable *not* to backup. We wanted to make this service accessible and affordable, so for about $100 a year, you’ll have this extra protection. Versus the time you spend trying to fix a bad backup, this is a better alternative. With that price point, it’s more of a question of "why not?"

**Stephanie: It sounds like NodeSquirrel offers users a lot of options. Is there anything it won’t protect against? What _doesn’t_ it do?**

**Drew**: Most people ask how it compares to their standard hosting, since we have no direct competition. It’s not a full-server backup or a backup for a complex server. It doesn’t backup your DNS settings or load balance configuration. Typically though, if you have a complex setup, you’ll have a system admin or a disaster response team in your organization. Even if you do, NodeSquirrel might still be supplemental and helpful as an extra layer of protection.

**Keri**: If you can’t call your hosting company and see a backup, you might want to think about NodeSquirrel.

**Drew**: That’s actually a great way to test your site host. Call them and ask to access your backups. How long will it take? Will they charge you extra to set up a test environment? 

**Keri**: Download and restore a backup. There’s your test to see if you can sleep easy at night. With NodeSquirrel, you can.

**Stephanie: Is there anything else we should know about NodeSquirrel? Any tips for getting the most out of the service?**

**Keri**: I’d stress the low threshold to use it. It requires no additional software. It’s integrated seamlessly, especially if Backup and Migrate is already installed. Ask your developers to install version 3 of Backup and Migrate. It’ll give you the most flexibility. NodeSquirrel is free to try, too. We have a trial offer that allows you to make 20 free backups. No credit card required.

**Drew**: We wanted to make it easy to do the right thing, and having onsite backup is the right thing. If it works, keep on going. 

**Our conclusion:**

NodeSquirrel is a highly-affordable extra layer of protection that could save you and your stakeholders a major headache and a great deal of money in the event of a site meltdown. Even if your hosting provider has a backup solution, in the event of data loss, NodeSquirrel is a great alternative to sitting in support queues, waiting on your web host to resolve the issue.

With NodeSquirrel, you can take complete ownership of your backups and spare yourself the worry of whether or not you’ll be able to get your site up and running. It’s poised to integrate beautifully with your Drupal website administrative workflow, allowing you to safeguard your investment without having to spend time building new safety net systems. With plans starting at $9/month, it’s a question of "can you afford *not* to use NodeSquirrel?" 

Want to see it in action for yourself?[ Sign up for the free trial](https://manage.nodesquirrel.com/user/register/). If you do take it for a spin, let us know what you think in the comments section.
