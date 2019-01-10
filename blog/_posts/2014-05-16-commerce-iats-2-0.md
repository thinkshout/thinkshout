---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: Commerce iATS 2.0
published: true
featured: false
author: dan
short: Our latest release of Commerce iATS brings ACH/EFT and Direct Debit payments.
date: 2014-05-16 15:00:00
tags:
  - Drupal Planet
  - Drupal Give
  - "E-commerce"
  - modules
---

Last month, we released the 2.0-beta release of the Commerce iATS module, a Drupal module that leverages [Drupal Commerce](https://drupal.org/project/commerce) and the [iATS Payments PHP Wrapper](/blog/2014/03/announcing-iats-php-wrapper/) to add support for payment processing via [iATS Payments](http://home.iatspayments.com/).

We also [promised to deliver](/blog/2014/04/refactoring-the-iats-drupal-module/) ACH/EFT and Direct Debit payment functionality before DrupalCon Austin. It took a few long days, but we're proud to announce the release of [Commerce iATS 2.0](https://drupal.org/project/commerce_iats).

Commerce iATS 2.0 is packed with new features that allow you to fully take advantage of the services offered by iATS Payments.

## New Payment Methods

In addition to supporting **credit card payments**, Commerce iATS now supports **ACH/EFT**, meaning your users can now make payments directly from their bank account.

Because iATS Payments supports international payments, we made sure that you can too. Commerce iATS 2.0 fully supports **[Direct Debit](http://en.wikipedia.org/wiki/Direct_debit)** for the UK.

![Direct Debit screenshot]({{ site.baseurl }}/assets/images/blog/commerce-iats-direct-debit-declaration.png "Setting up a Direct Debit")

If you're familiar with Direct Debit, you'll know that any website offering the service is required to implement a very specific checkout process.

With assistance from iATS Payments, we've done all the work for you. Commerce iATS now provides a set of [custom checkout panes](https://drupal.org/node/2268891) for the complete Direct Debit checkout process. You don't even have to worry about the 12-day lead time on initial payments; the module figures it out and gives your users a choice of start dates.

![Direct Debit schedule screenshot]({{ site.baseurl }}/assets/images/blog/commerce-iats-direct-debit-schedule.png "Setting up a Direct Debit schedule")

## More Options for Recurring Payments

Recurring payments are great for donations, which fits in with iATS Payments' goal of supporting the needs of nonprofit organizations.

With Drupal Commerce, you always had the option of recurring payments using the [Commerce Card on File](https://drupal.org/project/commerce_cardonfile) module, but iATS Payments handles that for you. With Commerce iATS 2.0, you can opt to have iATS Payments bill your customers on a recurring schedule rather than have your Drupal site do all the work.

The Drupal Commerce order stays updated with recurring transactions thanks to iATS Payment's [ReportLink service](http://home.iatspayments.com/sites/default/files/iats_webservices_reportlink_version_4.0.pdf). Commerce iATS implements a cron task to pull in daily transaction reports from iATS, updating your orders in the process.

In addition to the new features, we took time to make the module more robust. Some of our improvements are:

* The Payment Methods Admin Page now warns of any unconfigured payment methods
* Error handling in the checkout process is much more user-friendly
* Payment method settings are clearer and easier to understand

## See you at DrupalCon

ThinkShout and iATS Payments will be attending DrupalCon Austin. Don't miss the chance to talk nonprofit payment processing with iATS at booth 508. We'll be spending time at the iATS booth to talk about Commerce iATS. [Follow us on Twitter](https://twitter.com/thinkshout) for updates on when we'll be around.

Get Commerce iATS from our [Drupal.org project page](https://drupal.org/project/commerce_iats).
