---
layout: blog
body-class: blog-post
topic: technology
title: RedHen gets Engaged
homepage: false
author: joe
published: false
featured: false
short: Help your nonprofit meet it's strategic goals with the RedHen engagement module.
tags:
  - Drupal Planet
  - Drupal
  - RedHen
  - CRM
  - Non-profit
date: 2017-12-05 08:20:00
image: https://thinkshout.com/assets/images/ts_icon.jpg
---

One of the early features built into the [RedHen CRM suite](https://www.drupal.org/project/redhen) is the engagement submodule. Recently, ThinkShout had the opportunity to implement this for our philanthropic education client [Learning To Give](https://www.learningtogive.org/).

RedHen Engagement 'Provides an engagement scoring system which integrates with RedHen Notes and with [Rules](http://drupal.org/project/rules) for popular modules like [Registration](http://drupal.org/project/registration) and [Webform](http://drupal.org/project/webform).' This means that you can set up a fully customized scoring system using Rules, and measure user engagement over time, with the exact metrics your organization needs.

Creating the scores is simplicity itself - just enable the RedHen Engagement submodule (already installed if you have RedHen!), and start adding the scores:

![RedHen Engagement Rules](/assets/images/blog/ltog-redhen-rules.png)
{:.center}

There's only two fields - name and score. The next step is a bit more complex - using those scores in the Rules module. 'User Logs In' will be our first example, as it's one of the easiest to follow:

![RedHen Rules Page](/assets/images/blog/ltog-redhen-rules2.png)
{:.center}

## Rules of Engagement

Rules uses three parameters: Events (something happens), Conditions (filters), and Actions (what to do if there's a match).

![RedHen rules: Event](/assets/images/blog/ltog-redhen-rules4.png){:.right .fifty}In the case of 'User Logs In', it's pretty simple - there's already an _event_ called 'User has logged in', and there's no _condition_ needed.

<br class="clear">

![RedHen rules: Action](/assets/images/blog/ltog-redhen-rules3.png){:.left .fifty}
The _action_ is where you select the RedHen Engagement rule, in this case we chose 'Score engagement by email'.

From there you set the Entity and Email Data Selectors. For this case, set the Entity to `account` and the email to `account:mail`. This is a pattern that you'll repeat in other RedHen Engagement rules, which is why we've used it here in this simple example.

Other variations (depending on the Action) are `site:current-user/site:current-user:mail`, `user/user:email` or even `comment/comment:mail`. The thing to look for is an _entity_ that can be matched to the _user_ who took the action.

Some of these rules require an extra module to work - in the case of the 'Rate a lesson' rule for example, we added the [Voting Rules](https://www.drupal.org/project/voting_rules) module, which provides Rules integration for the VotingAPI module.

![RedHen Rules Page: Rate a Lesson](/assets/images/blog/ltog-redhen-rules5.png)
{:.center}

In this 'Rate a Lesson' rule, we have a _Condition_ wherein the `site:current-user` votes on a node (rates it). It's a Negated condition, because we want it to pass when someone has _not_ voted on given node yet. Then we take two actions - scoring the engagement, and then registering the vote on that node. That way, a user who changes their rating won't count as another engagement.

## You've Got Scores - Now What?
