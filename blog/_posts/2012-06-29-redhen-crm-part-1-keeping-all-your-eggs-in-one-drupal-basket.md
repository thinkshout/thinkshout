---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: RedHen CRM Part 1, Keeping all your eggs in one Drupal basket
created: 1341001377
permalink: blog/2012/06/sean/redhen-crm-part-1/
tags:
- RedHen
- nonprofit tech
- Drupal Planet
- Drupal Give
short: ThinkShout is proud to announce the Alpha release of RedHen CRM.
author: sean
---
## Introducing RedHen CRM
<img src="https://dl.dropbox.com/s/3vsjjgva9gimabh/redhen_logo.png" style="float: right; margin: -10px 0px 10px 15px" />

The Drupal community has long aspired for native CRM functionality for many years. Unfortunately, solutions to this problem in older releases of Drupal were less than perfect - usually relying on the node system to manage contact data. Of course, the node system was designed for managing *content*, so these node-based CRM solutions required lots of extra code and duct tape to keep content and *contacts* separated.

Fortunately, the arrival of the entity framework in Drupal 7.x core has opened the door to the development of more robust CRM solutions built natively in Drupal. So, after a year of scheming and over 700 hours of very intense development, ThinkShout is proud to announce the Alpha release of [RedHen CRM](http://drupal.org/project/redhen).


## Why Does Native CRM Matter?

*[CiviCRM](http://civicrm.org) is a mature open source CRM solution that integrates with Drupal, so why not just use that? Drupal also integrates well with many 3rd-party SaaS solutions, such as Salesforce, why reinvent the wheel?*

There are many benefits to integrating your Drupal site with a 3rd-party CRM solution. But there are many missed opportunities and drawbacks to these integrations as well. The most obvious benefits to native CRM in Drupal include:

* A more seamless user experience for site visitors registering for events, making donations/payments, or engaging in other website transactions.
* The opportunity to leverage Drupal's growing suite of mobile and responsive tools and themes for CRM interfaces.
* The ability to expose CRM data as content, and/or the ability to display aggregate CRM data on your site.
* Increased opportunities to integrate CRM data with Drupal contributed tools - such as data visualization tools, geo-mapping tools, and more.
* Decreased staff training costs - because staff doesn't need to get trained on multiple platforms.
* Potential reductions in technical risk - because all your tools rely on a single, Drupal framework.
* Potential reductions in hosting and IT costs.
* The ability to do complex *engagement scoring* or *engagement analytics* (more on this later).
* **And probably most important - the ability to fully customize your CRM solution.**

## Native CRM And *(Not Versus)* Enterprise CRM

One last point before diving into the guts of RedHen CRM:

While we think that it's possible to build very robust, large-scale CRM solutions natively in Drupal, our goal in releasing RedHen is not to compete with the enterprise CRM market. Platforms like Salesforce will inevitably out scale what we can build with Drupal.

That said, enterprise CRM solutions are often overkill for small to mid-sized organizations. Moreover, even if your organization does need an enterprise CRM solution, we see RedHen as a natural integration point between your website and such a system.

With the right Drupal development partner, tools such as RedHen open the door to the creation of highly innovative "front end" CRM tools. We anticipate that collecting and displaying data in RedHen (and Drupal) will often be much more affordable and nimble than trying to develop comparable features upon larger, more cumbersome enterprise packages.

## What Can You Do With RedHen CRM?

RedHen CRM has been largely designed around the **[association management](http://en.wikipedia.org/wiki/Association_management_system)** (AMS) needs of membership organizations. That said, the RedHen framework is flexible and can be leveraged to develop a wide range of CRM solutions. For example, RedHen could be used as a light weight sales pipeline management tool for small to mid-size businesses.

## Getting Started

RedHen CRM is similar to [Drupal Commerce](http://drupal.org/project/commerce) in its modular structure. As with Drupal Commerce, the core RedHen modules that can be downloaded on the [Drupal.org project page](http://drupal.org/project/redhen) won't provide you with a working CRM right out of the box. They require configuration. In the future, ThinkShout is likely to release RedHen "Features" or "Apps" that provide prepackaged CRM solutions for different use cases.

In the short term, if you would like to explore RedHen CRM, we would encourage you to check out our [demonstration RedHen CRM installation profile](http://drupal.org/project/redhen_demo). This install profile will build out a simple example of how RedHen could be leveraged to support the CRM needs of a fictional "pet shelter" organization.

## Project Structure

RedHen CRM relies heavily on custom Drupal entity types and bundles. The [Entity API](http://drupal.org/project/entity) module is leveraged to do most of the heavy lifting for these custom entities. The [Relation](http://drupal.org/project/relation) module is leveraged to manage connections between these custom entity bundles. The core RedHen module provides shared APIs, although the majority of RedHen features are broken out into separate sub-modules that ship with the main module. As with Drupal Commerce, we will continue to include key sub-modules with the main module code base. However, we anticipate that an ecosystem of plug-in modules will soon be available to extend the core feature set.

## Basic Concepts and Features

* RedHen CRM defines two main entity types: Contacts and Organizations. Site administrators can then create different entity bundles for each of these types. Each bundle can then be *fielded.*

* **Connections** can then be made between contacts, as well as between contacts and organizations. **Connections** are managed as custom entity bundles as well, based upon the relation entity type defined by the Relation module. As such, these connections can be fielded as well. In other words, you can create a relationship, or connection, between contacts and organizations that include field data about the relationship. Potential connection fields might include "job title" or "job start date."

* **Memberships** are another custom entity type defined by the "RedHen Membership" module. Both contacts and organizations can be associated with memberships. RedHen's membership management features are very flexible and feature rich. Memberships can be associated with the management of Drupal user roles to provide website access based upon individual and organizational membership status.

* Optionally, contact entities can be associated with Drupal user accounts. Currently, these connections are managed from the contact entity edit screen. Contacts can be associated with existing Drupal user accounts, or a new Drupal user account can be created from the contact entity edit form.

* **Notes** is another custom entity type and bundle provided by the "RedHen Notes" sub-module. Notes provide a site administrator a simple tool for capturing tagged notes about contacts and organizations. As a custom entity bundle, notes are fieldable as well.

* The Notes module also integrates with the "RedHen engagement scoring" sub-module. Engagement scores allow a site administrator to track and score various types of interactions with contact entities.

* Finally, RedHen CRM ships with a "RedHen groups" sub-module that allows you to *groupify* RedHen organizations. Groupified organizations function similarly to [Organic Groups](http://drupal.org/project/og), in that they provide a simple container for managing private node content associated with each organization.

## Extending RedHen CRM with Views and Rules Integration

The RedHen CRM framework does not require [Views](http://drupal.org/project/views). However, because RedHen is built upon Entity API, you can easily extend RedHen to work with Views and Rules. With Views, you can customize your instance of RedHen CRM to create personalized reports of contact, organization, membership and/or engagement scoring data. With Views plugins such as [Views Bulk Operations](http://drupal.org/project/views_bulk_operations) and [Views Data Export](http://drupal.org/project/views_data_export), you can further extend RedHen with bulk editing and export tools.

## For More Information

Complete RedHen site administration docs will be coming soon. You can also check out the README files contained with each RedHen module. For technical issues, please use the [D.O. issue queue](http://drupal.org/project/issues/redhen). For community support and to learn about RedHen usage, please consider joining the [RedHen Drupal group](http://groups.drupal.org/redhen-crm) and follow us on Twitter [@RedHen_CRM](http://twitter.com/redhen_crm).

## Next Up: A RedHen CRM Feature Deep-Dive

For a detailed look at RedHen CRM, check out [Part 2](/blog/2012/06/sean/redhen-crm-part-2) of this article.
