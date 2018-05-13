---
layout: blog
body-class: blog-post
topic: technology
title: Preparing for the GDPR Regulations
homepage: false
author: tauno
published: true
featured: false
short: The European Union’s General Data Protection Regulations go into effect May 25th. Here's how you need to prepare.
tags:
  - Technology
  - Drupal Planet
  - nptech
  - nonprofit strategy
  - Google Analytics
  - GDPR
  - General Data Protection Regulations
date: 2018-05-13 12:00:00
image: https://thinkshout.com/assets/images/blog/himesh-kumar-behera-216019-unsplash.jpg
header-image: /assets/images/blog/himesh-kumar-behera-216019-unsplash.jpg
header-image-alt: "landscape analysis"
---

**“We’ve recently updated our privacy policy.”**

If you’ve ever given your email address to an online store, entity, social media platform or done just about anything online, then you’ve probably received the above notice in your inbox from those entities with increasing regularity over the last month or two.

Most of these notices are related to the European Union’s General Data Protection Regulations (GDPR) that are going into effect later this month on **May 25, 2018.**

To be clear, **we at ThinkShout are not lawyers** and we strongly encourage our clients and anyone collecting user information in some way shape or form to seek legal counsel for your own specific obligations related to the GDPR. Here’s how we’re viewing the regulations and what actions we are taking at ThinkShout.

##The big picture
The regulations apply specifically to organizations that collect or process data associated with EU citizens. The overall intent is to give EU citizens control over how their own data is collected and used. The stick that’s being wielded to enforce the regulations is the possibility of fines of up to €20 million or 4% of an organization’s global annual revenue (whichever is greater). Charitable organizations are not exempted from these penalties, however it’s likely that the steep fines will be for recurring or significant privacy issues and that the focus will be on fixing any issues that are discovered. There are questions about enforceability (particularly in the USA) that will likely need to be settled in court, but many of the regulations reflect smart privacy practices regardless of the penalties. All the chatter and hand wringing about the GDPR has led to a fast growing industry of businesses offering compliance audits, consulting and technical solutions to the regulations. Some of the vendors offering these services are legitimate, while many are simply designed to sell products or services based on embellished fears.

The principles of the GDPR can be broadly summed up as protecting personal data by allowing individuals to choose what data they allow to be collected, how that data is used or processed, and gives them control over that data even after it’s been collected. The UK’s Information Commissioner’s Office provides an easy to read guide to the GDPR that goes into detail on the various provisions while the EU provides a more graphical explanation.

##Does the GDPR apply to you and your users?
In short, probably. While compliance is technically only needed when handling data for EU citizens, discerning who is and isn’t a EU citizen can be difficult, and compliance in many cases isn’t all that cumbersome.

Documentation and communication are two of the key areas of responsibility.
Start with an audit of the data you collect from users, the data you collect from other sources and what is done with that data. Note that this isn’t just about new data but also any data already in your various systems (website, Salesforce, spreadsheets, etc.). Once you know what user information you have and why you have it, communicate that information to both your staff and your users by updating your privacy notices, and emailing constituents with that now famous subject line, “We’ve recently updated our privacy policy.”

Document how your data handling processes are shared with new staff. It’s also a good idea to revise privacy policies written by lawyers to be “concise, transparent, intelligible and easily accessible” and should further be “written in clear plain language.”

Example of good privacy notices and requests for consent.

Basically, ensure that the general population (who did not attend law school) can easily understand the language.

##Processing must be allowed under a lawful basis.
Any processing of personal data must be supported by both the need to process that data as well as a lawful basis. Out of the eight lawful basis that the GDPR defines, consent, legal obligation and legitimate interest appear to be the most likely to be cited in the work of our clients. For consent to apply, it must be active (opt-in), current, specific and revocable.

Legal obligation covers data needed for accounting or other legal audit trails. Legitimate interest is less defined, but addresses situations where the usage of the data can be reasonably expected, has minimal privacy impact and there is strong justification for the processing of the data. Using a user’s email address on an account they created to send them a link to reset their password might be an example of legitimate interest as a lawful basis.

