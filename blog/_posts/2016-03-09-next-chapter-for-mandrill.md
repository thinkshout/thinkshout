---
layout: blog
body-class: blog-post
topic: process
title: The Next Chapter for Mandrill
author: mike
published: true
featured: true
short: Changes and recommendations for transactional email in Drupal
tags:
  - Mandrill
  - MailChimp
  - Drupal Planet
  - Drupal 8
  - Open source
  - Modules
date: 2016-03-09 15:00:00
image: /assets/images/thinkshout-logo.png
---

It’s easy to take for granted all the great tools we use on the web, everything from email, to social media, to git hosting. Many of these services are free or use advertising to support the sometimes significant costs to run them. [Mandrill](https://www.mandrill.com/) is one of those great tools and one that we’ve been recommending to our clients on a consistent basis. If you’re unfamiliar with Mandrill, it’s a transactional email service for sending email ranging from password resets to Commerce receipts. Now we realize that your webserver can already send email, so why bother with a service like Mandrill? It offers three major advantages: 

  * Deliverability
  * Reporting and accountability
  * Templated emails that look great across all email clients 

As the team who originally partnered with [MailChimp](http://mailchimp.com/) to build the [Mandrill module](https://www.drupal.org/project/mandrill), we might be a bit biased, but we think it’s one of the best transactional email services out there that integrates with Drupal. We have many clients that use both [MailChimp](https://www.drupal.org/project/mailchimp) and Mandrill, and many that use Mandrill by itself. In fact, we just completed a [Mandrill 8.x-1.0-alpha1](https://www.drupal.org/node/2683599) release with all the great features of Mandrill for Drupal 8. 

Change is inevitable though, and MailChimp has decided to refocus the Mandrill service on their core value of delivering customized email to users. This doesn’t mean Mandrill is going away by any means, just that it’s new focus will be on delivery of 1:1 customized emails as opposed to 1:many emails. MailChimp already provides a great way of delivering 1:many emails as a part of your email campaigns, and Mandrill will focus on the customized 1:1 delivery of email. This should reduce the number of users using Mandrill to send 1:many emails, many of which are spammers abusing the system. 

You can read more about the announcement on the [MailChimp blog](http://blog.mandrill.com/important-changes-to-mandrill.html) along with the [FAQ](https://mandrill.zendesk.com/hc/en-us/articles/217467117-Mandrill-MailChimp-Transition-FAQs) they prepared for customers. At the heart of the change is the requirement of having a paid MailChimp account and purchasing Mandrill credits to use the Mandrill service. Your MailChimp and Mandrill accounts can be merged on March 16th and a single monthly subscription will be maintained going forward. According to the MailChimp FAQ, the minimum cost of having both services will be $10 for the basic MailChimp account and $20 for 25,000 Mandrill emails sent in a month. 

This does mean Mandrill as a free service is going away and for some people, this means that they’ll need to find an alternative transactional email service. The good news is that there are alternatives out there, and some are even honoring Mandrill’s free level. If you’re looking for one of those free alternatives, try [Sparkpost](https://www.sparkpost.com/), [Amazon SES](http://aws.amazon.com/ses/details/), or [SendGrid](https://sendgrid.com/). Not all of these services have Drupal modules at this point, but many do, and could be worth trying out. 

Our recommendation for many of our clients is to stick with Mandrill for a number of reasons. For those that already use MailChimp and Mandrill, the additional monthly cost is not significant enough to switch in many cases, and having a single account to manage can be beneficial. For those clients that only use Mandrill now, adding a new monthly cost can feel a bit more burdensome. The stability of the Mandrill service and Drupal module does outweigh the cost of switching in many situations, but we are sensitive to our clients’ budgets and may look at the alternatives if it makes sense. It’s important to note that all Mandrill accounts must be merged with an existing MailChimp account by April 27th. 

What does this mean for the [Mandrill module](https://www.drupal.org/project/mandrill) for Drupal and our ongoing support and maintenance of it? MailChimp has assured us they are committed to the Mandrill service for the foreseeable future and will be looking at ways MailChimp and Mandrill can work better together. We also see a lot of ways the two modules can be combined and managed as one, making it easier for users to view activity across the two services in one place. At this point, we will continue our support and development of the module, including the new [Mandrill D8](https://www.drupal.org/node/2683599) release. We are excited to see where the Mandrill module goes and the additional value that MailChimp adds to the service going forward. Stay tuned for the next chapter of Mandrill! 
