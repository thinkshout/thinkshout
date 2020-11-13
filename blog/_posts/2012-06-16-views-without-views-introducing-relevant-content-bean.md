---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: Introducing the Relevant Content Bean
created: 1339869087
permalink: blog/2012/06/sean/introducing-relevant-content-bean/
tags:
- modules
- Drupal Give
- Drupal Planet

short: Allow site admins to create their own dynamically-filtered listings of node content in a block.
author: sean
---
Have you ever wished that there was a simpler solution for allowing site adminstrators to create their own dynamically-filtered listings of node content in a block? Of course, you can very quickly create such listings with Views, but the Views approach presents certain tradeoffs that aren't always idea for sites managed by non-developers. In our experience, the tradeoffs of site administers using Views often include the following:

* Views can present a steep learning curve to site administrators.
* Managing small variations in the block displays of a View (such as blocks with different item counts or different block titles) can lead to very large Views definitions.
* Providing a site administrator with Views access can sometimes lead to deep, unintended changes in your site's presentation layer.
* Accounting for all of the possible variations in the Views display layout, particularly with Views that leverage "fields" rather than "view modes", can lead to a lot of extra theming.
* When managing Views definitions in code with Features, dealing with Views that keep getting overridden in the GUI can be a challenge.

*What if there was a simple solution for allowing site administrators to create their own dynamically-filtered listings of node content without the tradeoffs of opening up the Views UI?*

## Enter "Relevant Content Bean"

The [Relevant Content Bean](http://drupal.org/project/bean_relevant) module is a plugin for the awesome [Bean](http://drupal.org/project/bean) module. If you've unfamiliar Bean, it basically provides a way to treat blocks as fieldable entities. ("Bean" is an acronym for **B**lock **E**ntities **A**ren't **N**odes.) The Bean module also provides an API for creating new *types* of blocks, which can have their own properties and fields.

The Relevent Content Bean essentially provides your site administrators with a light-weight query builder (build on top of EntityFieldQuery) for creating blocks that contain dynamically-filtered listings of nodes. Like Views, Relevant Content Bean allows you to select the number of node results to display, apply filters to the list of returned nodes, change the display options for these nodes, and manage the sort order of your results.

## How It Works

A screenshot of the default Relevant Content Bean configuration screen is shown below:

![full screenshot](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/bean_empty.png)

### View Modes and Fields

First, the Relevant Cotent Bean itself can leverage "view modes."

![view modes](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/view_mode.png)

For developers, this means that you can write your own view modes to create different display options for the overall listing of nodes.

Since Relevent Content Beans themselves are fieldable, you can even extend these Beans to include options, such as custom "Read More" links (using the [Link](http://drupal.org/project/link) module) or content areas above and below the node listing returned by the Bean itself.

### Display Options

Second, you can manage the "display options" for the individual nodes returned by the Bean.

![display options](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/node_display.png)

The returned list of nodes can be presented as "teasers" or any other view mode defined for your content types. In addition to selecting among view modes, Relevant Content Bean provides an option for simply displaying a list of "linked node titles."

### Sort Options

Here's where Relevant Content Bean gets really interesting… As with Views, you can sort the returned list of nodes by creation date or the date that each node was last updated. Similarly, you can sort on the "sticky" property.

![order nodes](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/order_on.png)

But check this out:

![date filter](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/order_on_any_date.png)

You can actually sort the returned nodes on *any* date property or field available to each content type. In the example above, we have two content types:

* A "publication" content type with a "publication date" field that accepts a month and year.
* An "event" contenty type with an "event date" field that accepts a month, date, year, and time.

In this example, you can use the Relevant Content Bean to create a listing of publication and events nodes - sorting this *single* listing of nodes by different date fields.

### Filter Options

Relevant Content Bean also allows you to filter your listing of nodes by content type, taxonomy, and/or various date range options. When filtering by content type or taxonomy, you have the option of specifying which content types or taxonomy terms to return.

![](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/filter_content_type_not_same.png)

![](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/taxonomy_filter.png)

Or, you can configure your bean to **contextually** filter nodes based upon the type and terms associated with a full-page node upon which your bean has been placed. (Think "argument handling" with block displays in Views.)

![](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/filter_content_type_same.png)

Similar to our sort options, you can also filter the returned listing of nodes based upon a date relative to any date property or field found on each content type.

![](https://dl.dropbox.com/u/17914943/relevant_bean_screenshots/date_filter.png)

## Other Coolness

The Relevant Content Bean module has quickly become a staple on all of our custom Drupal builds - as we continually find more and more interesting use cases for it. For example:

* We've had clients create placeholder nodes and then drop a Relevant Content Bean into the page to minic full-page Views displays.
* Writing our own custom Bean view modes, we can return a list of nodes as a javascript slideshow.

And because Relevant Content Bean returns nodes using view modes, on sites that also use Views for returning node listings, we can use the same theme styles across node listings - regardless of whether those listings are generated by Relevant Content Beans or Views.

## In Conclusion

We'd encourage you to give the Relevant Content Bean module a try. We'd love to get your feedback and talk more about how we can make it even easier on site administrators to customize block content.

And special thanks for ThinkShout developer, [Brandon Lee](/blog/Brandon), for writing this great module!
