---
layout: post
published: false
featured: false
author: cooper
short: "Want responsive images on your Drupal 7 site? Use a Drupal 8 backport to get the job done."
---

In today’s web device climate, you never know if your site will be viewed on a laptop, a tablet, a phone, an 84-inch 4k monitor, a Blu-ray player, a gaming console, or a [refrigerator](http://www.samsung.com/us/appliances/refrigerators/RF4289HARS/XAA). Most of us have probably experienced the frustration of using a website that displayed poorly because of its inbuilt assumptions about what the user’s screen would look like. The ability for your web content to adjust to its context---in particular, screen resolution---is critical to making sure you deliver the best web experience possible to every user.

The tools and techniques to do so, known as responsive web design (RWD), are a large area beyond the scope of this blog post. For today, we’ll focus on a specific bit of RWD that is a little tricky to handle in Drupal: responsive images.

If you just did what I first did and typed [drupal.org/project/responsive_images](drupal.org/project/responsive_images) into your browser to see what popped up, you’ll see a module that is no longer actively maintained. [Many](https://www.drupal.org/project/adaptive_image) [responsive](https://www.drupal.org/project/cs_adaptive_image) [image](https://www.drupal.org/project/ais) [projects](https://www.drupal.org/project/resp_img) have come and gone over the last few years, with varying approaches and degrees of success; it’s a crowded space.

Luckily, Drupal 8 will feature a responsive image handling solution in core, in the new [Picture](https://www.drupal.org/project/picture) module, and it has already been backported to Drupal 7. It’s a bit tricky to set up, with configurations spread across several different GUI menus, but once you have it running it’s a fast, smooth solution to an important challenge, and it plays well with its neighbors.

## The Gist Of It

We'll be dealing with a handful of new objects to get responsive image behaviors going smoothly.

- Breakpoints
    - Breakpoints are ranges of screen sizes, described by conditional tests (i.e., minimum width = 640). 
- Breakpoint Groups
	- EWISOTT (Exactly What It Says On The Tin). 
- Image Styles
	- You may already know these from the Media module; they let you bundle dimensions, scaling modes, etc. into styles that can be reused across your site.
- Picture Mappings
    - Picture mappings pair up breakpoints with image styles.
- Responsive Styles
	- Responsive styles associate images to a breakpoint group. One responsive style may be applied to many images, but each image only has one responsive style.
    
Once an image is associated with a responsive style, the Picture module will check the page dimensions, look at the breakpoint group, find the _first`*`_ breakpoint that applies to those dimensions, look at the picture mapping to find the associated image style, and apply that style to the image. This happens in real time, so a user resizing their window should see the image rescale to fit their new window size instantaneously.

`*`We'll come back to this point...

## Installation

We'll use [Drush](http://drush.ws/), a Drupal cli, to install the modules and their dependencies, and to enable them.

Picture has two important dependencies:

- The [Breakpoints](https://www.drupal.org/project/breakpoints) module, which will keep its eye on the browser window size.
- The [Chaos Tool Suite](https://www.drupal.org/project/ctools), which gives us lots of handy development tools and APIs.

Drush will handle the dependencies for you; just navigate to your site root and type:

```bash
drush en picture -y
```

We'll also want the Media module:

```bash
drush en media -y
```

(In the above commands, ```-y``` just tells drush to assume "yes" for any requests for confirmation.)

## Setting Up Breakpoints

Breakpoints can be found under Configuration > Media > Breakpoints. Each breakpoint needs a name, and a [media query](http://css-tricks.com/resolution-specific-stylesheets/). Optionally you can enable Retina display handling for each breakpoint.

![breakpoints-example-0.png](assets/images/blog/breakpoints-example-0.png "Three breakpoints with basic media queries")

Note that the smallest breakpoint is set to a `0px` minimum. This ensures that arbitrarily small screen sizes will be accomadated.

### Ordering

The order in which the breakpoints appear is the order your breakpoint group will check their media queries. The example configuration uses minimums in decreasing order, which is preferable for responsive image design. If a breakpoint query fails (if the screen width is below the minimum), the next breakpoint down the line will be checked. Make sure you get this order right; once you pull these breakpoints into a group their order cannot be edited; you'd need to delete the breakpoints and their group and start over.

### Groups

Click 'Add a new group' to define a Breakpoint Group. The ordering on this screen will match the order defined by weights in the previous step.

![breakpoints-example-1.png](assets/images/blog/breakpoints-example-1.png "A simple breakpoint group")

Note that once a breakpoint has been added to a group, it _cannot_ be edited.





