---
title: Reimagined Sprints and Introducing RedHen Raiser
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: jaden
published: true
featured: false
short: Great team sprints lead to great team accomplishments.
tags:
- Drupal
- Nonprofit Tech
- Drupal Planet
- RedHen
- RedHen Donation
- RedHen Raiser
- Drupal Commerce
- Team Sprints
- Fundraising
date: 2015-01-28
---

![raiser_0.jpg]({{ site.baseurl }}/assets/images/blog/raiser_0.jpg)

We’ve been experimenting with monthly team sprints at ThinkShout over the last year with varied levels of structure and outcomes. This month, we decided to take a step back, reevaluate our goals, and reimagine our sprint process. And, we moved it to a Thursday. [A bow-tie Thursday](https://twitter.com/thinkshout/status/558334360416305152).

Previously, these sprints were loosely structured around a topic or technology, such as [Twig in Drupal 8](https://www.drupal.org/theme-guide/8/twig). Suffice it to say, they were a lot of fun and very exploratory, but they weren’t the most engaging for everyone on the team. This time around, we decided to collaborate on a single initiative - in this instance, a product - that would benefit from the skills and perspectives of everyone in the company. Consequently, we decided to rally around [RedHen Raiser](http://drupal.org/project/redhen_raiser), our new peer-to-peer fundraising distribution for Drupal. 

### Introducing RedHen Raiser

![raiser_1.jpg](/assets/images/blog/raiser_1.jpg)

RedHen Raiser is designed for building peer-to-peer fundraising websites, like the sites you see for marathons and walks, where a fundraising campaign is made up of myriad individual and team pages, and can be customized by the participants for fundraising amongst their respective communities, while remaining connected to the larger campaign.

As the name suggests, RedHen Raiser is built on top of [RedHen CRM](https://www.drupal.org/project/redhen), including the [RedHen Donation](http://drupal.org/project/redhen_donation) and [RedHen Campaign](http://drupal.org/project/redhen_campaign) modules, and it’s chock full of awesome:

* Easy Campaign creation so site visitors can join right away by creating their own Team or Individual fundraisers.

* A beautiful, consistent fundraising experience that is based on inherited display values from the larger Campaign.

* Goal progress widgets including thermometers, leaderboards, etc.

* Mini-blogs for Campaigns and Fundraisers via Update content type.

* Ability to create and maintain different pages for different fundraisers with a single account.

* Automated start and end dates.

* Commerce-readiness - just add your payment method and go!

* Single-page donation forms via RedHen Donation.

* Built using established modules with simple UI (Views, RedHen, Context, etc) for easy customization.

It’s ThinkShout’s latest offering in a suite of nonprofit engagement building blocks that we’ve been developing, and was initially developed for the [Capital Area Food Bank of Washington, DC](http://www.capitalareafoodbank.org/). RedHen Raiser competes feature for feature with top *software as a service (SaaS)* peer-to-peer fundraising platforms, such as TeamRaiser, CauseVox and Razoo. 

As a result of our work with this client, we were able to release a very rudimentary version of RedHen Raiser on Drupal.org that would provide a basic starting point to other developers interested in building a peer-to-peer fundraising tool. The product is also a huge win for CAFB of DC, simply because they were able to reap a huge dividend on their initial investment by getting these improvements for free.

### Involving the Full Team in One Sprint

![raiser_2.jpg](/assets/images/blog/raiser_2.jpg)

As an open source *product*, RedHen Raiser presented us with some interesting opportunities to engage more than just our engineers in the sprint process, and it certainly needed a lot of love on a lot of fronts. Leveraging the different interests and expertise of our 18-person company, we split into five teams:

* **Dev Ops** - this team focused on deployment infrastructure, build processes, and automated testing;

* **Bug Fix & Feature Dev** - team members spent the sprint day working on the development backlog;

* **UX** - the User Experience team worked ahead of the feature development team to identify and sketch out new features and enhancements;

* **QA** - the Quality Assurance team was made up of our project managers acting as "product owners;"

* **Community Engagemen**t - this team, consisting of our sales, marketing, and operations staff, was tasked with documenting the sprint and sharing our contributions with the wider Drupal and nonprofit technology communities.

It’s worth noting that the quality assurance team and the community engagement team came together for the first half of the sprint for an in-depth training on the Drupal contributed modules and components underlying RedHen Raiser. Ironically, we often get so busy building these sorts of tools for our clients that we don’t stop to educate our own "non-developer" team members on how stuff works. By taking this time to dive into the nitty gritty with our project managers, marketing and operations folks, we create better advocates for these solutions and help ensure that everyone in the company feels like contributor to our success.

### Planning for the Sprint

![raiser_3.jpg](/assets/images/blog/raiser_3.jpg)

As ThinkShout has grown, the need for sprint planning has grown with it. Back when we first started these sprints, we could fit our entire team around a single table (covered in pizza boxes and beer) and call out development tickets we each needed help with. 

Now, with a team of 18 working together from 11am to 5pm, these sprints take a bit more planning - to say nothing of balancing the opportunity cost of investing a collective 108 hours of non-client work into a single week. To keep things running smoothly, we’ve taken a more project-planning-esque approach to our sprint days:

* **Scheduling in advance**: The date and time of the sprint is scheduled a month in advance. We used to just stick with the last Friday of the month, but found that this sometimes excluded certain team members on deadlines or vacation. Now, we coordinate a bit more tightly to help ensure participation of as many team members as possible.

* **Laser focus**: the focus of the sprint is announced to the team three weeks in advance. This gives the team time to think about stuff they want to work on, and add to the feature backlog in the weeks coming up to the sprint.

* **Pre-sprint planning meetings**: The department leads meet a week before the sprint to form teams and structure the sprint agenda, and prioritize the development/feature backlog two days in advance of the sprint.

* **Pre-sprint presentations**: The week before the sprint, we do a short, company-wide presentation on the sprint topic at our weekly staff lunch. This helps energize the team and sparks knowledge sharing in the lead up to the sprint day.

* **Formally "opening" and “closing” the sprint day**: As our sprint commences, we kick things off with a quick, all-staff scrum. More importantly, we pull the team back together at the end of the day for each sprint team to present (and celebrate!) what they’ve completed.

### Outcomes of Our RedHen Raiser Sprint


![raiser_4.png](/assets/images/blog/raiser_4.png)

So what does it all mean? This new approach to our team sprints resulted in just shy of 100 commits on RedHen Raiser and the underlying modules that power the distribution. We published a [new release](https://www.drupal.org/node/2414581) of RedHen Raiser, [RedHen Donation](https://www.drupal.org/node/2413307) and the [RedHen Campaign](https://www.drupal.org/node/2414563) modules - as well as a release of our base [RedHen CRM](https://www.drupal.org/node/2414559)[ suite](https://www.drupal.org/node/2414559). 

One of the biggest wins to come out of the sprint are [automated tests](https://github.com/thinkshout/redhen_raiser/tree/7.x-1.x/tests) powered by [Behat](http://docs.behat.org/en/v2.5/). Tests are triggered with every commit to GitHub and run on [Travis CI](https://travis-ci.org/thinkshout/redhen_raiser). At this point, test coverage is a bit limited, but the foundation has been laid for complete test coverage for RedHen Raiser, a critical factor when organizations are evaluating which software to use.

To top it off, we cleaned up a few RedHen project pages on Drupal.org and began working on a RedHen-specfic QA testing plan. We also reached out to the RedHen open source community to let them know what we were up to and how folks can continue to get involved. Most of all, we are proud to say that this effort is a huge contribution to the nonprofit tech community, in that it provides major improvements to a powerful tool that can be leveraged for free - and has the documentation to support it!

All in all, the ThinkShout team came together in a big way, and accomplished much more than we could have if we had remained siloed in our approach. We had a lot of fun, drank some beer, ate some good food, and got to collaborate as a whole team on something really cool. We’re really looking forward to the next one!
