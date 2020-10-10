---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: Responsive Images in Drupal with the Picture Module
published: true
featured: false
author: cooper
date: 2014-07-31 13:00:00
short: Want responsive images on your Drupal 7 site? Use a Drupal 8 backport to get the job done.
tags:
- Drupal Planet
- Responsive design
- Picture module
- User experience
---

In today’s web device climate, you never know if your site will be viewed on a laptop, a tablet, a phone, an 84-inch 4k monitor, a Blu-ray player, a gaming console, or a [refrigerator](http://www.samsung.com/us/appliances/refrigerators/RF4289HARS/XAA "Seriously."). Most of us have probably experienced the frustration of using a website that displayed poorly because of its inbuilt assumptions about what the user’s screen would look like. The ability for your web content to adjust to its context---in particular, screen resolution---is critical to making sure you deliver the best web experience possible to every user.

The tools and techniques to do so are known as responsive web design (RWD). One of the first high-profile sites to implement RWD was [The Boston Globe](http://www.bostonglobe.com/), which is a great example to take a look at. RWD in general is beyond the scope of this blog post. Today, we’ll focus on a specific bit of RWD that is a little tricky to handle in Drupal: responsive images.

If you just did what I first did and typed [drupal.org/project/responsive_images](http://drupal.org/project/responsive_images) into your browser to see what popped up, you’ll see a module that is no longer actively maintained. [Many](https://www.drupal.org/project/adaptive_image) [responsive](https://www.drupal.org/project/cs_adaptive_image) [image](https://www.drupal.org/project/ais) [projects](https://www.drupal.org/project/resp_img) have come and gone over the last few years, with varying approaches and degrees of success; it’s a crowded space.

Luckily, Drupal 8 will feature a responsive image handling solution in core with the new [Picture](https://www.drupal.org/project/picture) module, and it has already been backported to Drupal 7. It’s a bit tricky to set up with configurations spread across several different GUI menus, but once you have it running, it’s a fast, smooth solution to an important challenge, and it plays well with its neighbors.

## The Gist Of It

We'll be dealing with a handful of new objects to get responsive image behaviors going smoothly.

- Breakpoints
    - Breakpoints are ranges of screen sizes, described by conditional tests (i.e., minimum width = 640)
- Breakpoint Groups
	- EWISOTT (Exactly What It Says On The Tin)
- Image Styles
	- You may already know these from the Media module; they let you bundle dimensions, scaling modes, etc. into styles that can be reused across your site.
- Picture Mappings
    - Picture mappings pair up breakpoints with image styles
    
Once an image is associated with a responsive style, the Picture module will check the page dimensions, look at the breakpoint group, find the _first_ breakpoint that applies to those dimensions (we'll come back to this point...), look at the picture mapping to find the associated image style, and apply that style to the image. This happens in real time, so a user resizing their window should see the image rescale to fit their new window size instantaneously.

## Installation

We'll use [Drush](http://drush.ws/), a Drupal cli, to install the modules and their dependencies, and to enable them.

Picture has two important dependencies:

- The [Breakpoints](https://www.drupal.org/project/breakpoints) module, which will keep its eye on the browser window size
- The [Chaos Tool Suite](https://www.drupal.org/project/ctools), which gives us lots of handy development tools and APIs

Drush will handle the dependencies for you; just navigate to your site root and type:

~~~bash
drush en picture -y
~~~

We'll also want the Media module:

~~~bash
drush en media -y
~~~

(In the above commands, `-y` just tells drush to assume "yes" for any requests for confirmation.)

## Setting Up Breakpoints

Breakpoints can be found under Configuration > Media > Breakpoints. Each breakpoint needs a name and a [media query](http://css-tricks.com/resolution-specific-stylesheets/). Optionally, you can enable [Retina display](http://www.sitepoint.com/support-retina-displays/) handling for each breakpoint.

![breakpoints-example-0.png]({{ site.baseurl }}/assets/images/blog/breakpoints-example-0.png "Three breakpoints with basic media queries")

Note that the smallest breakpoint is set to a `0px` minimum. This ensures that arbitrarily small screen sizes will be accommodated.

### Ordering

The order in which the breakpoints appear is the order your breakpoint group will check their media queries. The example configuration uses minimums in decreasing order, which is preferable for responsive image design. If a breakpoint query fails (if the screen width is below the minimum), the next breakpoint down the line will be checked. Make sure you get this order right; once you pull these breakpoints into a group, their order cannot be edited; you'd need to delete the breakpoints and their group and start over.

### Groups

Click 'Add a new group' to define a Breakpoint Group. The ordering on this screen will match the order defined by weights in the previous step.

![breakpoints-example-1.png]({{ site.baseurl }}/assets/images/blog/breakpoints-example-1.png "A simple breakpoint group")

Note that once a breakpoint has been added to a group, it _cannot_ be edited.

## Responsive Styles

This is an optional step provided by the Breakpoints module; it's essentially a wizard which makes copies of a preexisting image style, one for each selected breakpoint. If you have some image style effects you want to apply everywhere (desaturate, perhaps?), this can be a handy time saver. For general use, it's not really necessary.

## Image Styles and Picture Mappings

Set up an image style for each breakpoint under Configuration > Media > Image Styles. For general use, these can be equal to or slightly less than the minimums of the associated breakpoints; for more complex layouts, id est columns, these might instead be set to match the behavior of the column widths.

![image-styles-example-0.png]({{ site.baseurl }}/assets/images/blog/image-styles-example-0.png "Three basic image styles") 

Picture Mappings are found under Configuration > Media > Picture Mappings. First, associate the new Picture Mapping with our Breakpoint Group.

![picture-mappings-example-0.png]({{ site.baseurl }}/assets/images/blog/picture-mappings-example-0.png "Setting the breakpoint group of a picture mapping")

Now that the Picture Mapping has a Breakpoint Group, each breakpoint can be associated with an image style. Populate these with the image styles defined previously, and hit Finish.

![picture-mappings-example-1.png]({{ site.baseurl }}/assets/images/blog/picture-mappings-example-1.png "Picture mapping configuration")

## File Type Display

Under Configuration > Media > File Types, select Images -> Manage File Display. Enable the Picture display mode, and select the Example Group.

![file-display-examples-0.png]({{ site.baseurl }}/assets/images/blog/file-display-examples-0.png "File display settings")

## Content Type

Now we're ready to create a node type with a responsive image field.

Make a content type and add a File field with the Media File Selector widget. Make sure that the field permits the image format file extensions you plan to use; by default it only allows `*.txt`.

![responsive-content-type-examples-0.png]({{ site.baseurl }}/assets/images/blog/responsive-content-type-examples-0.png "Node content type") 

Under Manage Display, make sure that the responsive image field is set to the Rendered File display formatter, which will connect the field to the file display mode we set earlier.

## The End Product

We're done! Create a node with the example content type, add an image, and start dragging the corner of your window around. The image should resize as the window width passes between breakpoints.

![responsive-image-examples-0.png]({{ site.baseurl }}/assets/images/blog/responsive-image-example-0.png "Medium image") 

![responsive-image-examples-1.png]({{ site.baseurl }}/assets/images/blog/responsive-image-example-1.png "Small image") 

## The Benefits

There are several advantages to responsive web design, some of which are particular to image loading.

* Controlled, consistent user experience across devices
    * Without clear knowledge of how our sites will be viewed, we cannot effectively design them to meet user needs.
* Ease of navigation
    * Never let important elements render offscreen.
* Bandwidth conservation 
    * Don't send a 4k image to a QVGA-screen phone that doesn't need it.
* Code it once 
    * No need to build a secondary mobile site.
* SEO optimization 
    * Every node has one canonical URL, so Google won't split its results between mobile and desktop versions (which could easily drop your site to the dreaded second page of search results)!
* Shareability
    * A bad example: [Wikipedia](http://en.wikipedia.org/wiki/Drupal). Take a look at how different its [mobile version](http://en.m.wikipedia.org/wiki/Drupal) looks. If a mobile user posts an interesting article to Twitter, for example, both desktop and mobile users following the link will be hit with the mobile version, regardless of their device. With a single-URL responsive design, this is a nonissue.

## Resources

- [Picture module project page](https://www.drupal.org/project/picture)
- [Breakpoints module project page](https://www.drupal.org/project/breakpoints)
- [Live demo of Picture module on Drupal 7](http://picture7d.h011.attiks.com/node/1)
- [The Picture element proposal document](http://picture.responsiveimages.org/)
