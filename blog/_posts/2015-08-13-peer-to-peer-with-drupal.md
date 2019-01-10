---
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

title: "Peer-To-Peer Fundraising With Drupal - RedHen Raiser"
author: sean
image: /assets/images/blog/image_2.png
published: true
featured: false
short: We take a closer look at a RedHen Raiser success story.
tags: 
  - CAFB of DC
  - RedHen Raiser
  - RedHen
  - RedHen Donation
  - "Peer-to-peer fundraising"
  - Drupal Planet
  - Drupal fundraising
  - Open Source
date: 2015-08-13 15:00:00
---
### The Origin of RedHen Raiser

Last summer, the [Capital Area Food Bank of Washington, DC](http://www.capitalareafoodbank.org/) came to us with a great idea: The Food Bank wanted to increase its investment in team fundraising initiatives, but they didn’t necessarily want to continue to invest in a "pay as you go" service like StayClassy, TeamRaiser, or Razoo. Rather, they wanted to explore whether or not they could invest in the development of an open source alternative that would eliminate licensing costs, that they could customize more easily, and that they could then give back to the broader nonprofit community.

We’ve spoken a lot in the community regarding various strategies for [how nonprofits can contribute to the development of open source tools](/blog/2015/03/the-how-and-why-of-open-source/). Most of the time, we recommend that nonprofits start off by solving their own organizational problems first, and then abstracting components of the resulting solutions at the end of the project.

However, in the case of the Capital Area Food Bank’s team fundraising needs, a competitive analysis of existing solutions provided us with a well-defined roadmap for how to meet the Food Bank’s goals, while simultaneously working on a suite of contributed tools that could be given back to the broader community. So, in coming up with their solution, we started out by developing RedHen Raiser as a stand-alone Drupal Distribution, and then implemented a customized instance of the Distribution to meet the Food Bank’s more specific design needs.

### Architectural Planning for the RedHen Raiser Drupal Distribution

As mentioned above, we began our feature design process for this peer-to-peer fundraising platform by doing a **competitive analysis of existing tools**. The table below shows our recommended feature set ("Our MVP") compared to the functionality available as of June 2014 on eight of the leading platforms:

![image alt text]({{ site.baseurl }}/assets/images/blog/image_0.png)

*As a quick aside, it's interesting in comparing these products that there is a lack of consensus in the industry regarding how to refer to these sorts of fundraising tools. We often hear the terms "peer-to-peer fundraising," “team fundraising,” “viral fundraising,” and even “crowd fundraising” used interchangeably. With crowd fundraising being all the rage in the for-profit world of Kickstarter and the like, we feel that that descriptor could be a little misleading, but the other three terms all speak to different highlights and features of these tools.*

With a target feature set identified, we began **wireframing our proposed solution**. Again, peer-to-peer fundraising has become somewhat of a well-trodden space. While we came up with a few small enhancements to the user experiences we’ve seen in the marketplace, we recognized that donors are beginning to anticipate certain design patterns when visiting these fundraising sites:

![image alt text]({{ site.baseurl }}/assets/images/blog/image_1.png)

With the wireframes in place, we turned to **technical architecture**. Given the need to collect a broad range of constituent data, not just user account information, it was clear to us that this Drupal distribution should be built on top of a CRM platform native to Drupal. For obvious reasons, we chose to go with [RedHen CRM](https://www.drupal.org/project/redhen).

We also saw many advantages to leveraging [RedHen Donation](https://www.drupal.org/project/redhen_donation), a flexible tool for building single-page donation forms. With RedHen Donation, a "Donation field" can be attached to an entity, and in so doing, it attaches a form to that entity for processing donations. The *RedHen-specific* piece to this module is that it is configurable, so that incoming donation data is used to “upsert” (create or update) RedHen contacts. RedHen Donation also integrates with Drupal Commerce to handle order processing and payment handling. Integrating with the [Commerce Card on File](https://www.drupal.org/project/commerce_cardonfile) and [Commerce Recurring](https://www.drupal.org/project/commerce_recurring) modules, RedHen Donation can be configured to support recurring gifts as well.

Missing from the underlying set of building blocks needed for building a peer-to-peer fundraising platform with Drupal was a tool for managing and tracking fundraising against campaign targets and goals. In the case of peer-to-peer fundraising, each team fundraising page needs to be connected to a larger campaign. To address this requirement, we released a module called [RedHen Campaign](https://www.drupal.org/project/redhen_campaign). This module, coupled with with RedHen Donation, are at the core of RedHen Raiser, allowing us to create a hierarchy between fundraising campaigns, teams, and individual donors.

If you are interested in giving RedHen Raiser a spin, you can [install the distribution](https://www.drupal.org/project/redhen_raiser) using your own Drupal Make workflow, you can checkout our own [RedHen Raiser development workflow](https://github.com/thinkshout/charlotte), or you can just click a button to spin up a [free instance](https://dashboard.pantheon.io/products/redhen_raiser/spinup) on Pantheon’s hosting platform. (If you’re not a Drupal developer, this last approach is incredibly quick and easy. The distribution even ships with an example fundraising campaign to help you get started.)

### Customizing RedHen Raiser to Meet the Food Bank’s Needs

With a strong base in place, customizing RedHen Raiser to meet the Capital Area Food Bank’s requirements was straightforward and comparably inexpensive. It was largely a matter of adding Drupal Commerce configuration to work with their payment gateway, developing a custom theme that matched the Food Bank’s overall brand, and then training their team to start building out their first peer-to-peer fundraising campaign:

![image_2.png]({{ site.baseurl }}/assets/images/blog/image_2.png)

### The Success of the Food Bank’s First Peer-to-Peer Fundraising Campaign

The Capital Area Food Bank launched this tool around its May 2015 ["Food From The Bar" campaign](http://www.capitalareafoodbank.org/food-from-the-bar/), targeting law firms in the D.C. Metro area. **_In just 30 days, the Food Bank raised close to [$150,000 on RedHen Raiser](https://give.capitalareafoodbank.org/campaigns/food-bar-2015)._**

The Food Bank’s Chief Digital Officer, Chris von Spiegelfield, had this to say about the project:

_"The Capital Area Food Bank has been no stranger to peer-to-peer fundraising tools. For years, it has relied on third-party sites such as Causes.com, Razoo, Crowdrise, among others. However, these tools often came with considerable branding and messaging limitations as well as pretty stiff transactional fees. Users got confused about where their money was going and complained after learning a considerable portion of their donation didn’t make its way to the Food Bank. We wanted to provide greater unity of purpose beyond a donation form without all the hassle, which is how we decided to invest in our own crowdfunding platform._

_After kicking the tires at a few SaaS options, we decided the best way forward was to build a customized website.  Out of all the different frameworks proposed, the open-source Drupal and RedHen Raiser combo impressed us the most. We wouldn’t  just be buying a website. We would be leveraging a vast network of programmers and community-minded architects who could start us off in a very good place, not to mention help our platform be secure and grow for the foreseeable future._

_We launched the website this year and couldn’t be happier with what ThinkShout built for us. We’re already seeing it pay dividends across several campaigns. We continue to add new features and hope our site might be a benchmark that other nonprofits could benefit from and contribute to as well."_

### What’s Next for RedHen Raiser?

The obvious answer to this question is *a port to Drupal 8*. But that will take a little time, as many complex pieces, such as Drupal Commerce and RedHen CRM will need to be ported before we can migrate over these higher-level fundraising features. But a RedHen CRM port is on our short(er) term horizon. And frankly, the idea of being able to use RedHen as a "headless CRM" is incredibly exciting.

In the meantime, we are looking forward to collaborating with the community to make RedHen Raiser an even stronger open source competitor to the pay-as-you-go alternatives that are currently out there. So, please, give RedHen Raiser a test drive and send us your feedback!
