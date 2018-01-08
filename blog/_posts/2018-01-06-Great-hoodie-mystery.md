---
layout: blog
body-class: blog-post
topic: technology and innovation
title: The Great Hoodie Mystery
homepage: false
author: gabe
published: true
featured: false
short: Gabe takes what would otherwise be an inane office exchange and ties it back to data structures.
tags:
  - data
  - data structures
  - technology
  - nonprofit technology
date: 2018-01-06 12:30:00
---
Last summer, Rose noticed a problem at the ThinkShout offices. What seemed at first to be an innocuous little issue turned into an unsolvable mystery that had been hiding in our office for an unknown period of time. _It remains unsolved to this day!_

What is this mystery? Here’s Rose on the ThinkShout Slack “General” channel, June 30th 2017:

![rose_slack](/assets/images/blog/rose_slack.png)
{:.center}


Being a data structure enthusiast, I was immediately struck by the strong possibility that this question could not be answered.


![gcb_slack](/assets/images/blog/gcb_slack.png)
{:.center}


With an organization full of developers, suggestions were quickly provided. Someone suggested using the “Refrigerator leftovers” method: place the hoodies somewhere conspicuous with a sign that says, “If this is yours, claim it by such-and-such date”. Katrina didn’t like it:


![katrina_slack](/assets/images/blog/katrina_slack.png)
{:.center}


A fine point! Leftovers are naturally somewhat unique. ThinkShout hoodies are, of course, unquestionably unique (and beautifully designed!) in the greater world of hoodies. But in the ThinkShout offices, the “uniqueness” factor is undermined. Moving the hoodies would remove one of the most vital pieces of identifying information in the mind of the only person likely to be able to identify it: the mind of the person who left the hoodie where it currently is!

Nancy had the real solution to this mystery:


![nancy_slack](/assets/images/blog/nancy_slack.png)
{:.center}


Perfect! Connect the identifying information permanently to the hoodie in a way that anyone, not just the owner, can use to identify it!

So! Problem solved, right Rose?

....

Rose was too polite, of course, to point out that this “solution” was, shall we say, a little less than timely.

However, our data interpretation resources (employees who owned hoodies) did a great job identifying the two hoodies on the back coat rack. As for the one in the front? I recently returned from 3 months away from the office, and saw this:

![hoodie_lives](/assets/images/blog/hoodie_lives.jpg)
{:.center}

The mystery remains! In fact, as far as I can recall, that hoodie has been hanging there for at least three years.

Perhaps you are thinking, “This is no great mystery. Someone who left the organization at some point forgot their hoody, and never came back for it.” That is an excellent explanation! But is it true? There’s no longer any way to know for sure.

Some have advocated for removal of the mystery hoodie, arguing that the owner has long given up their claim to it. I am strongly opposed! Nevermind the owner: the mystery hoodie is an object lesson on the importance of thinking through your data structures carefully at the start. It can be tempting, when building a data system, to get cute and clever and end up in trouble:

“We’ll know whose hoodie it is because they’ll be wearing it!” (This only accounts for data in the active state.)
“We’ll know whose hoodie it is because when they aren’t wearing it, they will leave it at their desk!” (Optimistic assumption about future usage.)
“We can use sizing information to help us figure out any lost person-hoodie connections.” (Insufficiently specific identifier.)
“The owner will know that it’s theirs.” (Impractical data retrieval method; owner may not be an available resource.)

These cute answers can be fun, but let’s call them what they really are: lazy. And let’s take a cue from Nancy: put complete, identifying information in the appropriate place right from the start:

![nancy_slack](/assets/images/blog/nancy_slack.png)
{:.center}

Now, if you’ll excuse me, I need to track down a magic marker.
