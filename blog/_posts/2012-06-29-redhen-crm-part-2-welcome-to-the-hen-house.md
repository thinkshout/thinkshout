---
layout: blog
body-class: blog-post
category:
category-options:
 - Technology and Innovation
 - Strategy and Design
 - Project Management and Process
 - Culture, Community, and Business
header-image:
header-image-alt:

title: 'RedHen CRM Part 2: Welcome To The Hen House'
created: 1341002059
permalink: blog/2012/06/sean/redhen-crm-part-2/
tags:
- RedHen
- nonprofit tech
- Drupal Planet
- Drupal Give
short: "In this RedHen CRM demonstration, we will show how the framework could be leveraged to build an association management system (AMS) supporting a fictional organization: The National Association of Pet Shelters."
author: sean
---
In [Part 1](/blog/2012/06/sean/redhen-crm-part-1) of this article we explored the major benefits and broad concepts of [RedHen CRM](http://drupal.org/project/redhen). In this article, we will take a detailed look at RedHen's current feature set - as demonstrated in our [sample RedHen installation profile](http://drupal.org/project/redhen_demo).

In this RedHen CRM demonstration, we will show how the framework could be leveraged to build an association management system (AMS) supporting a fictional organization: *The National Association of Pet Shelters*.

In this example, we have created two different types (or in Drupal speak "entity bundles") of individual contact records - one for shelter staff and another for volunteers, each with its own unique set of fields. Similarly, we have created two different types of organization records - one for the shelters themselves and another for foundations that support the work of these organizations. We can then leverage RedHen to show the connections between these contact and organization records, as well as to manage both individual and organizational memberships within our fictional association.

![RedHen Dashboard](https://dl.dropbox.com/s/0ngtt62kiu5vl7m/demo_dashboard.png)

## Working with Contacts

#### Configuring Contact Entity Bundles

RedHen CRM defines a custom entity type for "Contacts." As mentioned above, RedHen CRM allows site administrators to create their own "contact bundles" - each with its own unique sets of fields:

![Contact Bundles](https://dl.dropbox.com/s/9jk505ahktcxe1d/structure_contact_types.png)

Below is a listing of the fields that have been added to our demonstration CRM's "volunteer" contact bundle:

![Volunteer Bundle](https://dl.dropbox.com/s/ptiws9djp91l05n/structure_contact_types_volunteer_bundle.png)

The "RedHen Contact Email" field is a new field type defined by RedHen CRM to provide additional options for managing the unique email communication preferences of your RedHen contacts. The "Availability" field provides an example of how we can extend contact records to include additional, customized field data about our contacts.

#### Filtering Contacts

Once we've configured our content entity bundles, we can view and search our contacts across various fields and properties: 

![Contact Listing](https://dl.dropbox.com/s/80e9ihj8mcse6pj/contacts_listing.png)

Notice that when we change our "contact type" filter (or, in Drupal speak, when we filter on "contact entity bundle"), RedHen CRM's contact listing automatically pulls in the fields available as filter options for the selected bundle:

![Contact Filters](https://dl.dropbox.com/s/s2wsuj8p2utldnx/contacts_contact_type_filter.png)

#### Working with Individual Contact Entities

The default contact entity display:

![Viewing a Contact](https://dl.dropbox.com/s/6i13xd33t521buq/contact_example_view.png)

Editing fields and properties on a contact entity (In this case, a *staff* contact entity):

![Editing a Contact](https://dl.dropbox.com/s/t62rrwnwieonq69/contact_example_edit.png)

#### Connecting Content Entities with Drupal User Accounts

Optionally, you can choose to associate contact entities with Drupal user accounts on your site. You can either choose to connect the contact entity with an existing user account:

![Contact to Existing User](https://dl.dropbox.com/s/0o3jbhk3663r8wg/contact_example_add_user.png)

Or, you can create a new Drupal user account for the contact entity from within the RedHen interface:

![Contact to New User](https://dl.dropbox.com/s/opzz5s9haxime3r/contact_example_add_user_new.png)

Within the next month, we will be extending this feature to allow Drupal users to edit their own content information via this linkage. But for now, this feature is primarily leveraged for managing access control and Drupal user roles via our **membership management tools**, which we describe shortly.

## Working with Organizations

![Organization Listing](https://dl.dropbox.com/s/dnb20vjbh7ey61e/organizations_listing.png)

Organizations work similarly to Contacts. RedHen defines an entity type for organizations - which can be extended by a site administrator as custom organization entity bundles.

## Connecting Contacts and Organizations

RedHen CRM leverages the [Relation module](http://drupal.org/project/relation) to allow for different types of relationships (or *connections* in RedHen CRM speak) between contacts - as well as between contacts and organizations.

![Contact to Organization](https://dl.dropbox.com/s/8biq5m0rqtbju49/contact_organization_connection_view.png)

As with all the other entity types/bundles that are part of RedHen CRM, these relationships are *fieldable*:

![Adding connection](https://dl.dropbox.com/s/hmana49e2ip6pnk/contact_organization_connection_add.png)

This means that you can add fields to your relationships to track metadata about the connections between RedHen entities.

#### Managing Primary Contacts for Your Organizations

When managing connections between contacts and organizations, site administrators can also determine the primary contact for an organization entity. *See the "Primary Contact" link on the right-hand side of the screenshot below:*

![Primary Contact](https://dl.dropbox.com/s/vapsc3sxccqy3n7/setting_primary_contact.png)

The primary contact is a *dynamic property* for organization entities, and has been exposed to Views and Rules.

## Managing Memberships

Our clients' reoccurring need for a flexible and customizable membership management solution was one of our primary motivations in developing RedHen. Selling Drupal user roles with Drupal Commerce, or managing the expirations of Drupal user roles with contributed modules such as [Role Expire](http://drupal.org/project/role_expire) is simply not a robust enough solution for large membership organizations with complex business rules around membership-based services.

#### Individual vs. Organizational Memberships

With this in mind, RedHen CRM allows you to create different types of memberships, which can be applied to both content entities organization entities. These membership types are, of course, entity bundles, so again - they are fieldable.

![Add membership](https://dl.dropbox.com/s/j9gcxcfsiu47b0m/contact_example_add_membership.png)

#### Assigning Drupal User Roles Via Memberships

As mentioned above, Drupal user accounts can be associated with RedHen contacts. Once these connections are made, the assignment of an active membership can be leveraged to provide a user account with a Drupal user role.

When a RedHen membership that is associated with a Drupal user role is assigned to a RedHen Organization - this role is applied to all Drupal user accounts associated with contacts related to that RedHen organization.

Let me repeat this point, because it is truly one of the most unique features of RedHen CRM:

> With RedHen CRM, you can manage Drupal user roles via organizational memberships.

#### Role-based Membership Benefits

It goes without saying that Drupal's role-based permission and access control system is one of its great strengths. Combining the Drupal user role framework with CRM functionality represents on of the most important value propositions of RedHen CRM and, more generally speaking, native Drupal CRM tools.

Leveraging RedHen CRM with Drupal Commerce, you could use these membership management tools to provide discounts on e-commerce transactions. Leveraging a wide variety of contributed access control modules, could you could also build premium content libraries. The "Association Management Solution" (AMS) opportunities are endless.

## Capturing Notes on Contacts and Organizations

Notes can be added to both contact and organization entities. As an entity bundle, notes can be extended with fields.

![](https://dl.dropbox.com/s/uis1ya4op9brhc5/contact_example_add_note.png)

In the case of our RedHen Demo CRM, we have extended the notes bundle with a taxonomy reference field for the "type" of note that is being recorded. When viewing note history, these notes can then be filtered by this type taxonomy.

## Engagement Scoring

In the notes screenshot above, you'll also notice a dropdown option for ***Engagement Score***.

*Engagement scoring* (often referred to as "engagement analytics" or "engagement metrics") is a relatively new concept in measuring the interactions of web site visitors. Web analytics packages such as Google Analytics generally focus on measuring *quantitative* analytics - or the number of page visits and clicks. Engagement scoring focuses on measuring the *quality* of these interactions by weighting the value of different types of interactions between site visitors and your website. For example, sharing an article from your website to a social network might be worth "5 engagement points", commenting on a blog post might be worth "10 points."

The RedHen Engagement module provides an API and framework for tracking this type of engagement. The module also integrates with the "RedHen Notes" module, so that offline interactions with RedHen Contacts can also be tracked and scored. To learn more about engagement scoring in RedHen, check out this [blog post](http://thinkshout.com/blog/2012/07/sean/engagement-scoring).

![Engagement Score](https://dl.dropbox.com/s/2tljvzmlb8rwnwd/contact_example_engagement_score.png)

## Tracking Event Registrations

RedHen CRM integrates closely with the [Entity Registrations](http://drupal.org/project/registration) module - which our ThinkShout geeks also maintain. As shown in the screenshot below, the Entity Registrations module allows you to manage event registrations as entities.

![Registration form](https://dl.dropbox.com/s/r6jp8p0qnf9omy7/registration_form.png)

When enabled, the RedHen Registration module adds an additional tab to the contact entity screen called "Registrations." There, both authenticated and anonymous event registrations will be listed for each contact, based upon a matching email address.

![Registrations](https://dl.dropbox.com/s/4s8nefc0bi45tl5/contact_example_registrations.png)

*Note: In the future, we plan to extend this module such that new registrations associated with email addresses **not** found in RedHen CRM will trigger the creation of new contact entities.*

## RedHen Organizations as "Groups"

The RedHen Organization Groups module allows you to *groupify* organization entity bundles.

![Group Settings](https://dl.dropbox.com/s/kv9fsiopxgrnkxh/groups_settings.png)

This module provides functionality similar to [Organic Groups](http://drupal.org/project/og). A groupified organization can have node content associated with it. Optionally, this content can be made private, and therefore only viewable to Drupal user accounts associated with RedHen contact entities which are in turn associated with a specific RedHen organization entity.

In the screenshot below, you can see how a node can be added to a groupified RedHen organization:

![Group Settings on Node](https://dl.dropbox.com/s/kngg7e7fefflicw/groups_add_content.png)

Then, when looking at a RedHen organization entity, you can see all associated group content:

![Group Content](https://dl.dropbox.com/s/ztw6qwyy22exz3l/groups_list_content.png)

#### So, why not just use Organic Groups?

The description above begs the question: Why not just use OG? In developing this feature, we considered leveraging Organic Groups. However, the relationships between Drupal user records, contacts and organizations were too complex to cleanly build this feature on top of both RedHen and Organic Groups. That said, much of the architecture of this module is based upon design patterns from Organic Groups.

## What's Next?

ThinkShout will be launching our first client sites on RedHen CRM this summer. We are currently working towards a stable 1.0 release of RedHen - while simultaneously exploring new features and tools.

We are very interested in continuing to explore:

* Deeper integration with Drupal Commerce.
* CRM data visualization - most notably geolocation and mapping of constituent data, as well as Google Charts visualization of engagement scoring data.
* Bulk import tools, as well as Migrate 2.x integration.
* Apache Solr integration.
* The development of better HTML5 and responsive themes for RedHen CRM interfaces.

We hope that the community will continue to work with us to make RedHen CRM a leading association management solution. We'll see you in the issue queues and at a Drupal Camp near you!
