---
layout: page
title: Senior Software Engineer Coding Test
description: "Want to work at ThinkShout? Take this test!"
slug: senior-coding-test/
---

In order to evaluate your Drupal skills, we'd like you to write a Drupal 7 module that satisfies the following requirements:

- Depends upon the [Entity API](https://www.drupal.org/project/entity) module to provide structure and scaffolding for entity CRUD operations.
- Define a custom entity type called `blog` with the following properties. The entity can support either a single default bundle, or multiple bundles.
  - Title
  - Author UID, which is a foreign key to the user.uid.
  - Created timestamp
  - Updated timestamp
- Add a body _field_ to the entity that supports a summary/teaser.
- Provide an admin interface for managing the structure of our new entity.
- Provide a content management interface for creating, viewing, editing, and deleting instances of our entity.
- Provide a callback and URI for viewing instances of our blog entity.
- Create a landing page listing our blog entries.
  - Use [Entity Field Query](https://api.drupal.org/api/drupal/includes%21entity.inc/class/EntityFieldQuery/7) to get a list of blog posts.
  - Show 10 items per page with a pager.
  - The page can be a simple unordered list of title and summaries.

Please post the module code to GitHub or a Drupal.org sandbox project. While there is no time limit on the test, how long it took to complete, measured from first to last commit, will be a factor.

The goals of this test are to measure your ability to:

- Create a custom, fieldable, entity type in code.
- Work with the Field API.
- Use Entity Field Query.
- Strike a reasonable balance between leveraging core and contrib APIs and writing custom code.

Good luck and thanks for your interest!
