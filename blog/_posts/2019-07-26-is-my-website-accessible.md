---
layout: blog
body-class: blog-post
topic: technology
title: "Is My Website Accessible?"
homepage: true
author: jules
published: true
featured: true
short: "You know how important accessibility is, but now what?"
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
  - Javascript
  - Content Editors
date: 2019-07-26 11:00:00
image: https://thinkshout.com/assets/images/marquee/brailfail.jpg
header-image: /assets/images/blog/brailfail.jpg
header-image-alt: "A printed piece of paper that says Welcome in braille"
---
[You know how important accessibility is](https://thinkshout.com/blog/2018/05/Space-for-Empathy/), but now what?

_Is_ your website accessible?

How do you find out?

Well, it’s not as hard as it seems&mdash;and we’re here to help! Here are a few quick ways to measure the accessibility of your website.

## 1. Automated accessibility tests

While automated tools will only catch about 30% of accessibility bugs, they will give you a general idea of your site's accessibility and show you some ways to make improvements.

### Lighthouse: Chrome’s Accessibility Reporting Tool
Lighthouse is a free tool available right in Chrome. You can use it by simply using chrome's testing website, in your development tools when you inspect a page, or with a browser plugin. Keep in mind that manual testing is also required to get a full picture of accessibility&mdash;we’ll cover that in just a moment.

**To use the tool by going to a URL:**
Visit [https://web.dev/measure](https://web.dev/measure) and paste the URL of the page you want tested into the form field, then click “Run Audit” to see results.

**To use the tool through inspect**

1. Right click on the webpage you want to test, and select “Inspect” from the dropdown or from your keyboard press `command + option + I`. This will open the inspect tool and bring up the last tool you used, so if the last thing you did was run an audit, it will bring you back to the audits panel.<br><br>
![Dropdown menu: Inspect](/assets/images/blog/a11y.1.png)<br><br>
2. In the inspection window at the top right, click on the button with a double arrow, or expand the window until you see “Audits.” Select “Audits.”
![Dropdown menu: Audits selected](/assets/images/blog/a11y.2.png)<br><br>
3. Select your device size (mobile or desktop), and select “Accessibility” from the Audit Type options.
4. Click “Run Audits.”
5. A report will pop up in the inspect window with your overall score with information about your score results. Scores are out of 100, and 100 does not mean that a site is completely accessible--it means that it passed all automated tests.
![Lighthouse score display](/assets/images/blog/a11y.3.png)


### WAVE: Firefox and Chrome Extension
WAVE is a browser extension that allows you to run an automated accessibility test on a page of your website.

**To use WAVE:**
1. Install the WAVE Extension
  - For Chrome: [https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US)
  - For Firefox: [https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)
2. Go to the webpage you want to test, and click on the WAVE icon in the tools portion of your browser window. A report will pop up and your page will be marked up with the results of the review.<br><br>
![Website in brower, with WAVE icon in toolbar](/assets/images/blog/a11y.4.png)<br><br>
3. A Summary will show up by default listing the number of Errors, Warnings, and other details on the page.<br><br>
![WAVE tool sumary screen](/assets/images/blog/a11y.5.png)<br><br>
4. Click on the Flag icon to see more details. This will include information about what errors are on the page<br><br>
![Wave tool details tab](/assets/images/blog/a11y.6.png)<br><br>
5. Clicking on the Tab at the bottom of the page that says “< code >” will show you the code marked up with the errors found.
6. With the “< code >” tab open, you can click on the errors and warnings in the panel on the left to jump to the errors in the code. In the image below, clicking on the yellow rectangle “Redundant Link” icon in the report panel makes the code jump to the offending code.<br><br>
![WAVE tool with code drawer open below website](/assets/images/blog/a11y.7.png)<br><br>


## 2. Manual accessibility tests

A manual test will catch things automated tests can’t quite figure out. Robots are good for some things, but they can’t figure out human intention, so things like tab order, visual theming and good alt tags should be manually tested.<br><br>
![A toy robot from the 1950's](/assets/images/blog/a11y.8.jpg)<br><br>

**Keyboard testing** makes sure that the site works for folks who are blind, who have low vision, who have limited mobility, or the person whose trackpad is broken. Conduct the following tests to see if your site is accessible to those using a keyboard to navigate:

1. Go to the page you’d like to test. Start with your cursor in the address bar, and hit the “tab” button to navigate through the page. Each time you press tab, you should be moved to the next button, link or form input.
2. Ideally, the first link you get to on the page is a “skip to main content” link that allows users to skip repeated navigation items.<br><br>
![Webpage showing 'Skip to Main Content' link](/assets/images/blog/a11y.9.png)<br><br>
3. As you continue to tab through the page, you should be able to see where the focus is as it lands on each button, link and form field. Pro-tip: If you lose track of where it is because there’s not a visual indication that’s an accessibility issue.
4. Check the order: Does pressing the tab key follow the natural flow of the page, or does it jump around? A good tab order follows the natural flow.
5. Can you operate all menus, pop-ups, buttons, and forms?
7. Can you press `shift tab` and navigate backwards?
6. Are there items that are clickable that don’t receive focus?

**Important Note: Keyboard testing needs to be done on mobile as well as desktop.** Why? Some users who are blind don’t use full-sized computers or laptops because they don’t actually need a large display. Other users have low vision and magnify their screens. Which leads us to testing with zoom...

## 3. Testing with zoom

If you zoom a desktop screen to 400% on a responsive site you get...the mobile site! This is why testing on mobile and desktop is important.

Now that you’ve increased the screen to 400%, browse the page. As you browse ask yourself:

1. Does text content get cut off?
2. Do buttons get pushed off of the page?
3. Is the functionality intact?
4. Is there key functionality on desktop that's no longer available on the mobile version?

## 4. Testing with a Screen Reader
Using a screen reader is a more advanced testing approach, and very helpful in identifying accessibility bugs on a site. If you use a mac, VoiceOver is the built in screen reader. To turn VoiceOver on or off, press `command f5`. Here’s a quick video tutorial on how to test your page using VoiceOver. The video description includes the full text of the captions as a quick reference. <br><br>

<iframe title="Mac screenreader 101 for QA and Development" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" type="text/html" src="https://www.youtube.com/embed/gXp3MLYOWb0?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe><br>

You can also turn on VoiceOver and tab through the page again to see if icon buttons are labeled properly, if the form labels you’ve applied make sense, and if alt tags on images are useful. If you press “control option a” all at once, VoiceOver will start reading every element from where you are on the page. If you tab, it will read the buttons, links and form inputs.

### To sum it up:

Learning about different testing methods can help inform and add clarity to the process of making your site accessible. This is one of the most critical steps in your journey to making a website that everyone can experience. If you want to know how to transform these errors into a site that reads and navigates smoothly for all users, ThinkShout is here to help! Contact us to learn more about how we can partner to make your website more accessible - progress starts now!
