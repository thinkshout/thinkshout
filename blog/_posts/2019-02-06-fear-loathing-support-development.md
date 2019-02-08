---
layout: blog
body-class: blog-post
topic: technology
title: Fear and Loathing in Support Development
homepage: false
author: joe
published: true
featured: false
short:
tags:
  - Drupal Planet
  - Drupal
  - Support
  - WordPress
  - Drupal 8
date: 2019-02-06 12:00:00
image: https://thinkshout.com/assets/images/fade-to-black-header.jpg
---
Consider the following exchange:

<p style="padding-left: 10rem"><em>Project Manager: “Hey Joe, next week we’d like you to add some new features to [client site].”</em></p>

<p style="padding-left: 10rem"><em>Me: “Sure thing! Where is it hosted?”</em></p>

<p style="padding-left: 10rem"><em>PM: “Ah, well… we’re not really sure. We’ve asked the client. The thing is, they haven’t been able to do any work on the site for the last couple of years, because someone built the site for them and then launched it without documentation, and with no support.”</em></p>

<p style="padding-left: 10rem"><em>Me: *Stunned Look*</em></p>

<p style="padding-left: 10rem"><em>PM: “Also, they don’t use any version control. So updates will have to be done via FTP.”</em></p>

<p style="padding-left: 10rem"><em>Me, reeling: “I… I don’t even think I have an FTP client on my computer.”</em></p>

<p style="padding-left: 10rem"><em>PM: “We believe in you.”</em></p>

![Worst Case Scenario](/assets/images/blog/FaL-documentation.gif)
{:.center}

This is a worst-case support development scenario, one likely to bring with it uncertainty and fear. However, with a methodical approach, even the worst case can be turned to your advantage.

### Getting started: Docs and detective work.

The very first thing to do when you have a new support project is to find the [site documentation](https://thinkshout.com/blog/2016/07/the-hidden-power-of-documentation/), or failing that, create a place for new docs. You are in the best position to document the site, because you don’t have any preconceived ideas about what to do - so document everything. Future engineers (and future you) will thank you.

Starting with the site and its hosting, you can reverse-engineer pretty much anything. You can even reverse-engineer the hosting if you need to, using [Robtex](https://www.robtex.com/)! (Find the host, and ask the client to reach out to them for login info).

Once you have the hosting info, you can log in and establish the following:
Are they running backups?
Do they use a database, and is it backed up?
Do they have any version control?
Is there any sort of deployment process?
Do they have a staging environment?

If the answer is ‘No’ to any of the above, then it’s usually pretty easy to add/enable. Once you have a ‘Yes’ for all of the above, update the documentation, password manager, etc. For example, even if they don’t use version control, there’s nothing stopping you from adding it to your local install, and pushing that code to a (now free!) [private GitHub repo](https://github.com/pricing).

From there, you can add user accounts for yourself, and if it’s a CMS-based website such as WordPress or Drupal, log in and start investigating the code.

### Figuring out the code - locally.

It’s always a good idea to do code investigations on a local installation - any tweaks and debug code can be spotted pre-deploy and removed. Make sure you document the process of getting a local installation up and running as well! Example: letting your co-workers know that they should run the WordPress-based  [wp-cli](https://wp-cli.org/) command `wp search-replace client-site.com client-site.localhost` on a newly imported database will save them hours of frustration, as well as preventing terrible accidents from happening (WordPress will quietly redirect you to the live site after logging in if you don’t change the site URLs in the local database. Oopsie!)

Once set up locally, you can start looking for theme-layer build tips. In the root of the project, look for Composer files, (which could indicate an automated build process). A README would also be a good thing to look for - these will often be the hidden documentation for a project.

You should also look for any taskrunner files, such as those used by [Gulp](https://gulpjs.com/) or [Grunt](https://gruntjs.com/), or any other files that you wouldn’t expect to see in a clean install of the CMS.

Next, find the active theme. Usually, you can inspect the website and find paths to the theme from images (WordPress), or the favicon link in the header (Drupal).

Once you’ve located (and documented) the theme location, look in the theme for taskrunners, as well as any README files. If there’s are none to be found, look for a [Sass](https://sass-lang.com/) or [{less}](http://lesscss.org/) directory. [Gemfiles](https://bundler.io/gemfile.html) and [Rakefiles](https://github.com/ruby/rake) will also give hints about the type front-end preprocessors in use, and what the scope of the preprocessor is. If it’s an older site, it might still use a [Compass](http://compass.kkbox.com/)-based framework. If there’s no preprocessor, it might be using vanilla CSS!

Once all of _that_ is done (and documented), you can actually start finding and working on code!

### Where code?

Actually finding code can be tricky - say it’s a WordPress site, and you’ve been asked to add a menu to ‘campaign’ pages across the site. How to find the template quickly?

This is where a codebase searchable [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) is handy. Sites can have tens of thousands of files, and you want to be able to narrow your search. In the case of a WordPress template, you’d limit the search to the theme directory, preferably with a `*.php` file extension. From there, you can look at a campaign page and look for specific classes. In our case, `hero-area campaign`.

Result:

![IDE Search Result](/assets/images/blog/find-result.jpg)
{:.center}
<span class="caption"><i class="fa fa-caret-up"></i>Don't be a hero - use smart search</span>

This site had over 100,000 files! A full search could have taken several minutes instead of the 1-2 seconds it took to search the 244 PHP files in the theme.

From here, you could simply get to work and add the menu, but it can be valuable to run a [codesniffer](https://github.com/squizlabs/PHP_CodeSniffer) against the template. The more it deviates from the coding standard for a particular CMS, the more likely your ‘correct’ code will run into issues. In addition, if the site is ever migrated to an automated deployment environment, it will fail builds that have coding standard filters.

You can also glean a lot about the mindset of the people who built the site - were they careful and clean in their coding style? Did they document/comment code? Did they make the same style errors over and over (like a lone developer would do) or is it random (like a team)?

You can also occasionally make fun discoveries:

<p style="padding-left: 10rem"><em>Me: “OK, I installed the site locally and added the menu to the campaign template. I also noticed a coding error in the ‘related content’ section that was causing it to not display.”</em></p>

<p style="padding-left: 10rem"><em>PM: “Really?  Do they have that on other content on the site?”</em></p>

<p style="padding-left: 10rem"><em>Me: “Yeah, every other content type has it. I suspect it was just an error that snuck in when someone was doing a search-and-replace on the code.”</em></p>

<p style="padding-left: 10rem"><em>PM: “So… how many pages did that impact?”
</em></p>
<p style="padding-left: 10rem"><em>Me: “About 500 or so. It’s been that way for at least the last three years too.”</em></p>

<p style="padding-left: 10rem"><em>PM: *Stunned Look*
</em></p>
