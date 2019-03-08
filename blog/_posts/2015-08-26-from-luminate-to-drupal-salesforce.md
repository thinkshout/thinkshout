---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: Migrating from Luminate CRM to Drupal and the Salesforce Nonprofit Starter Pack
author: jaden
published: true
featured: false
short: A case for Drupal and Salesforce's NPSP as a superior alternative to Blackbaud's Luminate CRM.
tags:
  - Engagement Tools
  - CRM
  - Salesforce
  - Drupal
  - Drupal Planet
  - facing-history
date: 2015-08-26 15:00:00
topic: process
---
We've helped a number of nonprofits move from Luminate CRM to Drupal-Salesforce solutions, including the Young Survival Coalition, Facing History and Ourselves, the National Kidney Foundation, and the Los Angeles Conservancy.

Without getting too deep into the technical architecture - [which you can nerd out on in other posts on our blog](/blog/2015/04/salesforce-new-features/) - our open source Salesforce integration can map any object/field in Salesforce to a corresponding entity type/field in Drupal. We can then sync these records bidirectionally. We can even support complex, cascading upserts of multiple records in real time.

This allows us to leverage everything that’s great about Drupal (CMS tools, personalization, paid and unpaid event registrations, membership purchases, general ecommerce, and user access controls) with everything that’s great about Salesforce's Nonprofit Starter Pack (NPSP) 3.0 (best-in-class donor management, unlimited extendability and scalability, flexible and intuitive reporting tools, and the most robust Application Exchange available).

It's always been clear that Salesforce provides much better constituent relationship management tools on the backend than Luminate or other Convio/Blackbaud products. What’s kept Luminate in the game for so long has been its public-facing web features, such as membership management and event registration tools.

That said, there is no way that Luminate could ever keep up with the pace of innovation that we see with comparable features in Drupal. The open source model and volume of contributions from the Drupal community is unparalleled. Leveraging Drupal as a donor/constituent front-end for Salesforce, we can provide seamless user experiences that engage with website visitors more deeply, because we can personalize these experience based upon data pulled from Salesforce’s API.

**Take the Los Angeles Conservancy as a case study:**

When we met the [Conservancy](https://www.laconservancy.org/), they were struggling to engage stakeholders through an aging website and cumbersome collection of Luminate donation and event management tools. Asking website visitors to click away from their website to third-party forms provided by Convio severely hurt their conversion rates. Mobile event registrations and contributions were almost nonexistent on their site.

The Conservancy wanted an interactive and mobile-friendly solution that would allow their constituents to easily sign up for free walking tours, buy tickets to movie events, update their membership information, set up recurring membership payments, and make donations towards different fundraising campaigns.

By leveraging Drupal event registration and ecommerce tools, we were able to build all of these features within the Conservancy’s new responsive website. This provided a much more seamless user experience. Conversion rates soared as a result. In fact, the Conservancy staff came to us 3 months after the relaunch concerned that their Google Analytics showed decreased traffic on their event registration pages. They worried that they were losing registrations - when in reality, their conversation rates were going up so dramatically, and the time for completing an ecommerce transaction was dropping so quickly, that these forms were seeing less page clicks while their volume of transactions and their revenue was going up.

With Drupal-based event registration and donation tools, we have 100% control over ecommerce workflows. We can also support complex pricing options based upon constituent data in Salesforce. For example, we can adjust ticket pricing based upon membership status. Again, we benefit from Drupal Commerce, an ecommerce solution that powers over 60,000 websites, including some of the largest stores on the Internet.

Further, integrating these Drupal-Salesforce solutions with [iATS Payments](http://home.iatspayments.com/), we can create Drupal-based donation portals that support “card on file” as well as recurring donations. And with iATS’s integration with Salesforce, donors can update their credit card information or make a donation over the phone by calling the Conservancy, storing this payment information for their next online transaction.

In short, Convio/Blackbaud just can’t compete… With what our clients save in confusing and expensive Blackbaud licensing fees, we can build more effective fundraising solutions that lead to much higher returns for their investment.
