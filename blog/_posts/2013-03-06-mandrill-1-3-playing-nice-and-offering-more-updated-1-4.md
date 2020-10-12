---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: 'Mandrill 1.3: playing nice and offering more! (updated: 1.4)'
created: 1362596765
permalink: blog/2013/03/gabe/mandrill-13-playing-nice-and-offering-more/
tags:
- Mandrill
- modules
- Drupal Planet
short: What's next for Mandrill.
author: gabe
---
<i>Update: Version 7.x-1.3 had a couple of bugs, and some of the changes were a little ambitious. As of March 18, the latest-and-greatest version of Mandrill is 7.x-1.4, which resolves the major issues we encountered at first release, and makes some of this blog entry obsolete. Here's what 1.4 is doing (more info in the [release notes](http://drupal.org/node/1946388)):  

*  Moves the new template functionality into a sub-module  
*  Fixes some installation issues  
*  Returns to the policy of specifying a sender for Mandrill messages, but with better reply-to behavior  
*  Makes Mandrill compatible with email addresses of the form <code>"Name String<email@address.net>"</code>  
*  Fixed some new issues created by changes in the API, like the Reports page not loading  
*  Resolved default template behavior inconsistencies  
*  Resolved problems sending HTML content through templates  
*  Added a configuration feature to log module/key pairs that send messages through Mandrill, easing Mailsystem & Mandrill configuration

If any of the above issues gave you trouble, our apologies! Give 1.4 a spin. We put it through the extra-enthusiastic testing cycle, and are running it happily on this very website (thinkshout.com).</i>

<img src="https://mandrill.com/assets/images/brand/logo-shield-72695847.png" alt="Mandrill Mascot" title="Mandrill Mascot" height="240" width="240" img style="float:right"/>
We ThinkShouters have been working away on our [Drupal/Mandrill integration module](http://drupal.org/project/mandrill), and released version 7.x-1.3 today. We think it's a pretty significant step for the module: I'll tell you how we got to where we are, what's in this release, and a little about what's next for Mandrill.

If you aren't familiar with [Mandrill](https://mandrill.com/), it's a transactional email service built around the email delivery system for [MailChimp](http://mailchimp.com/), and it's deliberately built to be used by custom apps and plugins. If you want your Drupal site's automated emails to get sophisticated modern analytics and reporting, be spam compliant, scale to bulk levels, and be more reliably delivered, you can route your email through Mandrill.

Version 1.2 of the Mandrill module worked great for simple stuff: you could install it on your site, point it at your Mandrill account, tell it to take over all outgoing email, and: bam! Full data tracking, spam compliance, and all the other Mandrill goodies. However, it was sort of all-or-nothing:  

1.  If you only wanted to track emails from certain modules, and not from others, you were out of luck, because Mandrill's "on" switch just took over Drupal's default mailsystem variable.  

2.  Mandrill module 1.2 sent all emails from the same email address. If you had some app handing off emails to Mandrill with a pre-configured 'reply-to' and 'from' field, our module just dropped them. The community built a reply-to enabling patch (thanks to @markwk, @tripper54, and @pjcdawkins) to handle some use-cases, highlighting this issue.  

3.  Although Mandrill provides an interface for building rich templates and API access to use them, there was no way to enable them using the module. Some community users had put together a great patch to enable basic template usage (thanks @basvredeling and @drewish, @persand and @jtbayly!), but it wasn't terribly user-friendly.  

4.  Mandrill module 1.2 is very pushy, and it was pointed out that it wasn't playing nice with other mail system modules, in particular [mailsystem](http://drupal.org/project/mailsystem), which works hard to provide a central configuration point for mail-using modules, and could be mucked up pretty thoroughly by enabling Mandrill.  

5. Mandrill module 1.2 handed all emails off for sending immediately: the community has let us know that the ability to queue messages for later processing by cron was desirable.

We think Mandrill 1.3 does a nice job of addressing all of these issues.

We tackled the first and fourth issues in concert: mailsystem 2.x is a requirement for Mandrill, and Mandrill 1.3 uses the mailsystem API for all Drupal-Mail-System-related configuration. This lets us leverage mailsystem's precise pairing of module/key pairs with different MailSystemInterface implementations that are enabled on your site to configure exactly which emails you want handed off to Mandrill. Of course, we also let mailsystem retain control of the Drupal Mail System rather than fighting over the configuration: much more friendly, and less work for us: win/win!

While we were feeling friendly, we also restructured our email interface's handling of "reply-to" and "from" addresses. <strike>This wasn't hard, really: if you hand the 1.3 version of MandrillMailSystem an email with a From or Reply-to address configured, we just leave it there. We do check to make sure there is a "from" configured, and if there isn't we drop in the Drupal site's default email address, rather than making you configure a separate address in Mandrill. This all seemed pretty linear and sensible, but it's definitely a significant change in the module's behavior.</strike>

With mailsystem handling configuration settings, the on/off switch on our config screen is no longer necessary, and has been removed. The same is true of the "from" fields, so our config page is suddenly a lot cleaner. However, you will see a new tab for Templates!

We also added a simple message queuing option to the bottom of the admin page, allowing you to queue up message sends rather than fire them off immediately, and specify a limit to the number of messages going out in each cron-triggered batch.

We took the foundational template work offered by the community and built something a little more powerful and adaptable based on it. The templates tab lets you create a "Mandrill Template Map" (a custom entity), which currently has 3 settings, other than a label: which Mandrill Template to use (it pulls a list from Mandrill), which content area on the Mandrill Template to put the email body content into, and which module/key pair to use this Template Map for. The module/key list is generated using mailsystem and the existing Mandrill Template Map configurations, and will only let you select a module/key pair that has been assigned to MandrillMailSystem by mailsystem and is not currently selected on another Template Map.

That might sound a little complicated, but it's pretty simple in practice: create a template using Mandrill's refined template interface, and it'll show up automatically on the Mandrill Module's template's tab. Create a Template Map, point it at the Template you created, tell it where to drop the email content, and select which emails you want to use this template map. This means you can have a variety of different templates configured for all your different use-cases: one for user registrations, another for receipts, and a third for event reminders, etc. 

In the future, we plan to offer some more sophisticated template configuration, like dropping site content into other template content areas, but we think this is a pretty good start. You can now use Mandrill to create a collection of unique, rich html emails for each different type of email getting sent from your Drupal site and use the mandrill and mailsystem modules to assign each email type to its unique template. Rich, custom, purpose-specific emails going out through a reliable, spam-compliant, scaleable email service with sophisticated analytics built right in. I'm gonna send some emails right now!
