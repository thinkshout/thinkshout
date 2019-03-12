---
layout: blog
body-class: blog-post
title: Supporting Young Inventors with RedHen
author: jaymz
published: true
featured: false
short: "We built a brand new Drupal-based tool for Lemelson-MIT InvenTeams."
tags:
  - Engagement Tools
  - RedHen
  - Drupal Planet
  - Drupal
  - Slideroom
  - Lemelson-MIT
date: 2015-12-09 23:00:00
image: /assets/images/thinkshout-logo.png
topic: technology

---

We always talk about [RedHen](https://www.drupal.org/project/redhen) as a Customer Relationship Management framework. When you install RedHen in your Drupal site, you get the basic building blocks of a CRM. Your job is to get to work defining fields, connecting entities, and building out everything you might imagine you’d like a website-integrated CRM to do. We recently partnered with the the [Lemelson-MIT](http://lemelson.mit.edu/) Program at the Massachusetts Institute of Technology, who needed all of these building blocks. The Lemelson-MIT Program celebrates outstanding inventors and inspires young people to pursue creative lives and careers through invention. They had a vision to create an integrated experience within their Drupal site specifically for educators and students associated with their InvenTeam program. This was a perfect fit for the RedHen framework.

Through the [InvenTeams](http://lemelson.mit.edu/inventeams) initiative, the Lemelson-MIT Program awards annual grants of up to $10,000 each to teams of high-school students, teachers and mentors to invent technological solutions to real world problems. They needed a system for managing years of CRM data for all of their programs, including all of their InvenTeam grant winners. Because Lemelson-MIT already had a fresh Drupal 7 site, this wasn’t a typical site build. We integrated a brand new RedHen application for managing InvenTeams into their existing website. We linked InvenTeams to contacts using RedHen Relation, and defined standard Drupal fields for contacts, teams, and relationships. We also linked educator and student profiles to schools, which was a great fit for RedHen Organization.

![lemelson_mit_1.png]({{ site.baseurl }}/assets/images/blog/lemelson-mit-roster.png)

Participants who log in are presented with a dashboard customized for the team that they are associated with. Team members can view a team roster, and educator administrators can manage their roster by adding new members or changing member roles. Team members’ most recent blog posts are featured on the dashboard, and blog posts are linked to individual RedHen contacts. This gives InvenTeam participants a chance to share out about the experience that they have had with the program, and post progress updates about their invention.

![lemelson_mit_2.png]({{ site.baseurl }}/assets/images/blog/lemelson-mit-finances.png)

Since InvenTeams are working against a set amount of grant money for their project, they need a way to track that financial information associated with their team. We built a general ledger within the RedHen application, which updates a display showing the remaining funds left to spend against the grant total. Educators and students who are in charge of tracking finances can log transactions with a receipt or request pre-approval for purchases. Financials are flagged for a Lemelson-MIT administrator in an administrative back-end, and they can approve purchases or write notes attached to individual transactions.

We also built a document management system for Lemelson-MIT to gather forms and progress updates from the teams within the application. Lemelson-MIT is able to broadcast important documents, as well as share documents back and forth with individual teams. Leaning on Drupal’s powerful admin features, we built an administrative backend for Lemelson-MIT to manage those documents, as well as financial transactions and the teams themselves. RedHen made this easy thanks to its own native administrative interface unified with the rest of the admin tools that we created specifically for this site.

![lemelson_mit_3.png]({{ site.baseurl }}/assets/images/blog/lemelson-mit-documents.png)

A big challenge for any organization getting started with a CRM is how they’re going to set up a sustainable process for getting data into the CRM. Often this is a manual data entry process, which we all know can be painful. RedHen can help ease the pain with its integration directly into your Drupal website. It’s able to attach itself to user accounts, email list sign up, event registrations, and so on. Lemelson-MIT had a unique challenge because a large portion of its CRM data is housed in SlideRoom, which is an external application - not integrated with their website.

Lemelson-MIT uses [SlideRoom](http://www.slideroom.com/) for managing its InvenTeam grant application process. We didn’t want to recreate SlideRoom in Drupal, but we also didn’t want to require a bunch of manual data entry if we could help it. So we built a [SlideRoom Drupal module](https://www.drupal.org/project/slideroom) and a [SlideRoom API Wrapper for PHP](https://github.com/thinkshout/slideroom-api-php), which connect Drupal to the SlideRoom API. You can use these today! Paste in an API key and implement a couple of Drupal hooks, and your SlideRoom data is all available to you directly in your Drupal site. For Lemelson-MIT, we wrote a little bit of code to periodically scoop up that valuable CRM data and create contact entities attached to schools. This bridges a data silo to Lemelson-MIT’s Drupal site, and has become an important part of their workflow from accepting InvenTeam applications, to eventually forming a team of young inventors. All that’s left is to let that creativity loose, and get started inventing!

Using RedHen as a Customer Relationship Management framework, we were able to capture the unique requirements for the Lemelson-MIT Program. We tied CRM data tightly into their Drupal website, and linked records directly to applications in SlideRoom. Building on top of the RedHen framework enabled us to provide immediate value for educators and students in the InvenTeam program, as well as Lemelson-MIT staff. We are inspired by these young people who are crafting inventions that aim to solve real world problems, and we’re proud to have built an application that supports their work.
