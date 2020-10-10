---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: 'RedHen in the Wild: Mission Investors Exchange'
created: 1347990060
permalink: blog/2012/09/tauno/redhen-wild-mission-investors-exchange/
tags:
- Drupal
- RedHen
- Apache Solr
- responsive design
- Drupal Planet
short: Deploying a tightly integrated consituent relationship management (CRM) system.
author: tauno
---
When Seattle based PRI Makers Network and Harvard based More for Mission decided to merge and rebrand as [Mission Investors Exchange](http://www.missioninvestors.org), ThinkShout was engaged to re-invent their combined website on Drupal 7 and deploy a tightly integrated constituent relationship management (CRM) system.  

### Background

With a growing roster of over 260 of the most influential foundations and non-profits in the U.S. and Canada, Mission Investors Exchange and ThinkShout worked closely to create a feature set that enables philanthropic innovators to exchange ideas, tools, and experiences to increase the impact of their capital. Critical features of the site include: responsive design for mobile users, an extensive resource library and investment database utilizing Apache Solr faceted search including attachment indexing and customized result displays, javascript glossary for defining terms within content, [RedHen CRM](http://www.redhencrm.com/) for membership management, and tight integration between CRM data and site content.

### Responsive design

The responsive theme was developed using [Omega](http://drupal.org/project/omega) and [LESS](http://lesscss.org).

![Desktop and mobile layouts](https://dl.dropbox.com/s/6djwng0wihxha1d/mie_mobile_desktop.png?dl=1)

### Sprucing up Apache Solr search

One of the greatest online assets of Mission Investors Exchange is their repository of articles, reports, templates, and investment records. Apache Solr was selected as the search server to allow high performance faceted searching and attachment indexing. To better customize the search experience, three search interfaces were built: sitewide search, tool/resource search, and investment search. The default Drupal/Apache Solr search experience leaves a bit to be desired when it comes to user experience, so several customizations were made across all three search interfaces.

* Render teasers instead of only showing the solr result snippet. When a keyword search is done we replace the body extract with the solr snippet that includes the highlighted keywords while maintaining all the other teaser fields. 

![Improved Solr search teasers](https://dl.dropbox.com/s/ulq2alurfgz3n06/MIE-search-teasers.png?dl=1)

* Duplicate results for attached files and the content item they are associated with is confusing to users. Indexing attachments with the content item they are associated with is possible via [a patch](http://drupal.org/node/561862#comment-6246408) to the [Apache Solr Attachments](http://drupal.org/project/apachesolr_attachments) module. 
* [Solr's StatsComponent](http://wiki.apache.org/solr/StatsComponent) is utilized to provide a lightweight sum of investment amounts.  

![Summary statistics with Solr](https://www.dropbox.com/s/dfh12gecnu15mlq/MIE-investments.png?dl=1)

* Investments from a search can be exported by feeding the selected facet and keyword values to a [Views Data Export](http://drupal.org/project/views_data_export) View.

### Defining the lingo in context

Educating the public and member foundations about the field of mission investing is made more challenging by the prevalance of technical terms and concepts. To address this, an inline glossary feature was developed that allows users to click a button to highlight defined terms within a page then click on those terms to read a definition of the term. Site content editors are able to easily add and update glossary terms as needed.

![Glossary feature](https://www.dropbox.com/s/j1l7gag1c9vrw0j/MIE-glossary-active.png?dl=1)

### RedHen CRM - Integration not needed

With a plethora of CRM solutions on the market, selecting the best solution for a given use case can be daunting. For Mission Investors Exchange, tight integration with their Drupal site, simple membership management, and room for growth were some of the key criteria used to evaluate potential solutions. Because RedHen is a native Drupal 7 CRM, no integration is necessary to connect it to a Drupal powered site. 

* Customized RedHen interface using Views, Views Data Export, and Views Bulk Operations to quickly tailor the management screens to staff needs. 

![Staff management of Organizations](https://www.dropbox.com/s/yo7kwt3njyjpv91/MIE-orgs-manage.png?dl=1)

* Site content can be related to RedHen organization records allowing for a rich display of tools, news, events, and investments associated with a given member.
* Multiple member levels can be tracked along with data about payment amounts and dates for each organization. Organizations with active memberships are automatically included in the membership directory. 

![Member directory from RedHen data](https://www.dropbox.com/s/2wtg3w5s4nyadtv/MIE-directory.png?dl=1)

* Permissions based on an organization's membership automatically flow down to contacts and their user accounts that have active associations with the member organization. Instant access control.
* Migrating member data from a Drupal 6 based site with a flat data structure to RedHen's highly flexible structure required the development of several custom migration classes to handle relations and RedHen entities.

### Coming soon…

One of the great strengths of using a native Drupal CRM solution is being able to base site business logic on CRM data. To this end, paid event registration using [Registration](http://drupal.org/project/registration) and [Commerce Registration](http://drupal.org/project/commerce_registration) with support for pricing based on membership levels is currently in development. Other planned enhancements focus on improving the content discovery process for Mission Investors Exchange members.
