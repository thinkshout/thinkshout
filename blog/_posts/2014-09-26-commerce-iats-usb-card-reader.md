---
title: Adding Encrypted USB Card Reader Support to Commerce iATS
layout: post
author: dan
published: true
featured: true
short: |
  Process credit card payments quickly and securely using an encrypted USB card reader.
tags:
- iATS
- Commerce iATS
- iATS Payments
date: 2014-09-26 12:00:00
---

Ever been in a situation where you wished your Drupal Commerce installation could operate more like a Point of Sale system? Especially for non-profits, taking donations and charging admission to events are great examples of times when swiping a customer's credit card would be a great time saver.

As of version 2.5, Commerce iATS supports [encrypted USB card readers from iATS Payments](http://home.iatspayments.com/developers/encrypted-magnetic-stripe-readers).

iATS Payments provides a choice of two USB card readers that you can use with your Mac or PC. Set up is easy:

* Upgrade your Drupal installation with Commerce iATS 2.5
* Check the "Use encrypted USB card reader" option of the credit card payment method
* Select the name USB card reader you're using
* Save the changes to the payment method and you're good to go

TODO: Screenshots of the above.

The USB card reader option is only available to admin users, not regular customers, so you'll need to create an order manually through the Drupal Commerce admin interface before you can process a payment by swiping a credit card.

In addition to the convenience of not having to type in credit card details, the USB card readers from iATS Payments are fully PCI compliant. All sensitive credit card information is encrypted by the reader before it reaches Drupal, meaning you never need to pass unencrypted card data through your server.
