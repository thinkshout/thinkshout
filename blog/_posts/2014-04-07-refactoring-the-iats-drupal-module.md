---
layout: post
published: false
featured: false
author: dan
short: 
  - "This is why this post is so interesting. You can even include an '.\n"
  - "This is why this post is so interesting. You can even include an '."
  - "This is why this post is so interesting. You can even include an '.,This is why this post is so interesting. You can even include an '."
tags: 
  - Drupal
---

Last month we wrapped up a project for nonprofit-oriented payment processor, [iATS Payments](http://iatspayments.com/). iATS Payments wanted to invest in gaining wider adoption of their services and enlisted ThinkShout's help in building a [PHP wrapper](http://thinkshout.com/blog/2014/03/announcing-iats-php-wrapper/) for their existing [SOAP API](http://home.iatspayments.com/sites/default/files/iats_webservices_overview_version_4.0_0.pdf).

Being a bunch of software engineers who have implemented our fair share of APIs (both good and bad,) we knew we had to achieve certain goals if we were going to increase adoption of iATS Payments:

* **Minimal implementation effort**
  * The wrapper handles all communication with the iATS Payments SOAP API, validation of API calls and error handling.

* **Full documentation**
  * We made use of phpDocumentor to generate [easily browsable documentation](http://iatspayments.github.io/PHP/namespaces/iATS.html) from our code comments.

And the elusive, but always appreciated:

* **Full unit test coverage**
  * We implemented a PHPUnit test suit with unit tests for every API call.

With the new PHP wrapper finished and unit tests passed, our attention shifted to the project we felt would most benefit from the work we'd done; the [Commerce iATS Drupal module](https://drupal.org/project/commerce_iats). This module leverages Drupal Commerce to facilitate processing payments via iATS Payments on any Drupal website.

We had already integrated Commerce iATS into some of our clients' websites, so we knew it was a great module, but it was written before there was a standard iATS Payments PHP library and contained a some unwieldy code that we had eliminated in the PHP library.

There's nothing software engineers like more than reducing complexity, so we offered to take over the Commerce iATS module and, with sponsorship from iATS Payments, refactor and continue to support it.

## Refactoring Commerce iATS

In refactoring Commerce iATS, we didn't just plug in the PHP library and call it a day. While Commerce iATS was originally written with support for only credit card payments, our PHP wrapper supports all payment methods provided by iATS Payments and we wanted to make sure Commerce iATS had room to grow and take advantage of those payment methods.

Looking through the code of the existing Commerce iATS module, we realized the current design would not scale well as we added additional payment methods.

As an example, take a look at the [2.x-dev release of Commerce iATS](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l305).

Here the function ```commerce_iats_soap_process_submit_form_submit()``` is being used to handle a lot more logic than a form submit handler ideally would. Breaking it down:

* There's some [tight integration with the Commerce Card on File module](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l317). This could be broken out into a different payment method type, avoiding the call to ```module_exists()```.
* A lot of conditions are used to [build the API request](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l332), depending on which payment method triggered the form submit handler. This won't scale well when more payment methods are added.
* A [new transaction is created](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l367) based on the response from the iATS Payments API.
* More tight integration with [Commerce Card on File](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l415).

A lot of code in ```commerce_iats_soap_process_submit_form_submit()``` is [later duplicated](http://drupalcode.org/project/commerce_iats.git/blob/dea433a:/commerce_iats.module#l521) when ```commerce_iats_customer_code_charge_submit_form_submit()``` is called.

We set out to redesign the module's architecture and rebuilt with modularity and expansion in mind. Here's what we did:

* **Created a new [standard payment processing function](http://drupalcode.org/project/commerce_iats.git/blob/HEAD:/commerce_iats.module#l210) in ```commerce_iats.module```**
  * This function handles the API call, response handling, transaction creation and logging.
  * To handle multiple payment methods, the function accepts a callback function as a parameter. This callback function is the function that makes the API call via the PHP Wrapper and returns the response.

The first lines of ```commerce_iats_process_payment()```  demonstrate how the callback function is used:
```php
function commerce_iats_process_payment($payment_method, $payment_data, $order, $charge, $payment_callback) {
  // Process the payment using the defined callback method.
  $response = $payment_callback($payment_method, $payment_data, $order, $charge);
```

* **Broke payment methods out into their own include files.**
  * Here's the [credit card payment method](http://drupalcode.org/project/commerce_iats.git/blob/HEAD:/includes/commerce_iats.credit_card.inc).

Each payment method include file contains these standard Commerce functions (where ```credit_card``` is the payment method:)

* ```commerce_iats_credit_card_settings_form()```
* ```commerce_iats_credit_card_submit_form()```
* ```commerce_iats_credit_card_submit_form_validate()```
* ```commerce_iats_credit_card_submit_form_submit()```

Then we added our own callback function:

* ```commerce_iats_process_credit_card_payment()```

The callback function handles building the API request and getting a response from the API. To show how this works, here's a line from ```commerce_iats_credit_card_submit_form_submit()```
```php
return commerce_iats_process_payment($payment_method, $payment_data, $order, $charge, 'commerce_iats_process_credit_card_payment');
```

As you can see, all the payment information from the form submit handler is being passed into ```commerce_iats_process_payment()```. That function then calls the callback function ```commerce_iats_process_credit_card_payment()``` to [make the API call and get the response](http://drupalcode.org/project/commerce_iats.git/blob/HEAD:/includes/commerce_iats.credit_card.inc#l84).

This design is very easy to extend and allows us to add as many additional payment methods as we need in a very clean way. We were able to use this design to implement [Commerce Card on File as a submodule of Commerce iATS](http://drupalcode.org/project/commerce_iats.git/tree/HEAD:/modules/commerce_iats_cardonfile), eliminating that dependency from the base module.

All our work on Commerce iATS is currently available in the [2.0-beta1 release](https://drupal.org/node/2227713). If all that code looked interesting, please check out the module and let us know if you have any feedback.

Now we have a PHP library that exposes the entire iATS Payments API, ThinkShout is working with iATS Payments to integrate more of their payment processing facilities into the Commerce iATS module. Currently only credit card payments are supported, but we're already in the process of adding ACH/EFT and Direct Debit payments.

Keep an eye on the [Commerce iATS project page](https://drupal.org/project/commerce_iats) and this blog for updates. Both ThinkShout and iATS Payments will be attending DrupalCon 2014 in Austin. Come find us if you're there and want to talk payment processing.