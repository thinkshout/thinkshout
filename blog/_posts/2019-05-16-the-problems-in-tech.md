---
layout: blog
body-class: blog-post
topic: culture
title: The Problems In Tech Go Deeper Than ‘Hacking’
homepage: false
author: brendan
published: true
featured: false
short: What The Cut’s piece on Tinder reveals about how programmers are taught to disregard ethics
tags:
  - Drupal Planet
  - Drupal
  - Security
  - Tinder
  - hacking
date: 2019-05-16 12:00:00
image: https://thinkshout.com/assets/images/ts_icon.jpg
---
Earlier this week, [_The Cut_ ran a piece about a “Tinder Hacker”](https://www.thecut.com/2019/05/the-tinder-hacker.html) who created a fake profile with his roommate’s photos, then hooked a piece of code up to the Tinder API and did some very simple string substitutions so that men who messaged “her”--after “she” swiped right on _them_--were tricked into actually talking to other men who did the same. In brief, he put strangers in contact with each other under false pretenses, rerouted and surveilled their communications without consent, and proceeded to use this as a bragging point on dates and in interviews.

One might take exception to a number of elements of this story, but let’s start with its terminology. “Hacking” is a word whose meaning has broadened beyond all practical use, but in no sense did “Sean”, the pseudonymous subject of the story, “hack Tinder.” He relied on [someone else’s reverse engineering](https://github.com/topics/tinder-api) to write some buggy code that ran against its API. That’s all.

The article itself seems confused about whether the Tinder API, or Application Program Interface, only exists to allow homebrew apps on Windows Phone. But an API is just a set of commands made available by a server, like the Tinder mothership, to accept instructions from client apps, like the many copies of the Tinder app that run on all kinds of phones. Almost all the apps on your phone are clients that work this way, and APIs are ubiquitous. Even the [Drupal](https://events.drupal.org/seattle2019/sessions/why-will-json-api-go-core) and Wordpress sites we build each have their own versions.

The code described in the article fits less within the definition of a _hack_ than that of a _bot_. It would live on a server, persist as a service, wait for triggers--like incoming messages--and then respond to them according to certain rules. Some bots are used for automated customer service; some are used for [art projects](https://www.sfmoma.org/read/send-me-sfmoma/); some are used for [jokes](https://twitter.com/Horse_ebooks/status/218777785659957248). Many, many, many bots are used for spam or other malicious purposes.

The ethics of bot development are not always simple, but they’re not new territory either. That’s the second and most glaring exception to be taken here: Sean’s assertion that his bot was at the “gray hat” level of malice in terms of its exploitation of code. Bot creator and Portland local Darius Kazemi wrote a thoughtful piece about [considering and refining the possibility space of joke bots](http://tinysubversions.com/notes/transphobic-joke-detection/) toward kindness in 2015. That in turn references fellow creator Leonard Richardson’s seminal 2013 post “[Bots Should Punch Up](https://www.crummy.com/2013/11/27/0)”, which contains a telling bit with regard to the color of that hat:

<blockquote>“Hackers and comedians and artists are always attracted to the grey areas. But your bot is an extension of your will, and if you're a white guy like me, <em>most of the grey areas are not grey in your favor</em>.”</blockquote>

Perhaps it’s assuming too much to conclude that Sean, a San Francisco programmer whose race is not mentioned in the article, is a white guy. [Perhaps not](https://www.theguardian.com/technology/2019/apr/16/artificial-intelligence-lack-diversity-new-york-university-study). Technology as a field in the US is overwhelmingly full of white men, offering most of the benefits of the biggest wealth creation engine in history to the people who were already granted our society’s highest levels of privilege. That privilege, and power, means that thoughtless choices have more potential to do harm: by default, they’re punching down.

But even if that weren’t the case, as an educated and socialized human adult, it shouldn’t have been hard to see that writing a service solely to entice, deceive, manipulate and mock people in a vulnerable space like a dating app might have consequences. That is, unless you’ve spent a career being rewarded for ignoring consequences, [because](https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist) [you](https://www.nytimes.com/2018/03/19/technology/facebook-cambridge-analytica-explained.html) [work](https://www.vanityfair.com/news/2019/01/jack-dorsey-twitter-nazis-are-here-to-stay) [in](https://www.theverge.com/2019/4/25/18516004/amazon-warehouse-fulfillment-centers-productivity-firing-terminations) [tech](https://www.nytimes.com/2019/02/19/technology/youtube-conspiracy-stars.html). That’s the third exception to be taken. For pulling a prank like this, many people would be fired or sued. Instead, Sean got a better job.

I can admit that this story struck me on a personal level. Back before I had to quit Twitter, [I used to write bots using their API myself](http://stupidtwittertricks.com/). One of them, which I created in 2014, worked on a similar principle to the Tinder bot: it would receive a person’s message, put it in holding, and send them back a random held message from someone else in response. The juxtapositions were surreal, delightful, and often rewarding. And everyone involved was informed, consenting, and able to make use of built-in safety tools to report bad actors.

I’m not an ethicist or a researcher by training, but I knew to consider those aspects of my work because I have an interest in the history of the internet. According to the article, Sean does too--I’m willing to bet he and I read the same books about [phone phreaks](https://www.wired.com/2013/02/exploding-the-phone/), [blue boxes and Captain Crunch](https://512pixels.net/2018/03/woz-blue-box/).

The phreakers he admires, by the way, were indeed “punching up” with their pranks--using low-rent tools to get one back at Bell, an exploitative tech monopoly that would eventually be broken up. [Hey, there’s an idea](https://www.vox.com/recode/2019/5/3/18520703/big-tech-break-up-explained).

People have made [infamously bad choices](https://www.washingtonpost.com/news/the-switch/wp/2018/04/11/channeling-the-social-network-lawmaker-grills-zuckerberg-on-his-notorious-beginnings/?noredirect=on&utm_term=.3ccc2c7d3fb7) like Sean’s before, and one might expect creators here in the future to work at avoiding their repetition. But instead, his story reflects the broader attitude of a tech sector that is [not just ahistorical](https://medium.com/humane-tech/12-things-everyone-should-understand-about-tech-d158f5a26411), but willfully naive and ignorant of the lessons of its past. (If you only read one thing linked in this whole piece, make it that last one. Go ahead, I’ll wait.)

The things I value about working at ThinkShout stand in opposition to all of that. My colleagues here are technical experts, but they’re also widely read, deeply informed, and always working to expand our collective view of the world in inclusive and considerate ways. That’s why we’ve taken pride in working for progressive organizations like the [Campaign Legal Center](https://campaignlegal.org/) and [ChangeLab Solutions](https://www.changelabsolutions.org/). That’s why we focus on [accessibility for all users as a core concern](https://thinkshout.com/blog/2018/05/Space-for-Empathy/) and [increasing equity in our own job pipeline](https://thinkshout.com/blog/2018/08/2018-Internship-Wrap-Up/). That’s why we’re fine with being located far outside the insular centers of big tech culture, where it seems like people would rather try to land on the Moon than make change on the ground.

Even if the article in _The Cut_ highlights the deep problems in the technology sphere that engulfs us all, there are certainly worse things on the internet than a man getting his kicks by trolling a bunch of other men. But there are better things too. If you’d prefer to join us on that side, please get in touch! [We’re hiring](https://thinkshout.com/careers/), and we’d be glad to hear about how your hobby project brought a little kindness and empathy to the world.
