---
layout: post
title: Commerce iATS 2.0
published: false
featured: false
author: dan
short: Our latest release of Commerce iATS brings ACH/EFT and Direct Debit payments.
tags: 
  - Drupal Planet
  - Drupal Give
  - "E-commerce"
  - modules
---

Last month, we released the 2.0-beta release of the Commerce iATS module, a Drupal module that leverages Drupal Commerce to add support for payment processing via [iATS Payments](http://home.iatspayments.com/).

We put a lot of thought into refactoring the structure of Commerce iATS in the beta to give us a solid foundation for what we released this week; [Commerce iATS 2.0](https://drupal.org/project/commerce_iats).

2.0 is packed with new features that allow you to fully take advantage of the services offered by iATS Payments.

## New Payment Methods

In addition to supporting **credit card payments**, Commerce iATS now supports **ACH/EFT**, meaning your users can now make payments directly from their bank account.

Because iATS Payments supports international payments, we made sure that you can too. Commerce iATS 2.0 fully supports **Direct Debit** for the UK.

If you're familiar with Direct Debit, you'll know that any website using the service is required to implement a very specific checkout process.

With assistance from iATS Payments, we've done all the work for you. Commerce iATS now provides a set of custom checkout panes for the complete Direct Debit checkout process. You don't even have to worry about the 12-day lead time on initial payments; the module figures it out and gives your users a choice of start dates.

**Screenshot Placeholder: Direct Debit schedule set-up.**

## More Options for Recurring Payments

With Drupal Commerce, you always had the option of recurring payments using the Commerce Card on File Recurring module, but iATS Payments is good enough to handle that for you. In Commerce iATS 2.0, you can opt to have iATS Payments bill your customers on a recurring schedule, rather than having your Drupal site do all the work.

Recurring payments are great for donations, which fits in with iATS Payments' goal of supporting the needs of nonprofit organizations.

In addition to the new features, we took time to make the module more robust. The Payment Methods Admin Page will now warn you if you have any unconfigured payment methods enabled.

## See you at DrupalCon

ThinkShout and iATS Payments will be attending DrupalCon 2014. Don't miss the chance to talk non-profit payment processing with iATS at booth 508. We'll be spending time at the iATS booth to talk about Commerce iATS. [Follow us on Twitter](https://twitter.com/thinkshout) for updates on when we'll be around.

Get Commerce iATS from our [Drupal.org project page](https://drupal.org/project/commerce_iats).