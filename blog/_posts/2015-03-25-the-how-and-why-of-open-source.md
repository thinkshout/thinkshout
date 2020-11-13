---
title: The How and Why of Nonprofits Contributing to Open Source
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

author: sean
published: true
featured: false
short: Let's debunk some open source myths.
tags:
- Development
- Drupal
- Drupal Planet
- Nonprofit Tech
- Open Source
- Feeding Texas
- Leaflet
- RedHen Raiser
date: 2015-03-25
---
*Originally published on February 23rd, 2015 on [NTEN.org](http://www.nten.org/articles/2015/the-how-and-why-of-nonprofits-contributing-to-open-source). Republished with permission.*

For the last 15 years or so, we’ve seen consistent growth in nonprofits’ appreciation for how open source tools can support their goals for online engagement. Rarely do we run across an RFP for a nonprofit website redesign that doesn’t specify either Drupal or WordPress as the preferred CMS platform. The immediate benefits of implementing an open source solution are pretty clear:

* With open source tools, organizations avoid costly licensing fees.

* Open source tools are generally easier to customize.

* Open source tools often have stronger and more diverse vendor/support options.

* Open source platforms are often better suited for integration with other tools and services.

The list goes on… And without going down a rabbit hole, I’ll simply throw out that the benefits of open source go well beyond content management use cases these days.

But the benefits of nonprofits supporting and contributing to these open source projects and communities are a little less obvious, and sometimes less immediate. While our customers generally appreciate the contributions we make to the larger community in solving their specific problems, we still often get asked the following in the sales cycle:

"So let me get this straight: First you want me to pay you to build my organization a website. Then you want me to pay you to give away everything you built for us to other organizations, many of whom we compete with for eyeballs and donations?"

This is a legitimate question! One of the additional benefits of using an open source solution is that you get a lot of functionality "for free." You can save budget over building entirely custom solutions with open source because they offer so much functionality out of the box. So, presumably, some of that saving could be lost if additional budget is spent on releasing code to the larger community.

There are many other arguments *against* open sourcing. Some organizations think that exposing the tools that underpin their website is a security risk. Others worry that if they open source their solutions, the larger community will change the direction of projects they support and rely upon. But most of the time, it comes down to that first argument:

"We know our organization benefits from open source, but we’re not in a position to give back financially or in terms of our time."

Again, this is an understandable concern, but one that can be mitigated pretty easily with proper planning, good project management, and sound and sustainable engineering practices.


### Debunking the Myths of Contributing to Open Source


**Myth #1: "Open sourcing components of our website is a security risk."**

Not really true. Presumably the concern here is that if a would-be hacker were to see the code that underlies parts of your website, they could exploit security holes in that code. While yes, that could happen, the chances are that working with a software developer who has a strong reputation for contributing to an open source project is pretty safe. More importantly, most strong open source communities, such as the Drupal community, have dedicated security teams and thousands of developers who actively review and report issues that could compromise the security of these contributions. In our experience, unreviewed code and code developed by engineers working in isolation are much more likely to present security risks. And on the off chance that someone in the community does report a security issue, more often than not, the reporter will work with you, for free, to come up with a security patch that fixes the issue.

**Myth #2: "If we give away our code, we are giving away our organization’s competitive advantage."**

As a software vendor that’s given away code that powers over 45,000 Drupal websites, we can say with confidence: there is no secret sauce. Trust me, all of our competitors use Drupal modules that we’ve released - and vice versa.

By leveraging open source tools, your organization can take advantage of being part of a larger *community of practice*. And frankly, if your organization is trying to do something new, something that’s not supported by such a community, giving away tools is a great way to build a community around your ideas.

We’ve seen many examples of this. Four years ago, we helped a local nonprofit implement a robust mobile mapping solution on top of the [Leaflet Javascript library](http://leafletjs.com/). At the time, there wasn’t an integration for this library and Drupal. So, as part of this project we asked the client invest 20 hours or so for us release the barebones scaffolding of their mapping tool as a [contributed Drupal module](https://www.drupal.org/project/leaflet).

At first, this contributed module was simply a developer tool. It didn’t have an interface allowing Drupal site builders to use it. It just provided an easier starting point for custom map development. However, this 20 hour starting point lowered the cost for us to build mapping solutions for other clients, who also pitched in a little extra development time here and there to the open source project. Within a few months, the Leaflet module gained enough momentum that other developers from other shops started giving back. Now the module is leveraged on over 5,700 websites and has been supported by code contributions from 37 Drupal developers.

What did that first nonprofit and the other handful of early adopters get for supporting the initial release? Within less than a year of initially contributing to this Drupal module, they opened the door to many tens of thousands of dollars worth of free enhancements to their website and mapping tools.

Did they lose their competitive advantage or the uniqueness of their implementation of these online maps? I think you know what I’m gonna say: *No!* In fact, the usefulness of their mapping interfaces improved dramatically as those of us with an interest in these tools collaborated and iterated on each other’s ideas and design patterns.

**Myth #3: "Contributing to an open source project will take time and money away from solving our organization’s specific problems."**

This perception may or may not be true, depending on some of the specifics of the problems your organization is trying to solve. More importantly, this depends upon the approach you use to contribute to an open source project. We’ve definitely seen organizations get buried in the weeds of trying to do things in an open source way. We’ve seen organizations contribute financially to open source projects *on spec* (on speculation that the project will succeed). This can present challenges. We’ve also seen vendors try to abstract too much of what they’re building for clients up front, and that can lead to problems as well.

Generally, our preferred approach is generally to solve our clients immediate problems first, and then abstract useful bits that can be reused by the community towards the end of the project. There are situations when the abstraction, or the open source contribution, needs to come first. But for the most part, we encourage our clients to solve their own problems first, and in so doing so provide real-life use cases for the solutions that they open source. Then, abstraction can happen later as a way of future-proofing their investment.

**Myth #4: "If we open source our tools, we’ll lose control over the direction of the technologies in which we’ve invested."**

Don’t worry, this isn’t true! In fact:

*Contributing to an open source project is positively selfish.*

By this I mean that by contributing to an open source project, your organization actually gets to have a stronger say in the direction of that project. Most open source communities are guided by those that just get up and do, rather than by committee or council.

Our team loves the fact that so many organizations leverage our Drupal modules to meet their own needs. It’s great showing up at nonprofit technology conferences and having folks come up to us to thank us for our contributions. But what’s even better is knowing that these projects have been guided by the direct business needs of our nonprofit clients.

### How to Go About Contributing to Open Source

There are a number of ways that your nonprofit organization can contribute to open source. In most of the examples above, we speak to financial contributions towards the release of open source code. Those are obviously great, but meaningful community contributions can start much smaller:

* **Participate in an open source community event.** By engaging with other organizations with similar needs, you can help guide the conversation regarding how a platform like Drupal can support your organization’s needs. Events like [Drupal Day at the NTC](http://myntc.nten.org/eventdetails/precon/drupal) are a great place to start.

* **Host a code sprint or hackathon.** Sometimes developers just need a space to hack on stuff. You’d be surprised at the meaningful that connections and support that can come from just coordinating a local hackathon. One of our clients, [Feeding Texas](http://www.feedingtexas.org/), recently took this idea further and hosted a dedicated sprint on a hunger mapping project called [SNAPshot Texas](https://github.com/snap-hackathon/snapshot-texas). As part of this sprint, four developers volunteered a weekend to helping Feeding Texas build a data visualization of Food Stamp data across the state. This effort built upon the work of Feeding America volunteers across the country and became a cornerstone of our redesign of [FeedingTexas.org](http://www.feedingtexas.org/). Feeding Texas believes so strongly in the benefits they received from this work that they felt comfortable [open sourcing their entire website on GitHub](https://github.com/thinkshout/feeding-texas).

Of course, if your organization is considering a more direct contribution to an open source project, for example, by releasing a module as part of a website redesign, we have some advice for you as well:

* **First and foremost, solve your organization’s immediate problems first.** As mentioned earlier in the article, the failure of many open source projects is that their sponsors have to handle too many use cases all at once. Rest assured that if you solve your organization’s problems, you’re likely to create something that’s useful to others. Not every contribution needs to solve every problem.

* **Know when to start with abstraction vs. when to end with abstraction.** We have been involved in client-driven open source projects, such as the release of [RedHen Raiser](http://drupal.org/project/redhen_raiser), a peer-to-peer fundraising platform, for which the open source contribution needed to be made first, before addressing our client’s specific requirements. In the case of RedHen Raiser, the Capital Area Food Bank of Washington, DC came to us with a need for a Drupal-based peer-to-peer fundraising solution. Learning that nothing like that existed, they were excited to help us get something started that they could then leverage. In this case, starting with abstraction made the most sense, given the technical complexities of releasing such a tool on Drupal. However, for the most part, the majority of open source contributions come from easy wins that are abstracted after the fact. Of course, there’s no hard and fast rule about this - it’s just something that you need to consider.

* **Celebrate your contributions and the development team!** It might sound silly, but many software nerds take great pride in just knowing that the stuff they build is going to be seen by their peers. By offering to open source even just small components of your project, you are more likely to motivate your development partners. They will generally work harder and do better work, which again adds immediate value to your project.

In conclusion, I hope that this article helps you better understand that there’s a lot of value in contributing to open source. It doesn’t have to be that daunting of an effort and it doesn’t have to take you off task.
