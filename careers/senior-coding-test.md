---
layout: page
title: Senior Software Engineer Coding Test
description: "Want to work at ThinkShout? Take this test!"
permalink: /careers/senior-coding-test/
---

In order to evaluate your Drupal skills, we'd like you to write a Drupal 7 module that satisfies the following requirements:

- Depends upon the [Entity API](https://www.drupal.org/project/entity) module to provide structure and scaffolding for entity CRUD operations.
- Define a custom entity type called `blog` with the following properties:
  - Title
  - Author UID, which is a foreign key to the user.uid.
  - Created timestamp
  - Updated timestamp
  - Body, which can be a field or a property, that supports summaries and rich text.
- Provide an admin interface for managing the structure of our new entity.
- Provide a content management interface for creating, viewing, editing, and deleting instances of our entity.
- Provide a callback and URI for viewing instances of our blog entity.
- Create a landing page listing our blog entries.
  - Use [Entity Field Query](https://api.drupal.org/api/drupal/includes%21entity.inc/class/EntityFieldQuery/7) to get a list of blog posts.
  - Show 10 items per page with a pager.
  - The page can be a simple unordered list of title and summaries.

Please post the module code to GitHub or a Drupal.org sandbox project. While there is no time limit on the test, how long it took to complete, measured from first to last commit, will be a factor.

Good luck and thanks for your interest!
