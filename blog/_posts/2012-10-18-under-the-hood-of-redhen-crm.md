---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: Under the Hood of RedHen CRM
created: 1350587835
permalink: blog/2012/10/lev/under-hood-redhen-crm/
tags:
- RedHen
- Drupal Planet
- Drupal Give
short: The ThinkShout team will be at the Pacific Northwest Drupal Summit if anyone wants to connect.
author: lev
---
*RedHen CRM is one of many great stories featured in the [Linux Journal's recent Drupal special addition](http://www.linuxjournal.com/content/drupal-special-edition). RedHen just laid a [beta3 release](http://drupal.org/node/1816026) and the ThinkShout team will be at the [Pacific Northwest Drupal Summit](http://2012.pnwdrupalsummit.org/) if anyone wants to connect.*

This is the 5th in a [series of articles exploring RedHen](/blog/category/redhen), ThinkShout's native Drupal 7 CRM platform. ThinkShout initially designed [RedHen CRM](http://drupal.org/project/redhen) around the complex [association management](http://en.wikipedia.org/wiki/Association_management_system) (AMS) needs of nonprofits and trade associations. These association management requirements go well beyond the standard needs of most CRM/CMS solutions. However, in building an abstract tool with these needs at the forefront, our goal has been to future proof RedHen CRM as much as possible to ensure that its architecture can accommodate a wide variety of use cases.

RedHen CRM is similar to [Drupal Commerce](http://drupal.org/project/commerce) in its modular structure. As with Drupal Commerce, the core RedHen modules that can be downloaded on the Drupal.org project page won't provide you with a working CRM right out of the box. RedHen is intended to provide developers and site builders with the building blocks for quickly creating their own CRM data models that map to their particular business requirements and workflow. Consequently, setting up a new RedHen CRM instance does require configuration.

In the future, ThinkShout is likely to release RedHen "Features" or "Apps" that provide prepackaged CRM solutions for different use cases. At the time of the publication of this article, we know of more than 70 RedHen CRM solutions built by other Drupal developers and site builders.

In addition to its association management uses, we see RedHen CRM as an ideal starting point for building custom sales pipeline management tools and project management applications, as well as Drupal integration points with 3rd-party ERP (enterprise resource planning) tools and financial accounting packages.
<!--break-->
## Project Structure

RedHen CRM consists of a core module containing shared APIs and interfaces and a collection of feature specific sub-modules, including:

* Contact (redhen_contact): Contact entities and APIs, along with integration with Drupal users.
* Fields (redhen_fields): Custom field types used by RedHen entities. Currently includes a unique email field, which assigns attributes to emails, such primary, bulk, and custom labels (home, work, etc).
* Organization (redhen_org): Organization entities and APIs.
* Organization Group (redhen_group): Lightweight group feature which turns organizations into containers for private content with a broadcast system.
* Relations (redhen_relation): The Relation module allows connections between contacts and organizations.
* Note (redhen_note): Notes on contacts and organizations.
* Engagement (redhen_engagement): Engagement scoring system and APIs. RedHen Note integration is included, as well as Rules integration for popular modules such as Comment, Registration, and Webform.
* Registration (redhen_registration): Integration with the Entity Registration module.
* Activity (redhen_activity): Activity logging based on the [Message](http://drupal.org/project/message) module.

We maintain other functionality that is not needed for all uses cases in separate projects in order to keep the core RedHen code base as lean as possible. The [RedHen Membership](http://drupal.org/project/redhen_membership) system is our most widely used RedHen component with its own project name space. It handles individual and organizational membership subscriptions. As with Drupal Commerce, key sub-modules will continue to be included with the main module code base. However, we anticipate that as the RedHen CRM developer community grows, we will see more and more contributed modules that extend RedHen's core feature set.

The overall architecture of RedHen CRM consists of a set of minimalistic building blocks that developers and site builders can use to develop solutions tailored to specific use cases. Like Drupal Commerce, RedHen relies on Drupal distributions and installation profiles for the heavy lifting of fleshing out polished applications that serve specific needs. [Nedjo Rogers](http://drupal.org/user/4481) of [Chocolate Lily](http://chocolatelilyweb.ca/) has incorporated RedHen into [Open Outreach](http://openoutreach.org/), 
> a Drupal distribution for nonprofit & grassroots groups

and ThinkShout has released it's own demonstration of RedHen in the form of a [distribution to server the needs of a fictional pet shelter association](http://drupal.org/project/redhen_demo).

## Module Dependences

RedHen has minimal dependencies on other Drupal contributed modules, striving for a balance between relying on its own code base and leveraging other code where it makes the most sense. Beyond Drupal core, RedHen CRM currently depends only on Entity API, discussed in detail below, and the [Relation](http://drupal.org/project/relation) module for managing connections. Additionally, RedHen Activity is based on the [Message module](http://drupal.org/project/message) which, by the way, does a great job of balancing a lean extendable base while still remaining accessible to site builders. RedHen CRM *supports* integration with popular contributed tools, like Views and Rules, but these modules are not *required*. This makes RedHen a lean and stable application platform, as it relies less on a shifting foundation of other contributed modules over which we have little to no control.

This centrist approach helps assure other Drupal developers that their customizations and extensions of RedHen won't break due to fragile module interdependencies. At the same time, it provides less-technical site builders with a known approach to extending RedHen CRM with standard Drupal tools, such as Views, Rules, and the Fields API.

## Custom Entities

RedHen CRM relies on custom Drupal entity types and bundles. It leans heavily on [Entity API](http://drupal.org/project/entity), a wrapper around Drupal's core entity system that eases developing entities in several ways. The Entity API module:

* Provides classes and controllers to streamline entity creation and management. RedHen extends these base classes as needed.
* Eases integration with key contributed modules, namely [Views](http://drupal.org/project/views) and [Rules](http://drupal.org/project/rules).
* Exposes standardized API hooks during CRUD operations providing a consistent interface for other modules to interface with your custom entities.
* Provides hooks and data structures allowing for entities to be exported, for example, using Features or CTools. RedHen leverages this feature to make entity bundle definitions, E.g., types of contacts and organizations, exportable.

On a site note, Entity API has 133,647 reported installs all on Drupal 7 and is among the top 20 modules on Drupal.org. As Drupal dependencies go, it is highly stable and reliable.

RedHen ships with the following entity types, each of which come bundled with core properties and can be extended with additional user-defined fields.

* Contacts
* Organizations
* Notes
* Memberships (part of RedHen Membership)
* Engagements

## Connections
A key feature of any CRM is managing connections between organizations and contacts. RedHen features a very flexible connection system built on top of the Relation module, which allows for bidirectional connections between arbitrary types of entities. These relationships themselves can have additional user-defined *fields*. RedHen ships with two types of relationships: [ital]Affiliations[ital], which are connections between an organization and a contact, and *Personal Connections*, which are connections between contacts. These relationships come bundled with status and role properties, but fields can be added that are applicable to a given relationship.

For example, imagine that you want to define a relationship between a contact of the type "Staff" and an organization of the type "Company." Suppose you want to include information about the position that contact has at that organization. This field value only has meaning within the context of relationship, and therefore this data is stored with the relationship rather than on the contact record or the organization record itself.

![Connections]({{ site.baseurl }}/assets/images/blog/redhen-connections.png)
Listing of a contact's connections


## Playing well in the Drupal sandbox
RedHen's default listings of contacts are a good start, but the fun really starts if you want to create your own custom views. The venerable Views module, a powerful graphical query builder, is the gold standard in Drupal for creating custom "lists of stuff," including RedHen entities. Much of the heavy lifting involved in Views integration is handled by Entity API, but any module implementing the Entity API interfaces still needs to clarify the data types of all entity properties and provide Views handlers for any non-standard data. For example, organization entities have a primary contact associated with them and it's up to RedHen to explain to Views that the related contact id within an organization record is actually a RedHen contact. Let's create a new View adding additional fields and relationships to our standard list of contacts:

1.  Create a new view at /admin/structure/views/add of Contacts.
2.  Add relationships to Memberships and Organization affiliation.
3.  Add the following fields: Contact first and last name, contact email (change the formatter to primary email), membership name, and organization name.

You now have a View of all contacts that includes their membership and organization. If you set the path of the View to /redhen/contact, it will simply override the default contacts listing, or you can move it elsewhere to maintain both interfaces.

![Custom RedHen View]({{ site.baseurl }}/assets/images/blog/redhen-views.png)
Custom contact view with an address and exposed filters.

Similarly, business rules can be extended using the Rules module, which provides an interface for defining logic based upon a trigger->action model. RedHen again leans on Entity API to expose RedHen entities into this model so that you can, for example, send an email to a contact when a related membership entity is updated.

![screenshot]({{ site.baseurl }}/assets/images/blog/redhen-rules.png)
Custom Rule that demonstrates sending an email to new contacts.

## Extending core functionality
RedHen can also be extended and customized the old fashioned way -- by writing custom code. All of RedHen's entity types feature APIs with standard CRUD operations and wrappers around many common tasks, such as getting all related entities. In addition, RedHen can be manipulated using Drupal's hook system. Each entity can be altered using a hook implementation when it's loaded, created, updated, and deleted. Most of hooks are exposed through Entity API's inherited controller classes, but RedHen features some of its own unique hooks as explained in redhen.api.php. For example, a module can dictate whether or not a contact entity can be deleted by implementing hook_redhen_contact_can_delete():

~~~php
function mymodule_redhen_contact_can_delete(RedhenContact $contact) {
  // prevent the deletion of active contacts
  if ($contact->redhen_state == REDHEN_STATE_ACTIVE) {
    return FALSE;
  }
}
~~~

In addition, all of RedHen's main interfaces are wrapped in theme functions so they can be overridden at the theme level. For example, to alter the default list of contacts, implement `theme_redhen_contact_list()`:

~~~php
function mytheme_redhen_contact_list($variables) {
  $contacts = $variables['contacts'];
  $header = $variables['header'];
  if (!empty($contacts)) {
    $rows = array();
    foreach ($contacts as $contact) {
      $uri = entity_uri('redhen_contact', $contact);
      $actions = array(
        l(t('edit'), $uri['path'] . '/view/edit', array('query' => drupal_get_destination())),
        l(t('delete'), $uri['path'] . '/view/delete', array('query' => drupal_get_destination())),
      );

      $redhen_contact_type = redhen_contact_type_load($contact->type);
      $rows[] = array(
        'data' => array(
          $redhen_contact_type->label,
          l($contact->first_name, $uri['path']),
          l($contact->last_name, $uri['path']),
          l($contact->email, 'mailto:' . $contact->email),
          format_date($contact->updated, 'short'),
          implode(' | ', $actions)
        )
      );
    }

    $render['table'] = array(
      '#theme' => 'table',
      '#header' => $header,
      '#rows' => $rows
    );
    $render['pager'] = array(
      '#theme' => 'pager',
    );
  }
  else {
    // no results, set a message
    $render['no-result'] = array(
      '#type' => 'markup',
      '#markup' => t('Sorry, there are no contacts that match your criteria.'),
    );
  }

  return render($render);
}
~~~

In short, using RedHen's comprehensive APIs, hooks, and theme wrappers, a developer can build a complex, elegant solution to meet nearly any use case requiring CRM functionality.
