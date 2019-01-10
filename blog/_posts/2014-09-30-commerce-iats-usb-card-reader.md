---
title: Adding Encrypted USB Card Reader Support to Commerce iATS
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: dan
published: true
featured: false
short: Process credit card payments quickly and securely using an encrypted USB card reader.
tags:
- iATS
- Commerce iATS
- iATS Payments
- Drupal Planet
date: 2014-09-30 16:00:00
---

Ever been in a situation where you wished your Drupal Commerce installation could operate more like a Point of Sale system? Especially for nonprofits, taking donations and charging admission to events are prime examples of times when swiping a customer's credit card would be a great time saver.

As of version 2.5, [Commerce iATS](https://www.drupal.org/project/commerce_iats) supports the use of [encrypted USB card readers](http://home.iatspayments.com/developers/encrypted-magnetic-stripe-readers) with iATS Payments.

Setting things up is easy:

1. Upgrade to [Commerce iATS 2.5](https://www.drupal.org/node/2345737)
2. Edit the Commerce iATS credit card payment method by selecting `Store`, `Configuration`, then `Payment methods` from your Drupal admin menu
3. Check the "Use encrypted USB card reader" option of the credit card payment method (see screenshot below)
4. Select the name of the USB card reader you're using
5. Save the changes to the payment method and you're good to go

![Enable USB card reader functionality](https://thinkshout.com/assets/images/blog/commerce-iats-card-reader-settings.png)

The USB card reader option is only available to Drupal admin users, not regular customers, so you'll need to create an order manually through the Drupal Commerce admin interface before you can process a payment by swiping a credit card.

The next time you add a credit card payment to an order, you'll see something like this:

![Adding a payment with an encrypted USB card reader](https://thinkshout.com/assets/images/blog/commerce-iats-card-reader-data.png)

That code is the encrypted credit card data fed into Drupal by the USB card reader. Or it might be the Matrix, we're still not entirely sure.

In addition to the convenience of not having to type in credit card details, the USB card readers are fully PCI compliant. All sensitive credit card information is encrypted by the reader before it reaches Drupal, meaning you never need to pass unencrypted card data through your server.

For the developers out there, the USB card readers can hook into three of iATS Payments' API services:

* **[ProcessCreditCardV1](https://www.iatspayments.com/NetGate/ProcessLink.asmx?op=ProcessCreditCardV1)**
  * Process a credit card transaction without storing any data locally.

* **[CreateCreditCardCustomerCodeV1](https://www.iatspayments.com/NetGate/CustomerLink.asmx?op=CreateCreditCardCustomerCodeV1)**
  * Create a customer code without a charge. This is a great way to store a customer's credit card to bill later. Fully PCI compliant as only the iATS Payments customer code is stored on your server, not the credit card information.

* **[CreateCustomerCodeAndProcessCreditCardV1](https://www.iatspayments.com/NetGate/ProcessLink.asmx?op=CreateCustomerCodeAndProcessCreditCardV1)**
  * A combination of the above two services, charge a credit card and create a customer code at the same time.

You can see some example card data in iATS Payments' [developer documentation](http://home.iatspayments.com/developers/encrypted-swipe/usb-devices). If you're ready to start swiping credit cards, the documentation includes links to sites where you can purchase one of the two encrypted USB card readers supported by iATS Payments.
