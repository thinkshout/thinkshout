---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: Don't fear the monkey! Introducing a friendlier MailChimp module.
created: 1374877774
permalink: blog/2013/07/gabe/dont-fear-monkey-introducing-friendlier-mailchimp-module/
tags:
- MailChimp
- Testing
- Drupal Planet
short: Changes to our MailChimp module.
author: gabe
---
A couple months ago one of my coworkers asked me how to change some text on a block generated by our [MailChimp module](https://drupal.org/project/mailchimp). I had to tell him the bad news: that text was hard-coded and he'd have to work pretty hard to change it. He also wanted to change the text on the Submit button... which wasn't much easier.  

Now, the MailChimp module is pretty mature, with over 9000 installs just on the 7.x branch... but we have run into a couple consistent complaints in the issue queue:  

* Unpredictable subscription behavior under some specific configuration option combinations.
* Confusing or limited configuration options, especially regarding the subscription blocks.  

The first of those is a big problem. As we had grown the feature set of the module, the logic tree for when and how to subscribe or unsubscribe users based on user preference, list configuration, role assignments, cron options, and the phase of the moon had become quite tangled. In an attempt to permanently resolve these issues, which kept shifting every time we released a patch, we attacked from two angles:  
  
1. We refactored the entire logic tree, separating out the "what to do" logic from the "how to do it" logic. To make this cleaner, we expanded the collection of functions that could be delegated to cron to cover everything, where previously only certain Subscribe & Unsubscribe functions could be run.  
2. We wrote automated tests using Simpletest.  
  
We are big believers in automated testing at ThinkShout, and given how many little subscription logic issues we had encountered with MailChimp, this seemed like the perfect place to leverage the power of automated tests. Since the Mailchimp module integrates with the Mailchimp service using an API, the first thing we had to do was create a dummy API to bounce our logic off of. Once that was in place, we wrote a bunch of automated tests and ran them against both the latest stable release (7.x-2.10) and our development releases. Then we had to figure out if all the failed tests were poorly written or actually indicated issues in our code. Needless to say, it was a little bit of both, and we now have a lot more confidence in our subscription logic handling.

If you're thinking about automated testing for any project, I highly recommend it.

But let's get back to those problems we were trying to address before. The other one is a little more exciting for all you site builders and administrators: configuration options!  

We dove pretty deep here, too. The list settings have been completely restructured for clarity and usability, and the best way to understand what this means is probably to install the module, so I'll just run through some of the highlights of MailChimp 7.x-2.12:  

* There are no more "list types": whether a list is Required for your users or is available for Anonymous subscription is now controlled by two checkboxes.  
* You can now have a single list allow both authenticated and anonymous users to control their subscriptions without just treating the authenticated users like they are anonymous.  
* Users can now configure Interest Groups on Required lists if you want to let them.  
* You can alter the Interest Groups label on a list-by-list basis.  
* You can easily alter the text on the Subscribe button on each individual subscription block.  
* You can select which merge fields you want to display on the anonymous sign-up form block.  
* You can no longer set options that will cause the form to fail on save due to some unseen restriction: the correct options are intuited or you are blocked from setting them in the first place.  

So what are you waiting for? Go download the new version! It won't bite.
