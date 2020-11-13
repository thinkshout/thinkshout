---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

published: true
featured: false
short: "How we used pre-filtered search on Families USA's site to engage everyone."
author: alex
title: "Engaging variable audiences with pre-filtered search"
---

<img href="https://familiesusa.org" src="https://familiesusa.org/sites/default/files/hero_images/FamiliesUSA-share-icon.png"  style="float: right; margin: 20px" /><br>
[Families USA](http://www.familiesusa.org) is a leader in the national dialogue on affordable health care for all Americans.

Historical expertise and strong results in consumer health care advocacy have given Families USA a solid reputation and credibility with Policymakers, the Media, and Partnering Organizations. However, as the dialog surrounding healthcare advocacy continues to expand, Families USA needed to be able to effectively communicate its brand and credibility to a new, broader audience...and this is where we came in.

## Engaging variable audiences - complexity cloaked in simplicity##
We had the challenge of engaging two very different sets of constituents:

* **General public**: users with less topical knowledge that find Families USA because of a curiosity about an issue and a desire to learn more.
* **Policymakers, the Media, & Partnering Organizations**: users with high levels of topic knowledge and inﬂuence look to Families USA for information to support their work.

To achieve this at a high level, for example when either type of constituent visits the site home page, we present [key issues](http://www.familiesusa.org/issues) surrounding healthcare in a way that is easily accessible to the general public while also providing a [powerful search tool](http://www.familiesusa.org/library) that levereges [Apache Solr](https://lucene.apache.org/solr) to allow experts to quickly and easily find topic specific information.

Additionally, on more specific content pages, we provide simple, yet powerful links between the user-friendly content page and the resource library search tool by using a pre-filtered search technique. For example when a constituent happens upon [a published resource](http://familiesusa.org/product/get-ready-get-health-coverage) via social media they can activate a pre-filtered search for the Key Issue or Topic the resource addresses by clicking on the link to the Key Issue or Topic available just below the page content.

This allows the general public to learn more about an issue quickly and easily, while allowing higher level users to dig deeper with the same quickness and ease.

## Technical details##
We created our search tool using Drupal's [Search API module] (https://drupal.org/project/search_api) and used [Apache Solr](https://drupal.org/project/search_api_solr) to achieve the high-performance search engine capabilities we wanted to deliver.

From there, to implement a pre-filtered search, we first indexed and then enabled the Entity and Taxonomy Term Reference fields we wanted to be able to filter on as Facets. Next we placed the Facet blocks on the search page using the [Context module](https://drupal.org/project/context). These exposed blocks allowed us to filter the results on the search page based on their Entity Reference and/or Term Reference field values and layed the groundwork for being able to pre-populate the blocks by invoking specific URLs.

![Entity Reference field linked to pre-filtered search using tokenized text]({{ site.baseurl }}/assets/images/blog/link_with_tokenized_text_for_prefiltered_search.png)

In order to generate these specific URLs and expose them in a user-friendly way we used the tokenized text field formatter to display the Entity or Term label as a link to a pre-filtered search based on the entity or term id, respectively:

![Entity Reference field linked to pre-filtered search using tokenized text]({{ site.baseurl }}/assets/images/blog/tokenized_text_screenshot.png)

The end result is a seamless jump between a specific piece of content and a powerful search tool that can be used to retrieve similar, more refined content.
