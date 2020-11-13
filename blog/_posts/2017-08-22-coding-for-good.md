---
layout: blog
body-class: blog-post
topic: archive
hidden: true
title: Coding for Good
homepage: false
author: myisha
published: true
featured: true
short: Back-end intern Myisha shares her experience from her internship here at ThinkShout and what inspired her to create her own website with a cause.
tags:
  - ThinkShout Cares
  - Interns
  - p:ear
date: 2017-08-22 12:30:00
image: https://thinkshout.com/assets/images/group-photo-large2.jpg
header-image: /assets/images/blog/group-photo-large2.jpg
header-image-alt: "ThinkShout Cares, A 2017 Intern Project"
---

Ever since I started coding, I've wanted to create a product that would make a difference. I wanted to contribute something good to society that would make someone else's future better.

This summer, I got to do that.

My journey started with the [Emerging Leaders Internship Program](http://emergingleadersinternship.org/about) (ELI). ELI helps match interns from underrepresented communities with companies in Portland. I was selected as a finalist in the program, and that is how I ended up at ThinkShout!

![pear-Summer-Mission.png](/assets/images/blog/pear-Summer-Mission.png)
{:.center}

I joined the ThinkShout team as a back-end development intern, my primary responsibility would be to build a website for their [summer campaign](http://give.thinkshout.com/) alongside two other interns that worked on front-end development and design. Walking into a tech company can be intimidating; everyone looks and sounds so smart and talented. I was confident in my skills, but as an intern I worried I would not be able to deliver if I had to learn new languages or frameworks for the project. As I became immersed in the work however, that fear quickly vanished, and looking back I probably learned at least 15 new things every day, maybe even every hour.

The goal of the summer campaign site we were building was to raise money through t-shirt sales for a local nonprofit called [p:ear](http://pearmentor.org/). P:ear is an organization that creatively mentors homeless youth through education, art, recreation and job training. Their students designed one of the new shirts exclusively for this campaign, and our design intern, [Alejandro](https://thinkshout.com/blog/2017/08/designing-for-a-cause/), designed the other new shirt! 

For back-end development, the team decided to use Jekyll (an open source framework), a Shopify Storefront API plugin for the store, and an Amazon Web Services S3 to host the website. Jekyll was a simple solution for the project, since we were creating a one-page static website. Learning Jekyll was a little confusing since I had never worked with Ruby Gems or Liquid before, but their instructions are well documented so the initial site setup went smoothly.

My major roadblock in this project was working with the Shopify Storefront API. It is still in beta, so the problems I ran into were not well documented which led me to a lot of dead ends. Finally, I was able to get the products embedded by using Shopify's "buy" button, which uses an access key to query in and display all products within a selected collection, and then automatically generates code, which can then be placed into a Javascript file.

![shopify-cart.png](/assets/images/blog/shopify-cart.png)
{:.center}

Amazon Web Services provides a simple way to host a static site using an S3 Bucket. Essentially all you have to do is drop the files into the bucket and do some small configuration modifications to get the site hosted. 

All the hoops I had to jump through to create the site ended up being great learning experiences. I had never worked with APIs before this project, and now I'm much more comfortable with them. I also got the chance to write a few Javascript functions, work with Github tickets, and gain experience working with an open source framework. 

The experience of partnering with a nonprofit was also extremely valuable. Working with the students from p:ear really changed my perception of homelessness too. It taught me to look beyond what's on the surface, and inspired me to pursue a project I had been thinking about for some time.

I had been wanting to create a website where black women could come together and discuss hair, hair products, and recommendations around both. But I also wanted it to be a space where we could figure out how to get unused/gently-used products to women who were homeless or from low-income households who could otherwise not afford them. 

![Project_C.png](/assets/images/blog/Project_C.png)
{:.center}

While doing back-end work for the [p:ear campaign website](http://give.thinkshout.com/), I was simultaneously [creating my own website](http://project-curls.org/) using open source software, Drupal. I had never used or even heard of Drupal before this summer and now I have completely developed a website using it, created a module, and have contributed a website to society that I believe will help with the distribution of hair care products for black women. 

During my initial interview with ThinkShout, I was asked what I wanted to get out of this internship and I responded with, "experience." It sounds broad, but having just completed my freshman year of college, I really didn't know what area of technology would be best for me. Interning at ThinkShout has been a phenomenal experience, and as I continue to pursue a BS degree in Information and Computing Sciences, I hope to apply the professional and technical expertise I gained here to my studies and my next opportunity. 
