---
title: Oregon Zoo Small Actions
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

author: david
published: true
featured: false
short: We created an "action portal" for the Oregon Metro Zoo in Portland. Here's how.
tags:
- social
- sharing
- Facebook
- views
- wildlife
- conservation
- sustainability
- zoo
- Oregon Zoo
- Drupal Planet
date: 2014-12-12 16:00:00
---

## Oregon Zoo: Small Actions

The Oregon Zoo in Portland approached us to develop an action portal component for their Drupal web site. The action portal is a tool that suggests real-world actions that anyone can take to help wildlife survive and flourish. A social sharing component is important for spreading these tips organically. Pun intended. Like wildflowers.

Many sites integrate social sharing, but there are a couple of things that make the Zoo's action portal different. The main difference is that by sharing an action, you are saying that you've actually done that action in the real world, and you are encouraging your friends and followers to take the same action. The aim is not just to generate site traffic, but rather to encourage people to make real change that has a tangible impact on wildlife. Also, the shared content is more personalized, since it's a combination of a single species and the action that you've taken, plus custom messaging the visitor would like to add.

![action page](/assets/images/blog/zoo-action-portal-action-page-fsc.png)

The original intent was to enable visitors to share an action on several social channels: Facebook, Twitter, etc. During technical planning, it was decided that Facebook alone would be the best place to start. We would integrate directly with Facebook and track the shares internally with a custom integration code interacting with Facebook's API.

When we began implementation, we spent a little more time exploring options for sharing on multiple channels, compared to Facebook only. There would be a couple of benefits of sharing directly on Facebook. Using their API would pave the way for deeper integration in the future, taking advantage of Open Graph properties as a starting point. We would have better control over messaging, and we would have complete control over how logging happens in Drupal. And I must say, the Facebook developer documentation is top notch.

But adding the ability later to share on other social networks would require additional API integration for each site. We wanted to consider paving a clearer path forward, so we looked into existing services for sharing on multiple sites. There are many: Gigya, AddThis, ShareThis, and more. For something to work for us, it would need to be free or very inexpensive, allow us to customize the shared message, and provide some statistics, mainly for a share count to display on the site. The ShareThis service ended up working best for us. When using any of these services, there is less control over how shares are logged.

![chimpanzee page](/assets/images/blog/zoo-action-portal-species-page-chimp.png)

We presented the client with these options along with the pros & cons of each and, ultimately, it was decided that we'd use [ShareThis](http://www.sharethis.com/). Having approximate share counts was an acceptable tradeoff in exchange for the benefit of being able to share to multiple social networks.

So, back to how we actually did this...

Structurally, we started with two content types: Action (for the action we want people to take) and Animal (Species that relate to the actions). These each have mostly common field types, such as image and body text.

On the Action content type, we added an Animals entityreference field in order to make the connection between the two content types.

![landing page](/assets/images/blog/zoo-action-portal-landing-page-species.png)

There are three new pages for this feature: the main landing page, the animal detail page, and the action detail page. We created an Animals view for the landing page and action detail page, and we created an Actions view also for the Explore by Action tab of the landing page and for the animal detail page. For the tabs on the landing page, we created a simple block using `hook_block_info()` and `hook_block_view()`.

Something that's easy to miss when initially planning lists of things is how sorting should be controlled. Since an action references multiple animals, we use that order for displaying animals on the action detail page. But we were pretty limited in how to control the order of actions on an animal detail page. We needed independent sorting control between animals on action pages, and actions on animal pages. We opted to stay with the native drag and drop sorting of entityreference fields, so we added a matching entityreference field on animals to reference actions, and added the [Corresponding Entity References](https://www.drupal.org/project/cer) to keep these references in sync with each other. Now we have native draggable sorting on both content types. There are several other methods that could have been used, such as adding a weight field, using the [draggable views](https://www.drupal.org/project/draggableviews) module, or using [nodequeue](https://www.drupal.org/project/nodequeue), but using CER with a pair of entityreference fields kept complexity at a minimum.

An essential goal of this feature is sharing an action. The requirement was to have the sharing widget appear on individual actions only when listed on an animal detail page. The shared message is a combination of elements from both content types: the image and name of the animal, plus the contents of a Sharing Message text field from the action. The the URL shared is related to the action.

Message when sharing the FSC action from the Chimpanzee page:

![landing page](/assets/images/blog/zoo-action-portal-share-chimp-fsc.png)

Here's how we put that together. We start by including the global stuff for the ShareThis widget. An implementation of `hook_views_pre_render()` adds some javascript settings and includes the ShareThis javascript library. To add the unique things to each action, we add a new variable "sharethis_attributes" in `hook_preprocess_views_view_field()`. This variable contains a string of pseudo attributes: `st_url="http://example.com/the-page" st_title="Example Page Title" st_image="http://example.com/image.jpg" st_summary="This is the text that will be shared." st_via="OregonZoo"`. We use that variable in a very specifically-named template file that takes effect for only this field in this view. The rest of the markup and classes placed in that field template came from ShareThis.

~~~php
<?php print $output; ?>
<div class="sharethis-custom">
  <span class='st_sharethis_vcount' displayText='ShareThis' <?php print $sharethis_attributes; ?>></span>
</div>
~~~

All of this work: content types, fields, image styles for the image fields, views, and the handful of custom hook implementations are bundled together in a new custom feature.

Check out the [small actions]( http://www.oregonzoo.org/conserve/small-actions) pages at the Oregon Zoo site and see if there is a small action you can take that will have an impact on a wild animal you care about. There are some great tips that will help you live cleaner and sustain our irreplaceable wildlife.
