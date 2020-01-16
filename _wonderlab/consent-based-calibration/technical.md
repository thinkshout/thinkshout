---
index: 3
layout: wonderlab_blog
body-class: wonderlab-blog-post wonderlab-page
category: consent-based-calibration
title: "The Technical Benefits of Consent-Based Calibration"
card-subheader: Technical lens
author: sam
published: true
short: Accurate content personalization is a large technical feat, combining client side behavior tracking, data analytics, machine learning, and hand-built segmentation to deliver valuable experiences to end users. Consent-based calibration bypasses many of these technical challenges.
description: "@todo for SEO"
tags:
  - todo
date: 2019-01-15 09:00:00
image: https://thinkshout.com/assets/images/wonderlab/consent-based-collaboration/card/cbc-tech-card.jpg
image-alt: "Person of color in background with textured circles"
header-image: /assets/images/wonderlab/consent-based-collaboration/hero/cbc-tech.jpg
header-image-alt: "Person of color in background with textured circles"
card-image: /assets/images/wonderlab/consent-based-collaboration/card/cbc-tech-card.jpg
card-image-alt: "Person of color in background with textured circles"

medium-link: https://medium.com
---
There’s no question that accurate content personalization is a large technical feat, combining client side behavior tracking, data analytics, machine learning, and hand-built segmentation to deliver valuable experiences to end users. As a result of this complexity, most organizations turn to vendors for personalization, but even turn-key solutions require custom implementations to make sure the right data is being collected and that personalized content is displayed seamlessly, invisibly, to users.

>Consent-based calibration bypasses many of these technical challenges—no user data needs to be stored, no user profiles need to be merged, and no automatic or manual segmentation is required.

That isn’t to say that no hurdles exist for this to be implemented correctly, but it does feel good to have the weight of all that user data off your shoulders.

A key part of consent-based calibration is explicitly collecting information from users to put them in charge of their own experience. This may be done with a prompt for new users visiting the site that asks them a series of questions about what they’re interested in, or a way to switch between different personas the site is designed for. Regardless of how the data is collected, we need to decide how to store it. With personalization this would almost always be on a server, and would be tied to some unique identifier like a user ID. With consent-based calibration there’s not a compelling reason to store this data anywhere other than in the user’s browser, especially if the majority of your users are anonymous. Once stored in the browser, data could then be queried using IndexedDB to perform lightweight segmentation.

Using browser storage, client side code can change the look and feel of a site, which is similar to how JavaScript based personalization tools work today. A common complaint about personalization is the “pop in” moment where a homepage loads, where elements wait to render until AJAX calls to personalization services are made. Browser storage can sidestep this limitation as no AJAX calls are required to determine what to show users. For example, if you’ve identified three personas on your site, you could send the HTML for three call to actions to the client, but only display one based on their preferences. This will increase the size of the response, so at some point you may still need to make AJAX calls, which would be to your own servers without any complex personalization decisions.

The main downside of browser storage is that there’s no guarantee about how long data persists, and no way to know if it was modified by the user. The best workaround for this limitation is to keep preferences simple—

> Don’t expect to build a profile for a user that spans weeks or months of site visits. This may seem like a major issue if you’re coming from traditional personalization, but highlights what makes consent-based calibration different—you have to stop feeling ownership over your user’s data and start letting them make their own decisions.

One interesting benefit of consent calibration is that users can actually change the persona they’ve been associated with. This can be done through the web site, possibly as a toggle between known personas, or by simply clearing their browser history. With personalization this is really difficult if not impossible - even a handful of purchases on a commerce site like Amazon.com can land you in a segment that’s undesirable. You could have personalization related data decay over time, but it seems much easier to just ask the user what they’re looking for, which consent based calibration supports.

Since cookies aren’t used, and preferences don’t have to be sent to the server, it’s intriguing to think about how GDPR or the newly enacted CCPA works with consent-based calibration. If you’re using any personalization service and have EU users, you have to prompt users to consent to using cookies to identify and track them. This prompt is usually something to the tune of “We’re already tracking you, by using the site you consent to that”, but with consent-based calibration users are explicitly choosing what data they provide. This changes the prompt to feel less intrusive and more like an intentional feature of the site.

Consent-based calibration represents a major shift in thinking about collecting user data and delivering personalized content, and as a result the actual implementation is going to be more difficult conceptually than going with traditional personalization tools. Developers and strategists will have to spend more time tailoring experiences to user preferences instead of trusting a black box personalization platform. That said, the technical simplicity of keeping user data in the browser enables developers to focus less on tracking, and builds trust with users by letting them choose what data they expose.
