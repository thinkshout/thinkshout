---
title: A Tale of Two Devsigners
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

author: stephanie
published: true
featured: false
short: Stephanie sits down with our design team to talk trends, projects, and Devsigner
tags:
- Design
- UX
- Drupal
- Drupal Community
- Flat Design
- Sass
- Jekyll
- Devsigner
- Drupal Planet
date: 2015-06-16 15:30:00
---

It’s June, which means [Devsigner](http://www.devsignercon.com/) is just around the corner so, naturally, we’ve got design on the brain. What’s Devsigner? Well, I’m glad you asked. Devsigner is a conference held here in the Pacific Northwest geared towards front end developers and development-minded designers. Sessions focus on the relationship between design and web development, bridging the gap that separates the design from the code. The math looks like this: developer + designer = devsigner.

ThinkShout’s own devsigners [Josh Riggs](/team/josh/) (User Experience Lead) and [Eric Paxton](/team/eric/) (Front End Engineer), will be speaking at this conference at the end of the month. I sat down with Josh and Eric to learn a little bit more about their design process, and how we work with our nonprofit clients to ensure that their sites don’t just work, but that they also deliver a fantastic user experience.

**_You two make up the dynamic design duo here at ThinkShout. What do your respective roles entail? How do you leverage your different skill sets?_**

**Josh**: My role as the UX lead right now is handling all aspects of user experience and visual design. I’m responsible for interpreting site maps and requirements, plus things like client/user needs and creating a user interface out of that. That starts with wireframing and ends with a visual design layer.

**Eric**: My role as Front End Engineer is very much in the implementation phase. Though I do advise in the discovery and budgeting phase, just so we can be sure that we can actually implement what the client wants. It’s nice because in the past, before joining the ThinkShout team, I’d done the whole gamut. From the requirements gathering phase to wireframing, and then the implementation. Here at ThinkShout, I’ve found my sweet spot. I do occasional wireframing, but I get to focus on lots of implementation. I also implement Josh’s designs. I write a lot of Javascript and [Sass](/blog/2014/07/getting-started-with-sass-for-drupal-and-zen-part-ii/), basically.

**Josh**: Eric is like the alchemist. He takes the metals - the designs from me - and turns them into websites. There is actually a large spectrum in between where my responsibilities stop and Eric’s begin. We still talk about things like, how do we go from an idea being on a screen, to that idea being a functioning website? We’re constantly thinking about how to best utilize our respective skillsets, always reevaluating our process to improve upon it.


**_What’s a recent project that you’ve really enjoyed working on?_**

**Eric**: [The SPLC (Southern Poverty Law Center) microsite](http://selma.splcenter.org/). I thought that was very well done. Josh did a lot of the front end work on that and I came in and did the site optimization, which is what I’ll be talking about at Devsigner. I thought that went really smoothly because at that time, all the work he’d done in the browser went directly to implementation. We were able to take exactly what he’d designed and [just build off of ](/blog/2015/03/media-optimization-with-splc/)[it](/blog/2015/03/media-optimization-with-splc/).

![devsigner_0]({{ site.baseurl }}/assets/images/blog/devsigner_0.png)

**_Can you talk a little bit about what the design process for the SPLC microsite was like, Josh?_**

**Josh**: We happened to be working on that right around the same time as I was doing wireframes for the upcoming [SPLC](http://www.splcenter.org/) main site that we’re redesigning. We were already doing a lot of thinking about their content and what their needs were. Because the [Selma: Bridge to the Ballot](/work/splc/selma/) movie was coming out on the anniversary of the Selma March, we wanted to have this ready to go in time for that day. There was no way we were going to launch the whole SPLC site along with it - we were too early in development for that - so we decided to split that project up and give them a campaign microsite that would be easy to build while we continued to work on their main site.

A lot of that meant working with their team to define their content needs. I began with basic wireframes in [Sketch](http://bohemiancoding.com/sketch/), and uploaded them into [Invision](http://www.invisionapp.com) to give them interactivity. As SPLC came up with more fidelity to what their needs were, we solidified the visual designs. Luckily, they already had a lot of assets that their really great internal design team had created for the movie, so I was able to go off of that style. I took their visual style and applied it to the wireframes and at that point, I went to Eric for a consultation and said, "Ok, if we’re going to build this in [Jekyll](/blog/2014/10/success-building-cmsless-production-sites-with-jekyll/), what’s the best way to do this as far as the architecture goes?" Eric was a huge help in regards to file structure. He wrote a great rake script to automate all the Jekyll, Sass, and Javascript components. That’s when I jumped in and rebuilt what I’d done in Sketch, and added more fidelity with HTML and Sass. I then passed it onto to Eric so he could do his unicorn magic.

![devsigner_1]({{ site.baseurl }}/assets/images/blog/devsigner_1.png)

**Eric**: And that’s a nice part about where our skills overlap: we can get closer to what we want. He’s a better designer than I am. My strengths lie in the code. I’ve designed when I had to, but it’s not my forte, so it’s nice to have Josh’s expertise. So these skill sets compliment each other. I feel comfortable handing over my implementation to design and saying, "Hey, can you polish the nav? Or the design?" Things like that.

**_What design trends do you want to see more of? Or less of?_**

**Eric**: I think [flat design](https://en.wikipedia.org/wiki/Flat_design) is getting boring. I’m starting to see a little bit more texture in the things we’ve done. Like patterns, not just flat design for the sake of flat design. There’s texture strategically used to make things look better. For instance, in the [Capital Area Food Bank of Texas](https://www.austinfoodbank.org/) site, there’s a bit of a pattern in the footer. It’s not just a flat blue background with text. I really like patterns that are used to call out different sections of a design. It adds to it and brings something out of the page. It used to just be that admin interfaces were this flat. But now everything reflects that. Lots of rectangles. I personally like shapes and textures and patterns.

![devsigner_2]({{ site.baseurl }}/assets/images/blog/devsigner_2.png)

**Josh**:  It’s tricky to know when to add life to what’s a very flat trend right now. I come from the old school world of web design, which was about how cool can you make your shadows look in Photoshop, how three-dimensional can you make things appear. Now that’s kind of like wearing skinny jeans in the late nineties, when you wouldn’t be caught dead wearing them. Or neon colors. So I think what’s happening is that it’s not *just* that flat design is popular. If you look at other design mediums, like automotive or architecture, there’s a phase with extreme ornate elements. You know, crazy fins, details, lights, every car had a custom badge. All that stuff. And then you have the modern era after that where everything gets streamlined and simplified. It’s more about the function over the form, and the function drives the form. You see the opposite in the Victorian era. Go walk along the St. Johns bridge and look up at a lamp. You’ll see these ornate, twisted little embellishments along the lamps. But the purpose of a lamp is to provide light. Those embellishments do nothing to support the function. They’re just there to make it look pretty.

I think we’re seeing a lot of that in digital design as it matures. We’re getting rid of the stuff that doesn’t support the function and focusing more on the *intent* of the users. While we’re taking that ornate-ness out of it, we’re also adding a lot more micro-interactions and animations. Things that actually help you do what you’re there to do. At first, I was kind of against that. But now that I think about it as post-modern design for the web, it makes more sense to me.

**_How do you advise nonprofits on this? Do these same trends benefit nonprofits as much as they do for-profits?_**

**Eric**: I think knowing your end user is what determines your path. A lot of nonprofits have similar goals as for-profits when it comes to their websites - they’re trying to tell a story and engage their users. But the main thing is, do the organizational goals reflect what the user is coming there for? For instance, we work with the [LA Conservancy](/work/la-conservancy/). They work to preserve historical buildings in LA. We didn’t just look at them, and then try to make their website look like a pretty building. But we also had this discussion in LA about form versus function. But I wonder, where does that meet in the middle? That’s what I struggle with. Because I do think there’s value in ornate elements like that. They set a mood. So I think that’s part of function - that ornateness sets the mood you want to present to your users to help them feel the connection to the organization’s cause.

**Josh**: Nearly every major design phase, whether it be automotive, architecture, art, whatever, there’s always a backlash to those current trends. So there will be backlash to flat web design. It may be a subculture, it may take over. But whenever something gets to be ubiquitous, there’s always someone who wants to do something totally different. It’ll be interesting to see what that is.

**_I feel like that’s the nature of creativity… We see something, we make it part of our process, plus a spark of something new._**

**Eric**: We all have things we’re influenced by. To me, Google stands out. They’ve really led in the trends that people are using. There’s a level of depth to their designs that make me feel like I can reach out and grab it. It’s flat in some ways, but yeah, there’s definitely some depth.

**Josh**: Yeah, I think Google’s done a really great job. And you can see this happening in the app world. The current trend is also getting ubiquitous.

**_Devsigner is at the end of the month and you both are leading your own sessions. Can you tell us a bit about them?_**

**Eric**: My session is called "Optimization is User Experience." I think this is something everybody can use, which is why it’s listed as a beginner talk. We learn web design, we learn app design, we release these things to the world where we don’t have control over devices and users’ bandwidth, so it’s important to know that this beautiful thing you’ve created can be experienced correctly regardless of what device it’s viewed on.

**Josh:** So my session is based on something I’ve noticed. I worked on a lot of projects where there’s limited time, budget, or resources. Maybe there isn’t any resource for stock photography, or there’s just a really small team working on it. I’ve always had to find ways to be creative with what I have and with a small budget. I signed up to speak at [Refresh Portland](http://rfrshpdx.org/) and I figured this might be a shared struggle and that other people could learn from my experience: how to stay under budget and still come up with a great, workable design. It’s called "Ballin’ on a Budget."

*Want to dig deeper into design with Josh and Eric and pick their brains? Come to [Devsigner](http://www.devsignercon.com/), which takes place during June 27-28 at the Pacific Northwest College of Art in Portland, Oregon. Check out the full session schedule on the Devsigner site. You can also follow Josh and Eric on Twitter at @joshriggs and @epxtn.*
