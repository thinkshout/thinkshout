---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: Salesforce Integration with REST, OAUTH, and Entities
created: 1353965347
permalink: blog/2012/11/lev/salesforce-rest-oauth/
tags:
- Drupal Planet
- Salesforce
- modules
short: The Drupal Salesforce Suite has been around since Drupal 5, having undergone many transformations in trying to keep pace with both Drupal and Salesforce API changes. The result is a feature set as impressive as it is ambitious, although the incremental updates and additions have come at a cost of significant technical debt, inconsistent API usage, a monolithic architecture, and fragility.
author: lev
---
<img src="https://www.sfdcstatic.com/common/assets/img/logo-company.png" alt="Salesforce logo" style="float:left; margin:0 10px 10px 0 " /> 
The [Drupal Salesforce Suite](http://drupal.org/project/salesforce) has been around since Drupal 5, having undergone many transformations in trying to keep pace with both Drupal and Salesforce API changes. The result is a feature set as impressive as it is ambitious, although the incremental updates and additions have come at a cost of significant technical debt, inconsistent API usage, a monolithic architecture, and fragility.

ThinkShout, not being strangers to major rewrites, [even of our own modules](/blog/2011/06/lev/mailchimp-20-anatomy-drupal-module-rewrite), and driven by our need to integrate Salesforce with our native Drupal CRM, [RedHen](http://drupal.org/project/redhen), undertook the challenge to completely rewrite the Salesforce suite this fall.

## Why a rewrite?
* The current modules uses the [SOAP API](http://www.salesforce.com/us/developer/docs/api/index.htm) and depends on the external [PHP Toolkit library](http://wiki.developerforce.com/page/Force.com_Toolkit_for_PHP). We wanted to leverage the much lighter weight, real time, [REST API](http://www.salesforce.com/us/developer/docs/api_rest/index.htm).
* The REST API uses [OAuth 2.0](http://oauth.net/2/) for authorization, which is more secure and flexible than providing a username and password.
* Legacy code dating back to Drupal 5, E.g., inline SQL in some cases, DBTNG in others.
* Our preference for treating custom data models as entities. There's an argument to be made that any custom data schema should be bolted on top of the Entity System.
* Redesign the suite with a lean, modular architecture allowing the module to be used by developers for a wide variety of uses cases without the need to take unused code along for the ride.
* The current mapping scheme was entity and field specific, with the module actually listing out available properties for nodes, users, etc. Aside from being difficult to maintain, it made synchronizing custom entities, which are critical in the Drupal eco system, nearly impossible. We decide to use Entity API's metadata wrappers instead, see below!

## Collaboration
We started by reaching out to the current module maintainers to better understand the state of the module, it's roadmap, if any, and the current teams involvement, as well as to feel out their interest in participating in a rewrite. The entire team, [kostajh](http://drupal.org/user/209141) in particular, has been very receptive and helpful, and we eventually agreed that ThinkShout would do the rewrite in a new branch, 7.x-3.x, in the current project. There was talk of collaboration, but busy schedules and priorities got in the way as they often do and we're approaching an MVP release on our own. <s>The maintainers gave ThinkShout access to the repository and project page, but not administrative control over the repository, understandably. That put us in a minor bind, however, as we are committing many hundreds of hours to a project we don't have any control over. As a result, we're developing the project on [GitHub](https://github.com/thinkshout/salesforce) and mirroring the code to [7.x-3.x branch on Drupal.org](http://drupalcode.org/project/salesforce.git/tree/refs/heads/7.x-3.x). This will likely change, but that's our plan for now</s>. UPDATE: Project development is now taking place on Drupal.org, although we'll continue mirroring to GitHub.

## Core features
1. OAuth 2.0 authorization
2. Object oriented REST API wrapper for use within Drupal.
3. Drupal entity and Salesforce object mapping system
    * Field level mappings, including granular directionality and support for external keys.
    * Map Drupal bundles to Salesforce record types.
    * Select per mapping trigger points, E.g., Drupal entity create, Salesforce object update, etc.
    * Select batch or realtime processing per mapping.
4. Push Drupal entities to Salesforce.
5. Pull Salesforce objects into Drupal.
6. Lightweight wrapper around the SOAP API when needed, using the same OAuth authorization.

In addition, with the systems modular OO design, we are laying the groundwork for a contrib ecosystem to handle more specific needs like Webform integration and lead generation. And, of course, developers can use the module as a starting point for their own solutions, be it importing Drupal users as contacts, lead generation through blog comments, etc.

## Architecture
### API selection and OAuth
Salesforce provides a veritable alphabet soup of API options, including SOAP, bulk, meta, streaming, apex, and REST. In their own words, the REST API is the best choice for "mobile applications and Web projects". Well, Drupal is certainly a web platform, so we figured that's the right place to start. In addition, we found the REST API provided the following benefits:

* Small foot print and no dependency on the complex PHP Toolkit, which needs to be installed and maintained to use the SOAP API.
* Stop talking about WSDLs, specifically whether you need a client or parter wsdl. That all feels very 10 years ago.
* Fast.
* Realtime. In our testing, changes made to Salesforce using the REST API where instantaneous, whereas SOAP changes took some time to propagate to the Salesforce instance.

<img src="https://raw.github.com/aaronpk/oauth.net/master/images/oauth-2-sm.png" alt="oauth 2" style="float:right; margin:0 0 10px 10px " />
In addition, the REST API allows, or rather requires, the use of [OAuath 2.0](http://oauth.net/2/)  for authorization. While not perfect, the OAuth flow is more secure and flexible than providing a single username and password. The OAuth process, in short:

1. Create a remote application within the Salesforce instance. The callback URL must be in the format *https://mydrupalsite.com/salesforce/oauch_callback*. Obviously replace *mydrupalsite.com* with the url of the site being integrated with Salesforce. Also note that HTTPS is *required* for a secure authorization to take place. Yes, that means this module will not work on sites that don't support HTTPS.
2. Obtain the consumer key and secret from the remote application created in step 1 and enter it in the authorization form. Click the authorize button.
![authorization form](/sites/default/files/images/inline/salesforce-authorize-2.png)
3. This will initiate 2 requests to Salesforce. The first redirects the user to Salesforce, sending along the consumer key and callback URL. If the user authorizes the remote application, the same one created in step 1, in our case a Drupal site, Salesforce responds with an authorization code.
4. The Module then sends another request to Salesforce with the authorization code obtained in step 3, along with the consumer key, secret, and callback URL, and gets a response containing a refresh token and API instance URL.
5. The refresh token is used to obtain an ephermal access token, analogous to a session ID, which is used to access the REST resources. The access token is actually only stored in session storage to emphasize it's temporary nature and a new one is obtained when the access token expires on the Salesforce side or the Drupal session ends. There's certainly room for improvement in this process, but it seems to work for now.

As of writing, the Drupal OAuth module, which we preferred to leverage, did not yet support the OAuth 2.0 specification, so we were forced to go on our own. If/when a stable OAuth 2.0 library is released within Drupal, we'd certainly rather take advantage of that then reinvent any wheels.

### Submodules
* Salesforce: OAuth authorization and wrapper around the Salesforce REST API in the form of an extendable class.
* Salesforce Mapping: Allows for mapping Drupal Entities and Salesforce objets as a custom entity. It also manages the connection between Drupal entities and Salesforce objects as another custom entity. If a connection exists, it is loaded and displayed with the linked entity and used to determine if data should be updated or created.
* Salesforce Push: Pushes Drupal data to Salesforce when defined triggers occur, either in real time or in a brach process.
* Salesforce Pull: Pulls Salesforce objects into Drupal when defined triggers occur. Salesforce is queried for any changes to objects that are mapped to a Drupal entity and loaded into a queue for processing. By it's nature, importing Salesforce data is an asynchronous, batch process. We explored leveraging Salesforce's outbound notification system to enable realtime updates, but found that approach untenable, namely due to the inability to throttle the number of outbound messages coming from Salesforce and the difficult in configuring those messages.
* Salesforce SOAP: A lightweight module to wrap the Salesforce SOAP API. It manages the dependency and loading of the PHP Toolkit and extends the partner and enterprise clients so they can authenticate using the OAUTH2 access token.

### Entity API metadata wrappers
Are, simply put, awesome. The [Entity API](http://drupal.org/project/entity) metadata wrappers provided a silky smooth unified process for getting and setting an entity’s fields and properties. To demonstrate, this little snippet of code handles the mapping of Drupal data to Salesforce for some 90% of use cases,
<?php
$drupal_fields_array = explode(':', $fieldmap['drupal_field']['fieldmap_value']);
$parent = $entity_wrapper;
foreach ($drupal_fields_array as $drupal_field) {
  if ($parent instanceof EntityListWrapper) {
    // First list<> types, get the property from the first item
    $child_wrapper = $parent->get(0)->{$drupal_field};
  }
  else {
    $child_wrapper = $parent->{$drupal_field};
  }
  $parent = $child_wrapper;
}

$value = $child_wrapper->value();
?>

Similiarly, when importing Salesforce data, we can set entity values like this,
<?php
$drupal_fields_array = explode(':', $field_map['drupal_field']['fieldmap_value']);
$parent = $entity_wrapper;
foreach ($drupal_fields_array as $drupal_field) {
  if ($parent instanceof EntityListWrapper) {
   $child_wrapper = $parent->get(0)->{$drupal_field};
  }
  else {
    $child_wrapper = $parent->{$drupal_field};
  }
  $parent = $child_wrapper;
}
$fieldmap_type = salesforce_mapping_get_fieldmap_types($field_map['drupal_field']['fieldmap_type']);
$value = call_user_func($fieldmap_type['pull_value_callback'], $parent, $sf_object, $field_map);

// Allow this value to be altered before assigning to the entity.
drupal_alter('salesforce_pull_entity_value', $value, $field_map, $sf_object);
if (isset($value)) {
  if ($parent instanceof EntityListWrapper) {
    $parent->offsetSet(0, $value);
  }
  else {
    $parent->set($value);
  }
}
?>

### Field mappings
Salesforce field mappings are the configuraiton that guides how Salesforce objects and Drupal entities are syncronized. Highlihts include:

* Fully exportable custom entity type.
* Map a Drupal entity type and bundle to a Salesforce object and record type.
* Create one or more field level mappings (see below) based on the selected bundles and record types.
* Specify the triggers points for syncronizing data.
* Process the data in realtime or via a batch process.
* Mappings are weighted so that related entities can be processed in the right order.
![Mappings list](/sites/default/files/images/inline/salesforce-mappings-list.png)

### Flexible fieldmap type system
When mapping fields, we needed a flexible system to handle different type of data mappings and how to derive the correct values. We modeled the fieldmap type system very loosely after Drupal entity definition hooks. Any module can implement <code>hook_salesforce_mapping_fieldmap_type()</code> to define a type of field mapping. The module ships with 4 fieldmap types:

* Property (or field)
* Token
* Constant
* Related entity (E.g., Relation, Entity Reference)

Each fieldmap type must define:

* label
* FAPI field type
* description
* options callback (optional)
* validation callback (optional)
* push and pull value callbacks

A fieldmap type definition will look like this,
<?php
/**
 * Implements hook_salesforce_mapping_fieldmap_type().
 */
function salesforce_mapping_salesforce_mapping_fieldmap_type() {
  $types = array(
    'property' => array(
      'label' => t('Properties'),
      'field_type' => 'select',
      'description' => t('Select a Drupal field or property to map to a Salesforce field. Related are left out and should be handled using another fieldmap type like tokens.'),
      'options_callback' => 'salesforce_mapping_property_fieldmap_options',
      'push_value_callback' => 'salesforce_mapping_property_fieldmap_push_value',
      'pull_value_callback' => 'salesforce_mapping_property_fieldmap_pull_value',
      'validation_callback' => 'salesforce_mapping_property_validation',
    ),
  );

  return $types;
}
?>

The fieldmap UI allows an admin to select a fieldmap type which then presents either a list of options, E.g. a list of fields and properties in the case of a Property fieldmap type, or a textbox, E.g., for Tokens. After passing an optional validation step, the value is saved with the field mapping. When data is synced, the push or pull value callback is used to get the correct value. We're hopeful this approach will provide the right balance between flexibility and out of the box utility in mapping simple and complex data structures.

![field mappings](/sites/default/files/images/inline/salesforce-field-mappings-2.png)

## Where things are heading
We'll be launching several sites before years using the new version of the Salesforce module and are including it in a private distribution we've developed for the [Forum of Regional Associations of Grantmakers](http://www.givingforum.org/), who have generously sponsored the initial development, and we already feel it's alpha quality and at the "MVP" stage. There are certain to be lots of bugs, and perhaps even major API changes, but that's to be expected for a project of this complexity and with a such a wide array of use cases. We're hoping to engage even more with the community at this time to gather architectural feedback and help work out the kinks. 

Salesforce is a very widely used, powerful platform, and having a canonical, robust Drupal integration is a major win for the entire community. We're hopeful this is a good starting point to achieve that goal.
