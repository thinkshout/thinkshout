---
layout: post
title: Peer-To-Peer Fundraising With Drupal - RedHen Raiser
author: sean
published: false 
featured: false
short: 
   We examine RedHen Raiser in the context of CAFB of DC.
tags: 
  - CAFB of DC
  - RedHen Raiser
  - RedHen CRM
  - RedHen Donation
  - Peer-to-peer fundraising
  - Drupal Planet
  - Drupal fundraising
date: 2015-08-07
---

# Peer-To-Peer Fundraising With Drupal

### The Origin of RedHen Raiser

Last summer, the [Capital Area Food Bank of Washington, DC](http://www.capitalareafoodbank.org/) came to us with a great idea: The Food Bank wanted to increase its investment in team fundraising initiatives, but they didn’t necessarily want to continue to invest in a "pay as you go" service like StayClassy, TeamRaiser, or Razoo. Rather, they wanted to explore whether or not they could invest in the development of an open source alternative that would eliminate licensing costs, that they could customize more easily, and that they could then give back to the broader nonprofit community.

We’ve spoken a lot in the community regarding various strategies for [how nonprofits can contribute to the development of open source tools](http://thinkshout.com/blog/2015/03/the-how-and-why-of-open-source/). Most of the time, we recommend that nonprofits start off by solving their own organizational problems first, and then abstracting components of the resulting solutions at the end of the project.

However, in the case of the Capital Area Food Bank’s team fundraising needs, a competitive analysis of existing solutions provided us with a well-defined roadmap for how to meet the Food Bank’s goals, while simultaneously working on a suite of contributed tools that could be given back to the broader community. So, in coming up with their solution, we started out by developing RedHen Raiser as a stand-alone Drupal Distribution, and then implemented a customized instance of the Distribution to meet the Food Bank’s more specific design needs.

### Architectural Planning for the RedHen Raiser Drupal Distribution

As mentioned above, we began our feature design process for this peer-to-peer fundraising platform by doing a **competitive analysis of existing tools**. The table below shows our recommended feature set ("Our MVP") compared to the functionality available as of June 2014 on eight of the leading platforms:

![image alt text](image_0.png)

*As a quick aside, it**’s** interesting in comparing these products that there is a lack of consensus in the industry regarding how to refer to these sorts of fundraising tools. We often hear the terms "peer-to-peer fundraising," “team fundraising,” “viral fundraising,” and even “crowd fundraising” used interchangeably. With crowd fundraising being all the rage in the for-profit world of Kickstarter and the like, we feel that that descriptor could be a little misleading, but the other three terms all speak to different highlights and features of these tools.*

With a target feature set identified, we began **wireframing our proposed solution**. Again, peer-to-peer fundraising has become somewhat of a well-trodden space. While we came up with a few small enhancements to the user experiences we’ve seen in the marketplace, we recognized that donors are beginning to anticipate certain design patterns when visiting these fundraising sites:

![image alt text](image_1.png)

With the wireframes in place, we turned to **technical architecture**. Given the need to collect a broad range of constituent data, not just user account information, it was clear to us that this Drupal distribution should be built on top of a CRM platform native to Drupal. For obvious reasons, we chose to go with [RedHen CRM](https://www.drupal.org/project/redhen).

We also saw many advantages to leveraging [RedHen Donation](https://www.drupal.org/project/redhen_donation), a flexible tool for building single-page donation forms. With RedHen Donation, a "Donation field" can be attached to an entity, and in so doing, it attaches a form to that entity for processing donations. The *RedHen-specific* piece to this module is that it is configurable, so that incoming donation data is used to “upsert” (create or update) RedHen contacts. RedHen Donation also integrates with Drupal Commerce to handle order processing and payment handling. Integrating with the [Commerce Card on File](https://www.drupal.org/project/commerce_cardonfile) and [Commerce Recurring](https://www.drupal.org/project/commerce_recurring) modules, RedHen Donation can be configured to support recurring gifts as well.

Missing from the underlying set of building blocks needed for building a peer-to-peer fundraising platform with Drupal was a tool for managing and tracking fundraising against campaign targets and goals. In the case of peer-to-peer fundraising, each team fundraising page needs to be connected to a larger campaign. To address this requirement, we released a module called [RedHen Campaign](https://www.drupal.org/project/redhen_campaign). This module, coupled with with RedHen Donation, are at the core of RedHen Raiser, allowing us to create a hierarchy between fundraising campaigns, teams, and individual donors.

If you are interested in giving RedHen Raiser a spin, you can [install the distribution](https://www.drupal.org/project/redhen_raiser) using your own Drupal Make workflow, you can checkout our own [RedHen Raiser development workflow](https://github.com/thinkshout/charlotte), or you can just click a button to spin up a [free instance](https://dashboard.pantheon.io/products/redhen_raiser/spinup) on Pantheon’s hosting platform. (If you’re not a Drupal developer, this last approach is incredibly quick and easy. The distribution even ships with an example fundraising campaign to help you get started.)

### Customizing RedHen Raiser to Meet the Food Bank’s Needs

With a strong base in place, customizing RedHen Raiser to meet the Capital Area Food Bank’s requirements was straightforward and comparably inexpensive. It was largely a matter of adding Drupal Commerce configuration to work with their payment gateway, developing a custom theme that matched the Food Bank’s overall brand, and then training their team to start building out their first peer-to-peer fundraising campaign:

![image alt text](image_2.png)

### The Success of the Food Bank’s First Peer-to-Peer Fundraising Campaign

The Capital Area Food Bank launched this tool around its May 2015 ["Food From The Bar" campaign](http://www.capitalareafoodbank.org/food-from-the-bar/), targeting law firms in the D.C. Metro area. **_In just 30 days, the Food Bank raised close to _****_[$150,000 on RedHen Raise_**r](https://give.capitalareafoodbank.org/campaigns/food-bar-2015)**_._**

The Food Bank’s Chief Digital Officer, Chris von Spiegelfield, had this to say about the project:

*"**The Capital Area Food Bank has been no stranger to peer-to-peer fundraising tools. For years, it has relied on third-party sites such as Causes.com, Razoo, Crowdrise, among others. However, these tools often came with considerable branding and messaging limitations as well as pretty stiff transactional fees. Users got confused about where their money was going and complained after learning a considerable portion of their donation didn’t make its way to the Food Bank. We wanted to provide greater unity of purpose beyond a donation form without all the hassle, which is how we decided to invest in our own crowdfunding platform.*

* *

*After kicking the tires at a few SaaS options, we decided the best way forward was to build a customized website.  Out of all the different frameworks proposed, the open-source Drupal and RedHen Raiser combo impressed us the most. We wouldn’t  just be buying a website. We would be leveraging a vast network of programmers and community-minded architects who could start us off in a very good place, not to mention help our platform be secure and grow for the foreseeable future.*

* *

*We launched the website this year and couldn’t be happier with what Thinkshout built for us. We’re already seeing it pay dividends across several campaigns. We continue to add new features and hope our site might be a benchmark that other nonprofits could benefit from and contribute to as well."*

### What’s Next for RedHen Raiser?

The obvious answer to this question is *a port to Drupal 8*. But that will take a little time, as many complex pieces, such as Drupal Commerce and RedHen CRM will need to be ported before we can migrate over these higher-level fundraising features. But a RedHen CRM port is on our short(er) term horizon. And frankly, the idea of being able to use RedHen as a "headless CRM" is incredibly exciting.

In the meantime, we are looking forward to collaborating with the community to make RedHen Raiser an even stronger open source competitor to the pay-as-you-go alternatives that are currently out there. So, please, give RedHen Raiser a test drive and send us your feedback!

================ Original draft ===================

When we first introduced you to [RedHen Raiser](https://www.drupal.org/project/redhen_raiser), we’d just completed our [first all-team product sprint](http://thinkshout.com/blog/2015/01/reimagined-sprints-redhen-raiser/). Naturally, we were pretty excited about it - and we still are - as this project was very unique for us. We love a good engineering challenge, especially when it comes in the form of an opportunity to contribute something new and much-needed to the open source community. In this particular instance, the Capital Area Food Bank of DC knew it would need a peer-to-peer fundraising platform that didn’t yet exist. So we planned to also build one from the ground up, using our pre-existing RedHen modules as its foundation. But that wasn’t the most exciting aspect of this project.

CAFB of DC funded the RedHen Raiser project with the intent, from start to finish, for it to be completely open source. We were already working on the redesign of the Food Bank’s website, so Raiser became another layer of the project. ThinkShout CEO Sean Larkin recently wrote a [blog post](http://www.google.com/url?q=http%3A%2F%2Fthinkshout.com%2Fblog%2F2015%2F03%2Fthe-how-and-why-of-open-source%2F&sa=D&sntz=1&usg=AFQjCNFil0xfczTvaY1FohC74kyXs92QbQ) that discusses why nonprofits contributing the code they’re paying for to the open source community isn’t as crazy of an idea as one might think. 

Ultimately, it comes down to this: paying for open source contributions really can be a good thing. Especially in the case of the Food Bank, whose use of RedHen Raiser was a resounding success. Once we’d completed theming Raiser to match their site’s overall design, we remained virtually hands-off during the campaign. Their team managed it entirely on their own.

 ![image alt text](image_3.png)


The Food Bank’s "[Food From the Bar](https://give.capitalareafoodbank.org/campaigns/food-bar-2015)" is a prime example of just how effective and customizable RedHen Raiser campaigns can be. As their first successful RedHen Raiser campaign, and their **largest**, **most successful Food From the Bar campaign to date**, it’s a great showcase of the various features Raiser offers. 

![image alt text](image_4.png)

This particular campaign targeted the D.C. legal community and encouraged local firms to compete to raise the most funds and food donations. As both an online and offline campaign, donors have the ability to contribute to the cause via RedHen Raiser, or via postal mail. (RedHen Raiser only tracks what is donated directly through the platform itself - so the campaign that’s currently on their site doesn’t reflect 100% of the donations received.)

This instance of RedHen Raiser in action is a great case study in how robust this app is. The Food Bank made use of the Teams and Leaderboard feature to track each firm’s progress, the blog feature to publish progress updates, and the social media buttons for quick and easy sharing across multiple channels (Facebook, Twitter, etc.) It’s a shining example of just how well RedHen Raiser can work when you take advantage of all it has to offer.


![image alt text](image_5.png)

1. Comments from Chris at CAFB DC.

    1. This was the most successful FOOD FROM THE BAR campaign?

    2. Had CAFB used other peer to peer fundraising software before?

    3. What was your team’s overall impression of RedHen Raiser? 

2. CONCLUSION 

Since its creation for the [Capital Area Food Bank of D.C.](http://www.capitalareafoodbank.org/), RedHen Raiser continues to evolve. We’ve developed several new releases and are currently on version 7.x-1.5. You can even [try it for free](https://dashboard.pantheon.io/products/redhen_raiser/spinup) on Pantheon. It remains the only crowdfunding solution native to Drupal. 

