---
layout: post
published: false
featured: false
---


In today’s web device climate, you never know if your site will be viewed on a laptop, a tablet, a phone, an 84-inch 4k monitor, a Blu-ray player, a gaming console, or a [refrigerator](http://www.samsung.com/us/appliances/refrigerators/RF4289HARS/XAA). Most of us have probably experienced the frustration of using a website at some point that displayed poorly because of its inbuilt assumptions about what the user’s screen would look like. The ability for your web content to adjust to its context---in particular, screen resolution---is critical to making sure you deliver the best web experience possible to every user.

The tools and techniques to do so, known as responsive web design (RWD), are a large area beyond the scope of this blog post. For today, we’ll focus on a specific bit of RWD that is a little tricky to handle in Drupal: responsive images.

If you just did what I first did and typed [drupal.org/project/responsive_images](drupal.org/project/responsive_images) into your browser to see what popped up, you’ll see a module that is no longer actively maintained. [Many](https://www.drupal.org/project/adaptive_image) [responsive](https://www.drupal.org/project/cs_adaptive_image) [image](https://www.drupal.org/project/ais) [projects](https://www.drupal.org/project/resp_img) have come and gone over the last few years, with varying approaches and degrees of success; it’s a crowded space.

Luckily, Drupal 8 will feature a responsive image handling solution in core, in the new [Picture](https://www.drupal.org/project/picture) module, and it has already been backported to Drupal 7. It’s a bit tricky to set up, with configurations spread across several different GUI menus, but once you have it running it’s a fast, smooth solution to an important challenge, and it plays well with its neighbors.

## Installation

Picture has two important dependencies:

- The [Breakpoints](https://www.drupal.org/project/breakpoints) module, which will keep its eye on the browser window size.
- The [Chaos Tool Suite](https://www.drupal.org/project/ctools), which gives us lots of handy development tools and APIs.

Drush will handle the dependencies for you&mdash; just navigate to your site root and type:

```bash
drush en picture -y
```

We'll also want the Media module:

```bash
drush en media -y
```

## Basics

We'll be dealing with a handful of new objects to get responsive image behaviors going smoothly.

- Breakpoints
    - Breakpoints are ranges of screen sizes (i.e., minimum width = 640).
- Image Styles
	- You may already know these from the Media module; they let you bundle dimensions, scaling modes, etc. into styles that can be reused across your site.
- Picture Mappings
    - Picture mappings pair up breakpoints with image styles.
