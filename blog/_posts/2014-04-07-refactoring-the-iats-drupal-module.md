---
layout: post
published: false
featured: false
---

Last month we wrapped up a project for nonprofit-oriented payment processor, iATS Payments. Working closely with iATS Payments, we built a PHP library for their SOAP API with the end goal being easier integration for web application developers. You can [read about the library here](http://thinkshout.com/blog/2014/03/announcing-iats-php-wrapper/).

With the new PHP library finished and unit tests passed, our attention shifted to the project we felt would most benefit from the work we'd done; the Commerce iATS Drupal module. This module leverages Drupal Commerce to facilitate processing payments via iATS Payments on any Drupal website.

We had already integrated Commerce iATS into some of our clients' websites, so we knew it was a great module, but it was written before there was a standard iATS Payments PHP library and contained a some unwieldy code that we had eliminated in the PHP library.

There's nothing software engineers like more than reducing complexity, so we offered to take over the Commerce iATS module and, with sponsorship from iATS Payments, refactor and continue to support it.

In refactoring Commerce iATS, we didn't just plug in the PHP library and call it a day. Commerce iATS originally only supported credit card payments, but the PHP library we had written exposed the entire iATS Payments API. To make sure Commerce iATS had room to grow, we redesigned the module's architecture and rebuilt with modularity and expansion in mind.

ThinkShout is currently working with iATS Payments to integrate more of their payment processing facilities into the Commerce iATS module. Keep an eye on the [Commerce iATS project page](https://drupal.org/project/commerce_iats) for updates.