##Individuals have defined rights to the protection and usage of their data.
1. The right to be informed: privacy notices, accurate opt-in information, etc.
2. The right of access: ability to see any data you have on an individual.
3. The right to rectification: ability to correct any errors in the data you have - allowing users to update their own profiles covers much of this right.
4. The right to erasure: ability to request data be removed. This is not all encompassing, nor does it need to be automated. Data needed for legal or other legitimate needs can be retained.
5. The right to restrict processing: ability to request that their data not be processed but also not deleted.
6. The right to data portability: ability to request a machine readable export of their data.
7. The right to object: ability to opt out of marketing, processing based on legitimate interest or processing for research or statistical purposes. The process for opting out must be clearly explained in the privacy notice and at the point of first communication.
8. Rights in relation to automated decision making and profiling: If you collect data to profile individuals for behavior tracking or marketing purposes then additional regulations apply.

##What about cookies?
Cookies aren’t specifically called out in the GDPR, however some of the provisions can apply to them. Some experts recommend altering the site behavior to prevent cookies from being created until after the user has provided and the site has recorded consent. Several services seek to provide paid services that support this approach. Several Drupal modules and WordPress plugins also seek to provide this functionality. It is expected that in 2019 the revised e-Privacy Directive will shift some or all of the obligations for managing consent related to cookies to the browser application.

##What next?
We’re recommending that all our clients take the following steps to ensure compliance:

* Evaluate your organization’s legal needs related to the GDPR. Consulting with your own counsel is recommended.
* Appoint an internal person to take responsibility for data protection in your organization. While the GDPR includes provisions for appointing a Data Protection Officer (DPO), it’s specifically for public authorities and organizations whose core business is tracking behavior or processing criminal data. Appointing a staff person will help avoid a diffusion of responsibility regarding data security.
* Audit your data collection and processing (sample template):
  * What is being held already and what is being collected?
  * Is there data being collected or stored that isn’t needed?
  * How is the collected data is used within the organization?
  * Is there a legal basis for the different pieces of personal data being collected?
  * If consent is the legal basis, is the consent active (opt-in), granular and recent?
* Review and revise privacy notices and cookie policies to be clearly written and comprehensive. Be sure to include information about third-party data collection (Google Analytics, AddThis, Facebook, etc). Privacy notice checklist
* Document processes for handling user requests as well as security breaches. Your organization has a month to respond to an individual’s request for export, access, or deletion of their data. In most cases this will currently be a manual process although there is working happening in both the Drupal and WordPress communities to make these request easier to accommodate. If there is a data breach, the GDPR states that the regulating agency must be notified within 72-hours. A good starting point is the Security Breach Response Plan Toolkit.
* Evaluate if changes to your website (beyond the privacy/cookie notices) are necessary. Consider specifically:
  * Is Google Analytics configured properly? Links…
  * What third-party scripts or pixel trackers are included?
  * How is consent being collected in newsletter signup forms?
  * How is consent being collected in user registration forms?
  * Any other places that user data could be collected?

##What’s next for us?
Like most agencies, we’re continuing to learn more about the GDPR and the implications for our clients. We are working in partnership with them to help them understand and implement changes that might be needed on their sites or their internal processes. Internally we’re providing additional training on the principles of privacy by design to our team. In terms of our open source work we’ll be incorporating MailChimp’s GDPR consent forms into the Drupal MailChimp modules as soon as the functionality is available in their API. We see opportunities for including functionality related to subject access requests (export, deletion, etc) and consent tracking in our RedHen CRM suite of modules as well.

Bottom line is: this is something we all need to be cognizant of; it’s not solely an EU issue. We’ll continue to keep a close eye on this as GDPR gets rolled out -- and there are many resources out there at your disposal (and within this blog post). You can be sure to get the latest from us on this and other digital trends by signing up for our newsletter and following us on twitter. Good luck!
