---
layout: blog
body-class: blog-post
topic: technology
title: "Accessibility for Teams in a Hurry: Color Contrast"
homepage: false
author: jules
published: true
permalink: /blog/2020/04/accessibility-color-contrast/
featured: true
short: "Making accessible design decisions starts by establishing an accessible color palette."
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
  - Design
  - Content Editors
  - "NTC 2020"
  - ntc
date: 2020-04-02 11:00:00
image: https://thinkshout.com/assets/images/marquee/ntc2020_post2_hero.jpg
header-image: /assets/images/marquee/ntc2020_post2_hero.jpg
header-image-alt: ""
---
Making accessible design decisions starts by establishing an accessible color palette. Defining a color palette can be really exciting as it sets the tone of the experience, yet it’s a fragile part of the process. People attach a lot of emotion to color. If you combine that with branding considerations, this part of the process must be handled with care and can often take time to get right.

There are some key considerations when creating a color palette for your website. Some are as simple as making intentional design choices and others can involve multiple stakeholders.

## Define the Palette

An accessible color palette has sufficient contrast for legibility and interactions. It’s more usable for people with low vision or color blindness and makes information more legible for everyone. Sometimes brand colors have already been established that might not be accessible for digital applications. This requires working with a brand team or stakeholders to create an accessible, digital version of an existing palette.

## Decide What Colors are for Decoration vs. Information

![Two Images: on the left, an elaborately decorated church ceiling, with the caption, 'decoration'. On the right, an image of signage as a train station with the caption 'information'. ](/assets/images/blog/ntc2-image1.jpg)
{:.center}

Consider how the color is being used within your system. Once you define your palette, consider which colors can be used just as decorative elements rather than using them to communicate key information. This allows you to retain color combinations with lower contrast or similar values without compromising your site’s accessibility.

![Two Images: on the left, a rainbow of washed out colors with white text overlaid, stating 'This contrast is too low'. On the right, an image of a solid dark background with the caption 'This contrast is better'. ](/assets/images/blog/ntc2-image2.jpg)
{:.center}

When we talk about contrast our goal is to make sure information can be read, which means there’s at least a 4.5:1 contrast ratio between the foreground and background colors.

![A screenshot showing the WebAIM user interface highlighting contrast issues and recommendations. ](/assets/images/blog/ntc2-image3.jpg)
{:.center}

To test contrast while you’re creating designs, there are plugins out there for tools like sketch, but one of our favorite tools is [WebAIM’s website](https://webaim.org/resources/contrastchecker/) where we can check contrast for multiple uses. For example, a pairing might not work for small text, but would work well for symbols and headlines.

![The number '5' in an Ishihara plate, used by optometrists' as a color blind test.](/assets/images/blog/ntc2-image4.jpg)
{:.center}

In addition to contrast, colors with too similar value aren’t discernable as a way of communicating information for people with color blindness and are difficult to read for all audiences.

## Establish Action Colors and Create a Style Guide for Developers and Site Administrators


![A site color palette.](/assets/images/blog/ntc2-image5.jpg)
{:.center}

Color meaning should be applied consistently. Users often associate color with meaning. That means it’s important to communicate each color’s purpose to your dev team and the site admin by creating style guides.

### A Sample Workflow:

<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Primary</th>
      <th>Secondary</th>
      <th>When</th>
      <th>Tool Used</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Color Contrast</td>
      <td><strong>Designer</strong></td>
      <td><strong>Developer</strong></td>
      <td>Primary:<br><strong>Design</strong><br><br>
        Secondary:<br><strong>After built</strong></td>
      <td>Primary:<br><strong>WebAIM</strong><br><br>
        Secondary:<br><strong>WAVE</strong></td>
    </tr>
  </tbody>
</table>

## To Summarize

1. Define your palette
2. Decide what colors are for decoration vs. information
3. Test your color combinations
4. Establish action colors
5. Create a style guide for developers and site admins

[What’s next? Check out our post on Links & Buttons >](/blog/2020/04/accessible-links-buttons/)

### Resources
- [WebAIM’s color contrast checker](https://webaim.org/resources/contrastchecker/)  
Test your color combinations for a 4.5:1 contrast ratio.

- [No Coffee Chrome extension](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl?hl=en-US)  
Simulate how the colors on your site will look to someone with colorblindness

- [Color Safe](http://colorsafe.co/)  
A free website with an accessible color palette generator.


