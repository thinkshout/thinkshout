---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: "Online Fundraising with RedHen Donation"
published: true
featured: false
author: stephanie
date: 2014-08-01 13:00:00
short: ThinkShout is proud to offer RedHen Donation, a new online donation form.
tags:
 - Drupal Planet
 - RedHen Donation
 - Fundraising
 - RedHen
---

I’ve spent many a late night in the office shouting at my computer screen - all in the name of philanthropy. Technology woes just go with the small nonprofit territory, and the organization I worked for before joining ThinkShout was no exception. Some of those woes, however, I just couldn’t tolerate. Not when they were getting in the way of our mission, and preventing us from raising funds to support our work.

My first foray into online fundraising happened while I was working in the development department of this small nonprofit. We focused primarily on assisting low-income families with safety net services and emergency housing. Over the last few years, we’d seen a huge increase in the percentage of online donations. Times were changing and we’d begun to rely heavily on that online donation page as we saw more and more donors taking the digital route - many of whom were donating to us for the first time. But as our needs evolved, we needed the donation form to evolve with us. We needed more options, more fields, new content as the campaigns changed. Unfortunately, we didn’t realize what a monumental task that would be, given the online donation solution we were using. The problems didn’t end there.

This set-in-stone donation solution probably wasn’t a big concern back when the development team was first evaluating CRMs. Perhaps they didn’t know what they were getting into. Perhaps they didn’t realize they’d be charged almost $200 every time they needed to edit an online donation form. Perhaps they didn’t think we’d use the form that much. The form itself wasn’t very nice to look at. It didn’t match our website’s theme. It got close, but something was always off. There was absolutely nothing convenient about dealing with it.

Those days are a ways behind me, but they’re still on my mind. Since my transition to ThinkShout, I’ve had the opportunity to view these issues from a different perspective and I tend to hear the same complaints from the nonprofits we serve:

* Multi-step checkout
* Clunky check-out systems
* No control over form content
* No support for multiple campaigns
* Forms are expensive to edit
* Can’t fix issues without ticketing your CRM’s support team
* Form theme doesn’t match your website
* Payment methods are limited

Wow. Look at this awesomely long list of annoying things that plague such an integral part of nonprofit fundraising. My blood *still* boils when I think about how difficult a decision it was to simply submit a ticket to change a single line of text in our donation form - how much *effort* went into making a case for the cost. This had to change. There had to be *something* better.

We began working on the [RedHen](https://www.drupal.org/project/redhen_donation)[Donation](https://www.drupal.org/project/redhen_donation) module with intent to create a better online donation solution. We wanted to create a donation tool that allowed nonprofits to keep everything under one roof. The end result accomplishes this. What we came up with is unique in the sense that it offers nonprofits several features that aren’t quite so commonplace. RedHen Donation is inside their website, connected to their CRM. It allows for both one-time and recurring donations, multiple donation pages, and easy-to-edit donation forms.

I chatted with [Brandon Lee](/team/brandon/), the architect behind RedHen Donation, to get a better understanding of RedHen Donation’s capabilities.  

**Stephanie: So what’s the big deal with RedHen Donation?**

**Brandon**: It’s an integration between [RedHen CRM](http://redhencrm.com/) contacts and Drupal Commerce that allows for single page donations with both one time and recurring donations options. The recurring donations feature is a pretty big part of it, since that’s not an option you frequently see offered in other donation form tools.

**Stephanie: How does it work with RedHen CRM?**

**Brandon**: RedHen Donation allows you to create a single page donation form that can create or update RedHen contacts. It’s tightly-integrated with RedHen, so if you’re already using RedHen CRM, it will be very simple to get up and running.

**Stephanie: How does it compare to other donation form modules out there?**

**Brandon**: It’s a standalone module that’s used with the RedHen suite. CRM Core has a similar donation module, but it doesn’t allow for recurring donations. RedHen Donation does. The ability to give donors the option of setting up a recurring donation within the same form is something we’re thrilled to offer nonprofits.

The donation space, in a lot of ways, is what sets it apart from similar modules. If you’re dealing with Commerce specifically, it wants to lock you into the Commerce workflow. With RedHen Donation, you don’t have to go through three different steps to make one donation to an organization. You fill out one page and you’re done. It’s quick and user-friendly. No more filling out a form, then passing through a portal, then onto a confirmation page, then back to your site.

![redhendonation1.png]({{ site.baseurl }}/assets/images/blog/redhendonation1.png)

**Stephanie: What if I want create a new form?**

**Brandon**: With the assumption that you already have RedHen set up, it’s relatively simple. You enable the module, then create a donation type, which is a Drupal entity, and during the configuration, you select what kind of product you’re working with - at least with one-time donations. This is  a fieldable methodology that we’ve used with MailChimp and other projects in the past. If you understand Drupal concepts of entities, fields, and commerce, then it’s simple. You do need a working knowledge of those three things to build a form. But once it’s complete, it’s incredibly simple for donors to use. That’s the whole point of the single page donation form. You can offer multiple recurring options. Every month for forever, every month for a year, all of those options on the same page. 

**Stephanie: It sounds like you’ve got a lot of payment options to choose from as an end-user - and the recurring donation option is huge win for fundraisers - but how customizable is this form? And how difficult is it to make changes?**

**Brandon**: It allows for different payment gateways, like [iATS](http://home.iatspayments.com/) - basically, anything supported by Drupal Commerce. Create a contact, indicate which fields you want created, pick a payment gateway, and you’re set. It can be as simple as name, credit card number, and donation amount. It can be as complex as name, credit card, honoree, honoree address, honoree’s favorite color, etc. Payment options allow for text fields, a drop-down menu, or other. Recurring payments open up another myriad of options.

**Stephanie: So long as I know Drupal, I can make this form into whatever I need?**

**Brandon**: Exactly.

**Stephanie: Say I have multiple campaigns I’m running and I need a different form for each campaign. Can I do that?**

**Brandon**: Absolutely. Let’s say you have multiple different contact types in RedHen because of the campaign. And say I want to send out this particular form because I’m currently soliciting for one particular campaign. You can have as many donation forms as you have entities that are fieldable. You can create a different form on the same content type.

![redhendonation2.png]({{ site.baseurl }}/assets/images/blog/redhendonation2.png)

**Stephanie: Anything else we should know about it?**

**Brandon**: The availability of RedHen Donation within RedHen CRM is a big deal. You don’t have to worry about third-party integration. You don’t have to send people off to another site to collect the donation. You don’t have to wait on a third-party to send that much-needed information back. With RedHen Donation, it just works. It’s all self-contained. If I’m a nonprofit site admin, this is a great option, and a great reason to consider using RedHen CRM because everything needed to collect donations is all in one place.

**Our Conclusion:**

RedHen Donation is a fantastic asset for nonprofits looking for a flexible, customizable, and affordable online donation tool. Its single-page functionality and recurring donation options make it a must-have for organizations that need these features to work seamlessly with their Drupal website. For organizations currently shopping around for a CRM, RedHen Donation is a huge plus for RedHen CRM and a compelling reason to select it as your constituent database.

We’re incredibly excited about RedHen Donation and what it offers nonprofits. We do understand that seeing is often believing, so we highly recommend that you install the latest release of [RedHen CRM](https://www.drupal.org/node/2199903), RedHen Donation, and see what we’re talking about. Not sure how to get started? Do you have more questions than what we covered? Leave us a comment - we’d love to talk RedHen with you.

