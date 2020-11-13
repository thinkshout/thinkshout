---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: A mime is a terrible thing to waste
created: 1316214867
permalink: blog/2011/09/brandon/mime-terrible-thing-waste/
tags:
- Drupal Planet
- Apache Solr
- Facet API

short: One of the first projects I am working on here at ThinkShout requires full-text search of file attachments.
author: brandon
---
One of the first projects I am working on here at ThinkShout requires full-text search of file attachments. This is accomplished using the [Apache Solr Attachments](http://drupal.org/project/apachesolr_attachments) module. We're also using the [Facet API](http://drupal.org/project/facetapi) module to allow the users to filter their searches based on certain criteria or "facets".  The Facet API module provides several useful facets out-of-the-box, such as a filter by Author and by Content Type. One facet that we wanted to enable for the client's users is the ability to filter on the type of file(s) attached to a node. The Facet API module allows a developer to create filter blocks based on fields indexed by [Apache Solr Search Integration](http://drupal.org/project/apachesolr) (or in this case using Acquia Search with [Acquia Network Connector](http://drupal.org/project/acquia_connector)).  The Apache Solr Attachments module provides the mimetype of the attached file as a piece of indexed data. Creating a facet is implemented with hook\_facetapi\_facet\_info. Following the examples implemented for the default facets that ship with the module, a facet for mime type can be created by searching on the ss_filemime index field. 
~~~
function MYMODULE_facetapi_facet_info($searcher_info) {
  $facets = array();
  
  $facets['mime'] = array(
     'label' => t('Mime Type'),
     'description' => t('Filter by mime type.'),
     //indexed field from solr 
     'field' => 'ss_filemime',
     'map callback' => 'MYMODULE_map_mime',
     'facet mincount allowed' => TRUE,
     'dependency plugins' => array('bundle', 'role'),
   );
   
  return $facets;
}
~~~
This can be done for any indexed field. Once the facet is implemented it can then be enabled through the admin screen for facets, which then, in turn, provides a block for that facet. The only issue we then faced was translating the presented mime types in a human-readable format. This is done with the map callback. The map callback is a function that takes the values of the index field that can then be associated with other content. In the case of the default Author facet the uid of the content is returned. The map callback for that facet is associated with the Drupal user and returns the username. For file mime types, a simple array of mime type to readable file type was used, so that, for example, "application/vnd.ms-excel" is just returned as "Excel". 
~~~
function MYMODULE_map_mime(array $values) {
  $map = $values;
  $mimes = array(
    'application/pdf'=>'PDF',
    'application/msword'=>'Word Document',
    'application/vnd.ms-excel'=>'Excel',
  );
  $map = array();
  foreach ($mimes  as $type => $name) {
    $map[$type] = $name;
  }
  return $map;
}
~~~
