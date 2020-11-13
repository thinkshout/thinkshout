---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: "What Nonprofits Can Learn About Content Structure… from Pearl Jam"
published: true
featured: false
short:   Pearl Jam's website is a great example of good content strategy. 
author: brett-meyer
date: 2014-05-08 15:00:00
tags:
  - Drupal Planet
  - Content Strategy
  - Nonprofit Tech
  - Pearl Jam
---

![Pearl Jam]({{ site.baseurl }}/assets/images/blog/pearl-jam-header.jpg)

*[Photo](https://www.flickr.com/photos/24365773@N03/7425028964/in/photolist-cixdqJ-2E86ff-cj8eg3-cj8dqL-ci23iW-S2mmU-ci22Bh-cj8ekG-9QjszY-3bpmzG-6EyJ8m-2zsghF-6QWpZh-e22GeM-e28iUm-e28ifu-2FeFyx-RU5BQ-83PwyB-6FsT6p-bqThKu-bDNe9n-bqTmwL-bDNi9k-bDNejv-bDNhYX-2zsmgp-2zwDQo-2zsiG8-2zwMuu-2zsnTt-2zsow6-2zwF89-2zsfUK-2zse5R-2zsmSi-2zsko8-2zsnip-2zwHAm-2zwBo5-2zwFRQ-2zsp5K-2zwGzu-6QWpQU-6QWjFo-8dpsda-rKaZw-8dsJu5-8dpsmZ-8dpsvH) by [Phil King](https://www.flickr.com/photos/24365773@N03/), licensed under [CC 2.0](https://creativecommons.org/licenses/by/2.0/).*

Pearl Jam have been posterboys for a lot of things, but probably not structured web content. Content strategists like to point to NPR’s [Create Once, Publish Everywhere (COPE)](http://blog.programmableweb.com/2009/10/13/cope-create-once-publish-everywhere/) framework, to large media outlets, sometimes to [the U.S. government](http://www.howto.gov/web-content/technology/content-management-systems/how-to-create-open-structured-content) – but given the breadth of coverage (and budgets) available to those entities, making the move to fully structured content may seem daunting in the nonprofit context.

If Pearl Jam can do it, so can you.

The basic concept is this: by separating out the most important components of your content into “fields”, instead of dumping everything from images to embedded videos to pull quotes into a WYSIWYG editor, you’ll be able to :

* Display your content responsively across devices;
* Share it more easily with your affiliates and supporters; and
* Create dynamic ways to surface relevant content and encourage engagement.

In a striking example of why tech folks shouldn’t be allowed to name concepts, creating fields to structure your content is affectionately known as the difference between making [blobs and chunks](http://karenmcgrane.com/2012/09/04/adapting-ourselves-to-adaptive-content-video-slides-and-transcript-oh-my/).

If you use a modern CMS, you’ve already used structured content to a degree. The title of your page or post is almost always separate from the body. This allows you, at the most basic level, to build a dynamic page of blog posts that displays only the title and maybe a snippet of the body, which then links off to a detail page containing the full post.

The New York Times uses this concept, breaking out fields for author, publication date, and more for its news stories. Amazon has taken it to an entirely different level by assigning scores of categories to its products; when you narrow down your mattress search to a [queen size goose down featherbed from Pacific Coast](http://www.google.com/url?q=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_nr_p_89_0%3Frh%3Dn%253A1055398%252Cn%253A%25211063498%252Cn%253A1063252%252Cn%253A3732351%252Cn%253A3732361%252Cp_n_size_browse-bin%253A362281011%252Cp_n_feature_keywords_browse-bin%253A5707112011%252Cp_89%253APacific%2BCoast%26bbn%3D3732361%26ie%3DUTF8%26qid%3D1398384943%26rnid%3D2528832011&sa=D&sntz=1&usg=AFQjCNEl7hBe1NuOVj7ns-6p1GxLeERAmA), you’re taking advantage of structured data (in the form of [faceted search](http://en.wikipedia.org/wiki/Faceted_search)).

What Pearl Jam has done – and what every nonprofit should think about doing – is match the motivations their audience has in visiting their website to PJ’s own (organizational) goals and structured their site content so the two complement each other.

Pearl Jam’s core offering is music. People visit their website to find that music, either in the form of upcoming (or past) shows, lyrics, or songs they can buy. So, much of Pearl Jam’s website is structured around the concept of the song.

*[Note that I don’t have any insider’s knowledge about the exact structure or software they’re using. This is just how we would do it if we built their site in Drupal.]*

![Pearl Jam 1]({{ site.baseurl }}/assets/images/blog/pj1.jpg)

Practically every song Pearl Jam has ever recorded or performed live has a place on the website, and they’re all structured the same:

* Title
* Release Date
* Composer
* Artist
* Image
* Lyrics

That’s it. Everything else on that page, and much of the site, is built through the application of structured data.

![Pearl Jam 2]({{ site.baseurl }}/assets/images/blog/pj2.jpg)

If you look at an individual album, you’re actually looking at a different content type, which has its own structure:

* Title
* Release Date
* Cover Image
* Purchase Links
* Body
* Song [REFERENCE]

It’s that REFERENCE field that’s key. Every album is a collection of references to the individual songs, rather than list built by hand. (On Drupal, we’d probably use something like [Entity Reference.](https://drupal.org/project/entityreference)) Clicking on an individual song takes you to its detail page.

![Pearl Jam 3]({{ site.baseurl }}/assets/images/blog/pj3.jpg)

It gets more interesting when you look at a Setlist, another structured content type:

* Venue
* Location
* Date
* Concert Poster Image
* Product Links
* Bootleg Image
* Song [REFERENCE]
* Live Image [REFERENCE]

A setlist is built up using the same song REFERENCE field as an album; each song exists as a single entity, but it can be referenced from hundreds of other pages (in the case of a classic like “Jeremy”).

All the way back in 2000, Pearl Jam started recording every show they did off the mixing board so they could sell high-quality recordings. While you can’t quite get every one of the 672 versions of “Alive” they’ve performed over the years, you can come pretty close.

Setlists include the all-important link to purchase a copy of an entire live performance.

This relational system has created endless connections between the Songs they’ve performed – their core content offering – and where and when they’ve performed them. By then layering on the ability to purchase copies of those concerts at any time, Pearl Jam has taken one of the primary motivations of their audience – to engage with PJ’s music – and tied it directly to their organizational goal of making money, without shoving that in your face.

![Pearl Jam 4]({{ site.baseurl }}/assets/images/blog/pj4.jpg)

It’s also worth noting that structured data has also allowed Pearl Jam to flesh out the detail pages for each of its content types with just a few lines of code.

[On a song page](http://pearljam.com/music/lyrics/997/studio/21989/sirens?ref_album_id=21996), the “First Played”, “Last Played”, and “Times Played” lines are created dynamically, as is the list of every place and date it’s been performed. [Tours are created by referencing each of the setlists](https://pearljam.com/tour/history/show/clark-county-ampitheater). I imagine that the [slider showing all of the album covers](http://pearljam.com/music/albums/997/studio) is created by pulling the cover image associated with each album (instead of being inserted by hand).

Once your content is structured, the ways you can reformat and display it are limited only by your imagination communications plan, your organizational goals, and your CMS. Oh, and it helps if you [understand the motivations of your various audiences](/blog/2014/04/desire-paths/).

What’s your core content offering? Can you create a similar structure? Have you already?

And if anybody with PhotoShop skills wants to create that new poster for Pearl Jam, highlighting their mastery of structured content...
