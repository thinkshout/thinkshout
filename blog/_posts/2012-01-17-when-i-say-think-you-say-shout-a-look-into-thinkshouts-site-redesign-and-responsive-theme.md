---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: When I say Think, you say Shout! A look into ThinkShout's Site Redesign and
  Responsive Theme
created: 1326826800
permalink: blog/2012/01/andrea/thinkshouts-site-redesign-and-responsive/
tags:
- theming
- design
- Drupal Planet

short: A responsive theme for ThinkShout's redesign.
author: andrea
---
When I started at ThinkShout in June 2011, [Responsive Web Design](http://www.abookapart.com/products/responsive-web-design) by [Ethan Marcotte](http://unstoppablerobotninja.com) had just been released. I read an excerpt of the book, [Fluid Images](http://www.alistapart.com/articles/fluid-images/), on A List Apart and was intrigued. I immediately bought the book and devoured it.

At the same time, Lev Tsypin, one of the partners at ThinkShout, and I started talking about HTML5 themes in an effort to choose a new standard HTML5 Drupal theme for ThinkShout to work off of. We decided to see what HTML5 themes had momentum in the Drupal community and we tested out and reviewed many current HTML5 themes out there.

We looked at a number of different themes and settled on testing out [AdaptiveTheme](http://drupal.org/project/adaptivetheme) and [Omega](http://drupal.org/project/omega). But at the time AdaptiveTheme was not yet responsive. It seemed an obvious choice to move to Omega since the four standard media queries are built into the theme.

## Why did we choose Omega?

With a HTML5 base and built-in mobile, ipad/tablet, normal and wide responses, it seemed like the smartest choice.  Although an initial look at the theme settings file can be daunting, once you dive in and see what is happening behind the scenes, both the configuration and modification of regions and zones is easy to understand. The bonus was the ability to create subthemes on the fly using [Omega Tools](http://drupal.org/project/omega_tools) and Drush and the ability to export / revert theme settings.

## Using SCSS with Omega

I wrote the styles for the ThinkShout site in [Sass](http://sass-lang.com/). The newest syntax for writing Sass is called SCSS (which stands for "Sassy CSS"). SCSS is very similar to CSS but uses slightly different syntax which provides nested rules, variables, mixins and selector inheritance. This language uses [Compass](http://compass-style.org/), which is a Ruby-based open-source CSS Authoring Framework that provides libraries of common code to use within your stylesheets. I mostly use Compass to access CSS3 mixins.

When writing SCSS, the Compass compiler runs and watches the SCSS files. The compiler turns SCSS files into CSS files and converts mixins into readable CSS. Basically it makes writing CSS a lot faster in that one can reuse chunks of code that have the ability to pass variables. And it makes writing styles fun!

Nested rules, selector inheritance and mixins of SCSS are great for writing styles for Drupal sites in that we are often dealing with multi-layered complex markup.  Using SCSS, I can target specific sections of code using nested rules and then avoid code replication by utilizing selector inheritance and mixins.

Sometimes Drupal has been known to provide us with multi-layered complex markup. I find that SCSS's nested rules, selector inheritance and mixins are great for theming this markup. 

*As a side note, ThinkShout as a team is moving to [Less](http://lesscss.org/) from SCSS. That will be my next blog post. Compare and Contrast - SCSS vs Less.*

## The Different Responses of ThinkShout.com

<div style="text-align: center; margin: 0 0 30px 0; "><img src="/sites/default/files/images/inline/responses.png"  />
<p style="font-size: 12px; color: #333; font-style: italic; width: 50%; text-align: center; margin: 0 auto;"> Clockwise from top left: Mobile, iPad - Portrait, Normal (960)</p></div>

### Mobile

For the mobile web experience of the site, we wanted to present a simple, user friendly interface and content layout. To achieve this, we center-aligned the logo, site description and main menu and set the fonts to a legible size for the context. For the recent project section on the homepage, we decided the user only needed to view one recent project and we resized the image to fit in the frame. For simplicity, we removed the search bar, social media links and twitter feed.

One thing to remember for theming for mobile is to add 20px of padding on the left and right-hand side of the content container. This allows the user to have space to scroll up and down to view content. In the Omega theme, I add padding: 0 20px to each .region-inner to provide this space. Some elements without .region-inner will have to be styled individually to allow for space.

Another helpful trick I learned was to use the body tag .responsive-layout-mobile to target only the mobile response.

For styles that I only wanted the mobile response to render, I wrapped those css rules in .responsive-layout-mobile class.

In SCSS, you can easily nest a list of styles under one body class.

 `<code>.responsive-layout-mobile {</code>`

 `<code>/*put styles here */ </code>`

`<code>}</code>`

### Narrow (iPad / Tablets)

On the Narrow view, the tagline is positioned to the left, while the menu is positioned at the top and right of the container. We added two featured project thumbnails to enhance the Recent Project section and brought the search bar and social media links into the footer.

The [Portfolio landing page](http://thinkshout.com/portfolio) now has two columns of thumbnails and the images are larger width and height than the mobile web experience. The user also gets a small bit of interaction bling when they hover over any of the Portfolio thumbnails. The image’s opacity decreases over a black background and the user can now see a short description of the project.

Also, as a bonus, the user can now see the "Put a bird on it" badge/image we have added to the site. If you are lost with this reference, [watch and learn](http://www.hulu.com/watch/210887/portlandia-put-a-bird-on-it). 

### Normal (960 wide)

In this response, the site description's font-size increases and the “Put a bird on it" image and all Recent Projects’ images increases in width and height. The Portfolio landing page now has three columns of images. The Twitter feed appears in the footer.

### Wide (1200 wide)

This is just an extension of the Normal response. The only significant changes are that the Recent Projects main image increase to its max-width. The portfolio landing page remains three columns but the thumbnails get slightly bigger.

## Omega Lessons Learned

This isn't very well documented in Omega documentation. But to theme well in Omega, it is essential to understand how the stylesheets in your subtheme work.

[Himerus](http://drupal.org/user/159141), creator and maintainer of the Omega theme, outlines it in this [D.O thread](http://drupal.org/node/1239662#comment-4828360):

> global.css -> applies to MOBILE AND ALL responsive layouts... it's the base stylesheet that applies on ANY view of the site.

> THEME-alpha-default.css ONLY applies on any browser capable of understanding media queries (and IE in default mode) BUT this stylesheet will apply to ALL the responsive layouts (narrow, normal, wide)

> THEME-alpha-default-narrow.css - applies to narrow layout AND anything after it (normal, wide)

> THEME-alpha-default-normal.css - applies to normal layout AND anything after it (wide)

> THEME-alpha-default-wide.css - applies to wide layout ONLY (unless you create one after it in the chain)

## Future implementation to-dos

I would like to implement the [Adaptive Images](http://drupal.org/project/adaptive_image) module to the Recent Projects section on the homepage. Right now the mobile view is pulling the largest image in, just resized using max-width: 100%.

## Fun Facts

The name of our Omega subtheme is Swift. Why? When I began the initial theming of the site, it was during the annual time when a flock of [Vaux's Swifts](http://en.wikipedia.org/wiki/Chapman_Swifts) visit Chapman Elementary school in Portland. [Watch a clip of the Vaux swifts in action](http://youtu.be/A-YaEWNex2U).

