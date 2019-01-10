---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: OpenLayers Love for Drupal 7
created: 1315413565
permalink: blog/2011/09/lev/openlayers-love-drupal-7/
tags:
- Drupal
- Drupal Planet
- mapping
- modules

short: Mapping has become a significant component of many of ThinkShout's projects over the last couple years.
author: lev
---
<img src="https://drupal.org/files/images/openlayers_monster.thumbnail.png" title="OpenLayers" style="float:left; margin:0 10px 0 0" />
Mapping has become a significant component of many of ThinkShout's projects over the last couple years, included on sites such as [Save Our Gulf](http://saveourgulf.org), [James River Association](http://map.jrava.org), and the [Lower Columbia River Estuary Partnership](http://maps.lcrep.org) . The tools we use are constantly evolving. For example, we recently launched a [bacteria monitoring site for Blue Water Baltimore](http://bacteria.thinkshoutlabs.com/) (note, staging site) using [Cloudmade](http://cloudmade.com)'s [Leaflet](http://leaflet.cloudmade.com) and an accompanying [Drupal module](http://drupal.org/project/leaflet) of the same name. But the [OpenLayers map scripting library](http://openlayers.org) and [Drupal module](http://drupal.org/project/openlayers) have been sophisticated mainstays. During that time, we've contributed a few of our own add-ons to meet our client's needs, namely [OpenLayers Field](http://drupal.org/project/openlayers_field), [OpenLayers KML Layer](http://drupal.org/project/openlayers_kml_layer), and [OpenLayers Taxonomy](http://drupal.org/project/openlayers_taxonomy). The first is a new module for Drupal 7's field system and the latter 2 were originally built for D6 and just ported to D7. We worked with the esteemed [Alan Palazzolo](http://drupal.org/user/147331), current maintainer of flagship OpenLayers's module, on all 3 projects, which now have beta releases.
<!--break-->
## OpenLayers Field
Expose available OpenLayers presets as a field and then display the map when viewing an entity. Yes, it's that simple. As an added bonus, you can export OL presets into your [Features](http://drupal.org/project/features) along with the field definitions to create a neat and tidy package.

## OpenLayers KML Layer
Allows users to create a map layer from an uploaded KML file and associate it with one or more map presets. The settings are exposed through a file field widget where you can specify if a new layer should be created and which map preset to associate it with. The module also includes a file field display formatter where users can select a map preset to to show the kml layer on. So there are really two ways to use this module. One as a way to generally upload kml files and show them on a given map preset and two as way to have an entity field that will allow users to upload kml data and show it on a map.

## OpenLayers Taxonomy
Creates a map layer for each term in a configured vocabulary. The map features for each layer are rendered by an OpenLayers data view display that accepts the taxonomy term as an argument. The module defines a new OpenLayers layer type, _openlayers_taxonomy_vector_, and when a new term is added in a given vocabulary, a new layer is created for it. These layers are then made available through the standard OL preset interface and can be placed on any map. Particularly useful for filtering map features based on taxonomy terms. You can see it in action on the [James River Association](http://map.jrava.org) site.
