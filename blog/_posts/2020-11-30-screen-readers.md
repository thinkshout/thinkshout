---

layout: blog
body-class: blog-post
topic: 
- accessibility
- "Technological Innovation"
campaign-topic: accessibility
title: "Talking to Screen readers with ARIA-live and Drupal.announce()"
homepage: true
author: jules
published: true
featured: false
short: "If content changes on your site and there’s a visual change to let users know, you need to make that change clear to folks who can’t see the visual cues. Drupal.announce is a JS method built into Drupal core that can make this easy."
tags:
  - accessibility
  - "web development"
  - technology
  - drupal
date: 2020-11-30 11:00:00
image: https://thinkshout.com/assets/images/blog/open.jpg
header-image: /assets/images/blog/open.jpg
header-image-alt: "neon open sign."
---
# ARIA-live and Drupal.announce(), a11y-friendly JS in Drupal Core.

## Drupal.announce is a method built into Drupal core that can make writing accessible code easier.


### Why you need it.
If content changes on your site and there’s a visual change to let users know, you also need to make that change clear to folks who can’t see the visual cues -- Drupal.announce allows you to do just that. 

#### When should things get announced to a screen reader?
- An error has happened and you need to let the user know.
- An infographic shows new data points when you select different values from a dropdown. 
- Tabbing is constrained. 
<br /> 

### Here’s how to use it:

#### Add it as a dependency.
In your project’s theme directory, go to the theme.libraries.yml file and add Announce as a dependency. 

*8[theme].libraries.yml*
```
dependencies:
   - core/drupal.announce
```  
 
#### Drupal.announce()
Drupal makes this easy. Use the announce function right in your javascript file at the moment the content or context changes. The screen reader will read the message you pass in, communicating the change and creating a better experience for the user. 

Drupal.announce() has a politeness setting, which determines whether the screen reader should read your message update before anything else, or read it in the order in which it appears. The options are ‘polite’ and ‘assertive’. If no value is passed into the function, ‘polite’ is used by default. I recommend using the default polite setting, because manners count -- even in code. 

**Drupal.announce('My message', 'polite')** is the same as **Drupal.announce('My message')**
If nothing is passed in, the default setting of “polite” is used, which will read the announcement in the order it appears on the page. 

**Drupal.announce('My message', 'assertive'’)**
For updates that should be read immediately, use "assertive". 

**Drupal.announce with translations**

*In your .js file*
```
Drupal.announce(
  Drupal.t("Why, hello there!")
);
```
<br /> 

### How it works

In the browser, you can inspect the code to see the changes. Search for ‘aria-live’ to locate the div at the bottom of the page. When your content changes dynamically, if you added the Drupal.announce function in your javascript file, you should see the message update.

***Before the content is updated, the div is empty. You don’t need to add this div, Drupal does it automatically.***
```
<div id="drupal-live-announce" class="visually-hidden" aria-live="polite"
aria-busy="false"></div>
```
***After the Drupal.announce() function runs, the message is inserted.***
```
<div id="drupal-live-announce" class="visually-hidden" aria-live="polite"
aria-busy="false">Tray orientation changed to vertical.</div>
```

The aria-live div must first be present (and usually empty), so that the browser and assistive technologies(AT) are aware of it. Any subsequent changes are then announced to the user. When Drupal. announce() runs, it updates the contents of the div with the new message, triggering an announcement. 
<br /> 

### Using ARIA-live without Drupal

This functionality can be added to non-Drupal sites by just adding a div with the aria-live property, hiding it, and using javascript to update the content in the div when you need to communicate a message to the user.

***After the Drupal.announce() function ran, the message was updated.***
```
<div class="hide-me" aria-live="polite"></div>
```

You can also add `aria-live="polite"` to content on your page that is updated by the user. You can see this on the [SPLC hate map](https://www.splcenter.org/hate-map). If you select a different state, the number of hate groups changes. This change is announced to the screen reader because the heading has an aria-live property on it.  

```
<h1 id="hate-map-title" aria-live="polite">In 2019, we tracked 940
hate groups across the U.S.</h1>
```

![hate map announcement using aria-live](/assets/images/blog/access.1.png)

<br /> 
<br /> 
<br /> 


## Resources

- [W3.org](https://www.w3.org/TR/WCAG20-TECHS/ARIA19.html)
- [Drupal.org](https://www.drupal.org/docs/8/api/javascript-api/accessibility-tools-for-javascript-in-drupal-8)
<br /> 
<br /> 

---
