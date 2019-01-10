---
title: The Technology Behind the New ThinkShout.com
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

author: lev
featured: false
short: How we used Jekyll, Foundation, GitHub, and Amazon S3 to build and deploy the new ThinkShout.com.
tags:
- Drupal Planet
- Jekyll
date: 2014-03-05 15:00:00
---

Now that we've covered the [goals, strategy and process for our new site](/blog/2014/02/the-new-thinkshout-website/), I wanted to dive into the technology choices we made. First, the obvious: unlike most of the sites we've launched over the last four years, this one is _not_ built with [Drupal](http://drupal.org). Instead we used [Jekyll](http://jekyllrb.com), one of a fast growing list of [static site generators](http://staticsitegenerators.net/) (SSG), along with [Foundation 5](http://foundation.zurb.com/), [GitHub](http://github.com), and [Amazon S3](http://aws.amazon.com/s3/) for hosting.

![Jekyll logo](https://jekyllrb.com/img/logo-2x.png)

## So, why not Drupal?

We love Drupal. We're committed to it. We actively [contribute to](https://drupal.org/marketplace/thinkshout) and [participate in](http://myntc.nten.org/eventdetails/precon/drupal) the community. But the reality is that Drupal is not the right fit for _every_ project. Structurally, our website is fairly simple brochureware along with a blog. That does not fit the criteria that we generally tout as Drupal's strengths, namely complex data structures, custom applications, third party integrations, and numerous features encapsulated into a single website. In addition, we wanted our website to focus on our clients and the ThinkShout team, and we were excited about the flexibility a Jekyll site afforded us in crafting unique user experiences for each section and page without having to do battle with Drupal's theme layer and developer workflow to achieve them.

Our own website afforded us an opportunity to leverage a new technology and development process at a much lower risk point than doing so for a client. Keeping in mind all the Drupal caveats I've already stated, we have always avoided calling ourselves a "Drupal shop", whatever that actually means. What we don't waver on is providing value to our forward-thinking clients by crafting elegant user experiences and leveraging open source technology; this often, but not always, means using Drupal. Our new site allowed us to explore the process of building, launching, and maintaining a Jekyll site so we can better evaluate the kind of client engagements it would be a good fit for.

Finally, we wanted to use Jekyll just because _we could_. We are geeks and technologists at heart, and love trying new things. That can be hard to do sometimes when demand for Drupal is so high and we're keeping busy with our client engagements. Using a new platform for our own website gave us an opportunity to experiment and learn with a concrete goal (and schedule!) more or less on the clock. Sounds like a win to me.

## Some Jekyll benefits

The following list is far from comprehensive, but includes some of the things we were most excited about using Jekyll this first go around.

### Project velocity
Since we already use Jekyll and Foundation for wireframes and prototyping, we went from early concepts and prototypes to final site build in no time at all. Iterations also went much faster as we weren't encumbered with Drupal's configure/export/enable Features based development workflow.

### Flexibility
While we are well aware that Drupal doesn't inherently limit the design and user experience of a site, it certainly can take considerable effort to bend Drupal's complex data structures and theme layer to your will. Without those limitations, we were free to push creative boundaries and explore unique user experiences. And iterate on those experiences. And experiment with new layouts for each section and even page. In short, we felt comfortable experimenting with the user experience because the cost of mistakes was fairly low.

### Performance and maintenance
The final site as served to end users consists only of static assets: HTML, CSS, Javascript, and images. The speed is limited only by front end optimizations and the latency on your file server. Combine it with a CDN and the site is, as we like to say, stupid fast. Our very unscientific performance benchmark using apache benchmark for 1000 requests with a concurrency level of 100 comparing the Jekyll site staged on GitHub pages to our old site running in production on Pantheon (one of the absolute best Drupal environments out there), showed the following (Pantheon v GH Pages):

- Requests per second: 63 vs 289
- Time per request: 1566 vs 344
- Failed requests: 221 vs 0
- Transfer rate: 1629 vs 177
- Time to complete 100% of requests: 15667 vs 1480

Oh yeah, and NO SECURITY OR MAINTENANCE UPDATES. EVER.

## The process

### Data migration
Migration was not a major issue given the nature of our site combined with the fact that we were taking the new site as an opportunity to rework much of the copy, including our portfolio. We, did, however, need to migrate our blog. Jekyll ships with a [migration class that supports Drupal](https://github.com/jekyll/jekyll-import/blob/v0.1.0.beta4/lib/jekyll-import/importers/drupal7.rb), which didn't quite meet our needs, mostly due to a lack of support for taxonomy terms. We used it as a starting point, though, and with a few minor changes, had our own migration script which converted our Drupal blog history into a set of Markdown files in the new site structure. We decided to use Disqus as the commenting engine on the new site and, while there are some great [examples out there of migrating Drupal comments to Disqus](http://fuseinteractive.ca/blog/migrating-comments-drupal-7-disqus), and we appreciate the value of some of our comment threads, in the end we decided it wasn't worth migrating them over and are starting with a clean slate for comments.

### Jekyll plugins
Jekyll plugins are written in Ruby and are processed when the site is built. There are three categories of plugins.

- Generators create content.
- Converters change text, E.g., from Markdown to HTML.
- Tags define liquid tags to use in your templates.

There are number of builtin plugins which cover basic blog features and a rich [ecosystem of contributed plugins](http://jekyllrb.com/docs/plugins/), covering things like generating a [sitemap.xml](https://github.com/kinnetica/jekyll-plugins) and [RSS feeds](https://github.com/agelber/jekyll-rss). We did find that we needed to create a few of our own as well, which, once we got the hang of it, was very straightforward. For example, we are storing all of our team members in a [data file](http://jekyllrb.com/docs/datafiles/) and are generating a team member landing page for each person using a generator plugin. We also wanted to mimic Drupal's tag landing pages, so we wrote a generator plugin for that plus a filter to output the tag list on blog detail pages.

### Content management
While the idea of cloning a repository and editing markdown files in one's favorite text editor is appealing to some folks, it's jut not a realistic expectation for many users, especially when you throw git into the mix. Enter [Prose.io](http://prose.io), a content authoring environment from our friends at [Development Seed](http://developmentseed.org/) made for managing sites hosted on GitHub. It has special affordances for Jekyll, but can work with any static content. In addition to a nice content editor, you can define metadata for your posts presented as form elements.

This configuration:

~~~yaml
prose:
  rooturl: "blog/_posts"
  siteurl: "http://thinkshout.com"
  media: "assets/images/blog"
  metadata:
    blog/_posts:
      - name: "layout"
        field:
          element: "hidden"
          value: "post"
      - name: "short"
        field:
          element: "textarea"
          label: "Short teaser"
      - name: "author"
        field:
          element: "text"
          label: "Author short name"
      - name: "tags"
        field:
          element: "multiselect"
          label: "Tags"
          help: "Enter one or more tags ..."
          alterable: true
~~~

Yields this form:

![prose metadata](/assets/images/blog/prose-metadata.png)

Aside from Prose.io, content can, of course, be managed the old fashioned way by cloning, adding, and pushing files via git. In addition, content be managed directly on GitHub which recently added file creation and has a nice editor and preview feature for markdown and html files.

### Hosting
We initially planned to host the site on GitHub pages because it handles the compilation of Jekyll source code, presents a unified project for development, issue tracking, and hosting, and is free and reliable. However, we found two critical limitations: Jekyll can only run in safe mode which means no third party or custom plugins and no support for redirect rules. After researching a few options, we settled on an Amazon S3 bucket configured for static web hosting.

- It's super simple to add CDN support via Amazon's Cloudfront.
- Rich ecosystem of tools and libraries. [s3_website](https://github.com/laurilehmijoki/s3_website) is a fabulous tool that has made it simple to publish the site with a single line command, `s3_website push`.
- We already use S3 for backup/archiving at ThinkShout.
- Support for complex redirect rules, gzip compression, and any other http headers.
- Cheap, reliable, and, as mentioned above, **fast**.

### Deployment workflow
Among the many reasons we love working with infrastructure partners like Pantheon and Acquia is the elegant and simple deployment workflow they provide, with automated git based deployment to a dev site and push-button migration to staging and production environments. Without the help of those platforms, we're on our own for previewing new features, staging content, and deploying code. We've settled on the following.

- We created a separate S3 bucket for our staging site.
- The git repository has 3 main branches, dev, master, and live. Feature branches off of Dev are used for feature development, any content or data is pushed to master which is deployed to the staging site, and content and new features are merged into live before being deployed to produciton.
- Prose.io, where most content is managed, is mapped to the master branch.
- We have rake tasks in the project root for deploying to staging and production, as well as building and previewing the site.

The process is far from perfect.

- It relies on process and training, there are no enforced rules and workflow.
- Deployments themselves are manual.
- Content editors can only preview content within the site context after it gets pushed to staging if they don't have a local Jekyll environment.

This is perhaps the biggest gotcha we've encountered so far using Jekyll, especially as we consider which client engagements it will be a good fit for. There are promising solutions, including Development Seed's [Jekyll hook](http://developmentseed.org/blog/2013/05/01/introducing-jekyll-hook/) project to automate deployment. We're excited to learn from our own experiences and those of others to find the best way for clients to manage their Jekyll sites.

## Miscellaneous Jekyll gotchas
A lot of the challenges around using an SSG really depend on where it's hosted and others are inherent to the approach. The items below encapsulate some of our experiences and are just one data point in deciding when Jekyll or another SSG is a good fit.

- GitHub pages and other pure "file system" based approaches don't support true 301 redirects. There are javascript based hacks which are less than ideal. Obviously a bigger issue if upgrading an existing site. ThinkShout.com is hosted on S3, which does support .htaccess style redirect rules.
- Pretty URLs are generally in the form /about/ rather than just /about.
- Contact and other web forms must rely on a third party system to accept and process submissions. We tried integrating a Google form and then settled on an embedded [ZoHo CRM](https://www.zoho.com/crm/) lead capture form after we settled on ZoHo as our CRM.
- Comments must be handled by a third party provider like [Disqus](http://disqus.com/). Since we were excited to switch to Disqus anyways, this was a nonissue.
- Site search must rely on a third party indexer or use a Javascript based approach that doesn't scale or handle non-text assets.

## Conclusion

It was fun to use a different platform for our new website. We learned a lot. We love the "light weight" nature of Jekyll and the flexibility it afforded us. We view the project as a major win and would do it all over again. It gave us experience and valuable lessons that we can apply to client engagements. 

But Jekyll is far from a panacea for all use cases. It presents many challenges that we don't even have to consider when using Drupal. For projects that require complex data structures, custom application development, site building capabilities for end users, and numerous integrated features, Drupal is an obvious choice. Even more importantly, for projects that need to leverage a rich ecosystem of contributed functionality that relies on a dedicated community, Drupal is an even stronger choice. And we're honored to be a part of that community and continue to engage and contribute to it.

But we had fun with Jekyll, are happy with the results, and look forward to finding exciting use cases for our clients where it will be a great fit.
