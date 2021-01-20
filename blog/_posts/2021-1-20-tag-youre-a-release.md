---

layout: blog
body-class: blog-post
topic: 
- "Technological Innovation"
campaign-topic: "technological innovation"
title: "Tag! You're a Release!"
homepage: true
author: joe
published: true
featured: false
short: "What's the difference between git and GitHub? What's a repo? How is a release different from a deployment? How are tags and releases related?"
tags:
  - github
  - "version control"
  - technology
  - git
  - DevOps
  - "History of the Web"
date: 2021-01-20 11:00:00
image: https://thinkshout.com/assets/images/blog/tag-hero.jpg
header-image: /assets/images/blog/tag-hero.jpg
header-image-alt: "Balloons being released"
---
## Past Self, Please be Kind to Future Self

What's the difference between git and GitHub? What's a repo? How is a release different from a deployment? How are tags and releases related? 

***Why is this all so confusing?***

Building and maintaining a website used to be so much simpler. The site's files sat on a server, and when you wanted to update it you'd just use an FTP client to push files up. Then people started making templates, so you only needed to push a few files up. But if something broke, it would break the entire site. Then you had the problem of how to reverse the changes you made; keeping track of things got progressively harder.

Smart folks with software development backgrounds started using version control software [such as CVS](https://en.wikipedia.org/wiki/Concurrent_Versions_System) (no relation to the pharmacy chain) to keep track of changes to the website code. Over time, as websites grew in complexity and more people worked on a site concurrently, it became essential, so people working on one part of the site didn't break something that someone else was doing. This is part of *parallel feature development*.

Most of the early version control software had at least one major drawback—whether it was client-server based (meaning you couldn’t work offline), it didn't give you the entire repository, it was insecure, or it was painfully slow and didn't scale. And worse? Much of it was privately owned so access to it could be revoked. 

This is exactly what happened to the Linux kernel. So Linus Torvalds, curmudgeon and creator of Linux, decided to make something better—something that was deliberately opposite of all of the other version control software at the time (2005). He made [Git](https://en.wikipedia.org/wiki/Git) (warning, the page, much like Torvalds, contains profanity).

Git is often the source of developer's ire, but compared to every other version control software *it's amazing*. Free, secure, reliable, and best of all, most of the commands are normal words that describe what you're trying to do. You want to pull code in from the original repository to your local repo? `git pull`. If something is in conflict, it will warn you, and mark the code where there is a problem. Compare that with a similar command from CVS: `cvs -qn update -Pd`. 

Git quickly came to be *the* version control software for the free, open-source, and website software communities for all of the reasons listed, but it still only existed as something to use on a per-project basis, usually via the command-line. Each repository was separate, and there was no central way to search for projects, volunteer, etc. 

## Enter GitHub.

![GitHub's mascot, Octocat](/assets/images/blog/original.png){:align="center" height="70%" width="70%"}
<span class="caption"><i class="fa fa-caret-up"></i>GitHub's mascot, Octocat.</span>

There were a number of websites that aimed to leverage Git, but GitHub had the advantage of being well-funded and early—and it has held the advantage by being the largest Git hosting service. Basic services are free, you can see (and work in) all of your repositories on the web, and you can search for, follow, and [fork](https://en.wikipedia.org/wiki/Fork_(software_development)) over 140 million repositories. It also provides a place for documentation, discussion, and task management. Plus, it lets you define a *release*.

To sum up where we are now:

- *git* is our version control software, it tracks changes in code over time in individual repositories (repos). Code in git gets pushed to the live site in a *deployment*.
- *GitHub* is the site where we host our git repositories. It adds a lot of features to help manage that code.
- git allows you to add *tags* — a way to bookmark a point in your code’s timeline. For example, when you deploy a large amount of code. This is usually referred to as a *release*, for example, 'the June 2020 release' (or “v3.1.7” for formal software releases).
- GitHub uses git tags to create a *release page*, and over time your GitHub repo develops a *release history*. 

The release page in GitHub can contain extra information to describe the changes to the code, tickets resolved with the release, documentation, dates, etc. This makes deployments to your website look more like a well-structured software release instead of an ongoing stream of small code deployments that are difficult to track and maintain.

## Embracing Changes (to the CMS)

When your website is running on software such as Drupal, WordPress, or some other content management system (CMS), it usually saves changes to the CMS configuration in the database, *not* in code. Teams that work on CMS-based websites generally figure out how to export those database configs to code during development, so that changes made to the CMS don't have to be manually re-made at every stage of deployment. 

However, once the site is live, changes made on the live site become a problem—if a site administrator makes changes, e.g., to content types, search settings, or content access permissions, those changes need to be saved before the next deploy so they don't get overwritten. 

Having a tagged release is especially helpful for this problem, because it allows you to quickly checkout the code as it was at the time of the last release, download the current live database, and then export those live configuration changes into code for the upcoming deployment.


Once you finish your deployment, you can then tag the release in git, and when you push that tagged code up to GitHub it will allow you to create a release page with all of the details of your latest release. That means future you (or your coworkers!) can have a nice clean starting point for the *next* release. 

**And you should always try to be kind to the future you.**

<br>
<br>

---
