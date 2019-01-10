---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: Sign Up for Entities and Fields
created: 1327002227
permalink: blog/2012/01/lev/entity-registrations/
tags:
- Drupal
- modules
- Drupal Planet
- Drupal Give

short: Last year we began work on an entity-based alternative to Signup.
author: lev
---
## The challenge
<img src="/sites/default/files/images/inline/ticket-icon.png" style="float: left; margin: 0 10px 10px 0;" />
Historically, the [Signup](http://drupal.org/project/signup) module has been the go-to solution for managing event registrations (i.e., sign-ups) in Drupal. This venerable module has nearly [8000 reported installs](http://drupal.org/project/usage/signup), 14 contributors, and a vibrant ecosystem of additional contrib modules (such as [Signup Integration for Ubercart](http://drupal.org/project/uc_signup)). Signup is also a key component of the [Conference Organizing Distribution](http://drupal.org/project/cod).

All this considered, only 500 of Signup's installs are in Drupal 7, for which the module still does not have a tagged, stable release. And since the module must maintain an upgrade path for all those users, taking full advantage of Drupal 7's new features, such as the entity system, is very challenging.

Given ThinkShout's comittment to Drupal innovation, last year we began work on an entity-based alternative to Signup, drawing significant inspiration from the amazing work that was already done there. We were very excited about the benefits offered by an entity-based registration system, namely the ability to add custom fields of any type to a registration, along with hooking into the various entity APIs. We launched an early version of the tool on [Manhattan Kayak Company's](/portfolio/manhattan-kayak-company) new website and started a [conversation](http://drupal.org/node/1285384) with the Signup team about possible collaboration. While productive and receptive, things were moving a bit slowly, so we started up a new [Entity Registrations](http://drupal.org/project/registration) project on Drupal.org and have recently pushed the code to a point where we want to share and discuss it with the community.
<!--break-->
## Entity Registrations module architecture
The module defines two custom entity types, registrations and registration types - following the pattern defined by [Entity API](http://drupal.org/project/entity), Entity Registration's only dependency. Registration types are the different bundles of registrations, which can be arbitrarily added, deleted, etc. Each bundle can have unique fields and display settings associated with it. When a site visitor registers for a registration of a given type, all of those fields are then made available, along with the default registration properties. Speaking of, aside from any fields you add to a registration bundle, it includes the following key properties:

1. Type or bundle
2. Entity ID that the registration is associated with
3. Entity type that the registration is associated with
4. Email address of the registrant
5. Count, or how many slots this registration should use towards the total capacity for this event
6. Author user id (or an empty value for anonymous registrations)

These properties highlight a couple key features. First, note that registrations require both an entity id *and* an entity type. That's because registrations can be associated with *any* entity type, not just nodes. That's right, registrations can be associated with a user, taxonomy term, or, say, a product entity. It's this last case that has us most excited and we plan on releasing [Drupal Commerce](http://drupal.org/commerce) integration to support paid registrations in the near future. Second, the count field indicates that a single user can register more than one registrant. We've found this to be a common use case, E.g., someone at a company registering all of its employees for, say, DrupalCon, in one registration. You could even attach a [field collection](http://drupal.org/project/field_collection) field to a registration allowing you to collect granular information for multiple registrants for a single registration. You might also want to consider [field collection table](http://drupal.org/project/field_collection_table) to create tabular lists of registrants.

## Registration field
We struggled with the best way to enable registrations of a given type (or bundle) for individual entities. We wanted to ensure that entity bundles could have default registrations types that could be overridden on a per-entity basis. The options were a) a standalone interface to set default registration types for each type of entity bundle, combined with an override option, or b) to create a new registration field type. We went the latter route and are really excited about early results. Here's how it works:

* Create one or more registration types.
* Add a registration field to any entity bundle, E.g., node type, user, taxonomy term, product, etc. The possible values for this field will be all of the available registration types.
* Select the display formatter for the field. Current options are the name of the registration type, a link to the registration form, or embedding the actual form with all the configured fields.
* When you add or edit an entity, select the type of registrations you want to enable.
 
The entity will now have a "manage registrations" local task which exposes all the settings and tools for that entity's registrations, including:

* Tabular list of registrants
* Turn registrations on or off
* Reminder date, settings and email template
* Capacity
* Whether or not to allow multiple registrants per registration
* Broadcast tool to send emails to all registrants

We had to jump through some hoops like forcing a cardinality of 1 on the field and preventing the attachment of more than registration field to an entity bundle. The solution is far from perfect, and we have some work to do in polishing it up, but, in our minds, the flexibility and ease of use outweighed any downsides.

## Also worth noting
* [Views](drupal.org/project/views) and [Rules](drupal.org/project/rules) integration is provided via the Entity API. The default registrants view likely won't cut it for many use cases.
* Broadcast emails can be made transaction by using the STS feature of the [MailChimp module](http://drupal.org/project/mailchimp), or other similar services.

## Next steps
Aside from addressing overall polish and bugs, of which we're sure there are plenty at this point, we're looking at the following:

1. Changing the current reminder date property to an more generic event date and then setting reminder, open, and close dates as relative values to the main event date. We've considered using a [date](http://drupal.org/project/date) field and, at least for now, have decided not to make that a requirement. Individual implementations can certainly have a date field on an entity and copy that value over to the registration date on node_save().
2. Allowing users to edit their own registrations
3. The aforementioned Commerce integration
4. Perhaps moving the registration settings and/or defaults to the field level rather than entity level

We'd love to get some feedback from the community on these and other features we may have missed, either in this post or over in the [issue queue](http://drupal.org/project/issues/registration). We had discussed [Entity Registrations making its way into COD for D7](http://usecod.com/news/2012/cod-2012-update-new-co-maintainer-drupal-7-acquia) and would love to help with that effort. We're also still very open to possible collaborations with the Signup team. As we mentioned, a potential blocker to merging the projects is the upgrade path for existing Signup users.
