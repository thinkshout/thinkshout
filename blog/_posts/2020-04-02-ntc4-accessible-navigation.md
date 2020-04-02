---
layout: blog
body-class: blog-post
topic: technology
title: "Accessibility for Teams in a Hurry: Navigation"
homepage: false
author: jules
published: true
permalink: /blog/2020/04/accessible-navigation/
featured: true
short: "A reliable and accessible navigation system is a priority for any website."
tags:
  - strategy
  - accessibility
  - A11Y
  - communications
  - marketing
  - "digital marketing"
  - wfwi
  - Drupal Planet
  - Drupal
  - WordPress
  - CMS
  - CSS
  - Content Editors
  - "NTC 2020"
  - ntc
date: 2020-04-02 11:00:00
image: https://thinkshout.com/assets/images/marquee/ntc2020_post4_hero.jpg
header-image: /assets/images/marquee/ntc2020_post4_hero.jpg
header-image-alt: "A hand on a computer mouse"
---
A reliable and accessible navigation system is a priority for any website. Not only is it how users find content, it’s how they understand what types of content a site has to offer. This tells users the story of who you are as an organization, creates a connection and trust between your organization and your audience.

An accessible navigation means that people can access all of the content on the site through any device. It also reflects a larger system where all the decisions around color, interactions, scale and language come together. Some simple fixes to just the navigation alone, can make a big difference in the accessibility of your site.

The principles in our posts about Color Contrast and Links and Buttons apply to the navigation system as well. In addition to those, here are a few things your team should consider when creating and maintaining an accessible navigation:

## Scaling

When designing the navigation system, consider how it performs when scaled. People with low vision will zoom in to better see your site. An accessible navigation should allow people to zoom in to 400%. Often, a site zoomed in to 400% will default to the mobile version, which is why keyboard testing your mobile size is also important.

To create a navigation that can scale gracefully, all break points should be designed and built. At ThinkShout, this part of the process is really hands-on and collaborative as the full team tests for accessibility throughout the process. Testing should include using actual devices during QA to make sure the navigation will stand strong.

![Three screenshots of a map, showing a default desktop view, a 400% zoomed in view, and a mobile device view.](/assets/images/blog/ntc4-image1.jpg)
{:.center}

In this example, we designed this [highly interactive map](https://thinkshout.com/work/splc/), knowing it was critical for all users to access the information from any device. When you zoom in on a desktop, even at 400% the menus are still clear and usable.

## Dropdowns and Mega-Menus

When building a navigation, it’s important to write semantic code as much as possible. Dropdowns, mega-menus and anything interactive needs to be thoroughly keyboard tested to make sure people can  
- Get to them
- Open them
- Close them

These features should be tested with an automated tool as well. Navigation can be complex.ere are some great [references from W3 with code examples](https://www.w3.org/WAI/tutorials/menus/flyout/).

## Skip Links

A _Skip to Main Content_ link is really useful if a user is navigating through the site without a mouse or using a screen reader. This link would allow the user to avoid hearing or tabbing through the navigation on every page.It’s at the very top of the site, and on a lot of the sites we work on it becomes visible when you focus on it, but is otherwise hidden.

When someone clicks on a _Skip to Main Content_ link, the focus moves to a same-page link below the navigation. This is something we’d recommend for every site.

## To Summarize
1. Test your site zoomed in at 400%. Does it still work? Do things go offscreen?
2. Test dropdowns and mobile menus with a keyboard. Can you get to it? Can you click it?
3. Include a Skip Link: People should be able to bypass the navigation

[What’s next? Check out our post on Getting Started >](/blog/2020/04/getting-started-accessibility/)

### Resources
- [References for creating dropdowns and interactive elements from W3 with code examples](https://www.w3.org/WAI/tutorials/menus/flyout/)


