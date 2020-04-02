---
layout: blog
body-class: blog-post
topic: technology
title: "Accessibility for Teams in a Hurry: Links & Buttons"
homepage: false
author: jules
published: true
permalink: /blog/2020/04/accessible-links-buttons/
featured: true
short: "When you do have to stop and think about what a button does, or where it goes or why it’s not working, it’s frustrating."
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
image: https://thinkshout.com/assets/images/marquee/ntc2020_post3_hero.jpg
header-image: /assets/images/marquee/ntc2020_post3_hero.jpg
header-image-alt: "Closeup of a Dutch audiobook reader with many well-defined buttons."
---
Links and buttons can cause all kinds of accessibility bugs. Everyone that uses a website engages with links and buttons countless times without even thinking even about it. When you do have to stop and think about what a button does, or where it goes or why it’s not working, it’s frustrating.

This topic is especially important because links and buttons are how we actually do anything online. Without access to the links and buttons on a site, people are excluded from information and experiences.  At ThinkShout, our process for creating accessible links and buttons is highly collaborative and as what we build becomes more complex, responsibilities are shared more and more.

## Test Color Contrast for Links

![A screenshot showing the WebAIM user interface highlighting contrast issues and recommendations.](/assets/images/blog/ntc3-image2.jpg)
{:.center}

Testing color contrast for links and buttons has an additional guideline to consider:contrast when a link is in body text. If a body copy link doesn’t have underlines, it needs to have a 3:1 contrast ratio between itself and surrounding text in addition to the foreground vs. background ratio of 4.5:1. The WebAIM color contrast checker can specifically test link color contrast within body copy. The goal here is for your site visitors to know when something in body copy is a link.

## Define Action States for Buttons


![Four buttons showing the default, hover, active, and focused states. ](/assets/images/blog/ntc3-image5.png){:.left.thirty}When designing a button, four action states that need to be considered:

1. Standard: how it looks by default.
2. Hover: How it looks when a user has hovered, but not yet selected
3. Active: how it looks when it has been selected
4. Focus: how it looks when you navigate to it with a keyboard.
{:.floated}

Action states give a visual queue to users that they are engaging with a button. Most teams know to create a hover state, but defining a focus state will make navigating a page with a keyboard much clearer and easier.

This is an area where collaboration between design and development is key in the handoff and during implementation. If action states are missing, our developers ask the designer what they should be. If the designer finds one is missing during QA, they let the developer know.

## Give Buttons and Actions Clear Labels
Accessible labels can happen during content creation AND in the code.

## Loop in Content Creators

Labeling buttons and links is another area that requires a full team effort and often involves multiple stakeholders to align on language. Clearly Labeling an action is just as important as having a headline that makes sense. While many of these interactions feel minor while designing a system, they are meaningful and should be carefully considered. Designers should collaborate with stakeholders to make accessible language recommendations.

### Icon Buttons Need Labels Too

When coding a site, a common bug is on icon buttons that do not include labels. Search, hamburger and social media buttons are notorious for developers forgetting to put a label on them which means you only know what they do if you can see the visual icon. You can use a property called an aria-label to add a label that’s available to assistive technology like screen readers.

### Links Should Make Sense Out of Context

Labels need to make sense out of context because some users are navigating a site with their voice using tools like Dragon. If the text in each button is the same, folks can’t just say the name of the button without performing a workaround to access the button they want to click. When people get to a site they don’t read every word they scan the page. Instead of doing that visually, using a screen reader you can pull up a list of Headings or Links and browse that list to find what you’re looking for.

![Screenshot: A puppy website with several “Click to Vote” buttons, and a screen reader demonstrting how  the buttons all seem the same.](/assets/images/blog/ntc3-image3.jpg)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>A puppy website with several “Click to Vote” buttons. More specific text in buttons helps users know what they do when visual context isn’t available.</span>

In this example, the Click to Vote! buttons are confusing because a user wouldn’t  know if they’re voting for the dog above or below the button. A simple fix here would be to change the button text to be clear, like “Vote for Zeus”.

## Target Size of a Button Should be at Least 44 x 44px

In WCAG 2.1, the minimum target size for compliance is 44px by 44 px. This also matches Apple’s recommendation in their Human Interface Guidelines.

Tiny buttons are obnoxious for anyone, and even more so if you have limited mobility, Parkinson’s or low vision. Do all of your users a favor and make sure your touch targets are large enough. That doesn’t mean your design has to get huge, You can use your code to make the link target larger without impacting design.

![Screenshot: Two buttons, one with padding, one without.](/assets/images/blog/ntc3-image4.jpg)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>A button with padding creates a much larger touch target than one without padding</span>

## Write Semantic Code
A span or div pretending to be a button isn’t really a button.

1. **Use semantic tags like `<button>`  and `<a>` tags**  
Don’t Get tricky! Buttons and links should be semantic. If you’re using javascript to make a div or a span into a button, it will work if you use a mouse. Unless you’re intentional in how you code it, many users won’t be able to find or interact with it.

2. **Watch out for clickable elements made with `<div>` or `<span>`**  
When keyboard testing, if you can’t land on a link or button, it probably isn’t coded as an actual link or button. In that case, you might need to rewrite some code to make it accessible.


![A corgi wearing a hotdog Halloween costume](/assets/images/blog/ntc3-image1.jpg)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Caption: Corgi’s pretending to be hotdogs: cute.<br>
Spans or divs pretending to be buttons: not cute.</span>

## Testing Buttons

1. Double check work by using the WAVE tool to catch missing or suspicious labels and to ensure that links make sense outside of the visual context.
2. Perform a simple keyboard test by clicking near the button or link, then using the tab key I navigate to it.
3. Make sure there’s a visual focus state and it matches what has been designed.
4. Make sure you can click on the link or button by using the return key.

### To Summarize

- Define Action States
- Give them clear labels
- Links and buttons should make sense out of context
- Target size should be at least 44px by 44px


[What’s next? Check out our post on Navigation >](/blog/2020/04/accessible-navigation/)


