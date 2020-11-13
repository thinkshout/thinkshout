---
layout: blog
body-class: blog-post
topic: archive
hidden: true
title: The 2017 ThinkShout Front-End Stack
homepage: false
author: joe
published: true
featured: false
short: A solid base for theming world-class websites, regardless of CMS.
tags:
  - Drupal Planet
  - Drupal
  - Front-end
  - Browserstack
  - SASS
  - Bourbon
date: 2017-02-06 13:00:00
image: https://thinkshout.com/assets/images/thinkshout-logo1.jpg
---

Front-end development is full of challenges - changing design trends, browser idiosyncrasies, client demands, and ever-evolving web standards to name a few. Over the last few years though, a new challenge has emerged. Which development stack should you choose?

Once upon a time, front end development didn’t really have a “dev stack.” You had markup in files, maybe output from a CMS, a stylesheet, and some jQuery if you felt like getting fancy. Now though, the array of options can be paralysing. Pre-processors, post-processors, task runners, and package managers have made many aspects of development faster, but which ones are best? Where do you start?

Here at ThinkShout, under the watchful eye of [Eric Paxton](/team/eric/), our Senior Front End Engineer, we’ve been trying out the various options whenever we take on a new project, to see how well it fits in our theming process. We’re pretty busy, so this covers a lot of ground quickly. We’ve been careful to [fully document](/blog/2016/07/the-hidden-power-of-documentation/) the tools used in the past so that we don’t bedevil the maintenance folks. (We are often the maintenance folks).

The last few builds have seen our dev stack settle down to a flexible tool set that is easy to setup and maintain, while providing us with excellent modern theming tools. Let’s dive in!

## Getting Started: Languages, Handlers, and Package Management
At the bottom of a development stack are the languages used, the language handlers, and the package managers that allow you to include pre-built tools and libraries in your project. Some of these are interchangeable, but it solves a lot of problems if everyone uses the same fundamental tools.

In our case, we use [Ruby](https://www.ruby-lang.org/en/) and [JavaScript](https://en.wikipedia.org/wiki/JavaScript) as the base languages, and [rbenv](https://github.com/rbenv/rbenv) and [Node](https://nodejs.org/en/) as their handlers. By using Ruby and JavaScript, we get access to an extremely wide array of applications, tools, plugins, and more. Once these are installed (Using an OS package manager! In this case, [Homebrew](http://brew.sh/) (since we all use Macs), we add package handling for these languages: [Bundler](http://bundler.io/) and [NPM](https://www.npmjs.com/) respectively. This gives us the following base:

* Ruby via rbenv, managing gems using Bundler
* JavaScript via Node.js, managing packages using NPM

Now we can specify Ruby Gems and Node packages in a Ruby Make file (`Rakefile`), and a complex project setup is as simple as running `rake install` once from the theme directory, and starting the task watcher using `rake serve`. (To be more precise, we use the Rakefile to install the Ruby Gems as defined in the Gemfile, and the Node modules as specified in the `package.json` file).

The complete project setup for a new developer would be the following:

~~~ html
~: brew install rbenv
~: gem install bundler
~: brew install node
~: brew install npm
~: cd ~/path/to/theme/directory
~: rake install
~: rake serve
~~~

After that, any new projects would only need the last three lines run.

The key to making this work is to have a `Rakefile`, a `Gemfile` and a `package.json` set up in our project’s theme so that `rake install` works properly. In our case we use the Rakefile to first run `bundle install`, which installs the appropriate gems and their dependencies:

Rakefile:

~~~ ruby
task :install do
     system 'bundle install' # this runs the Gemfile contents!
     system 'npm install -g browser-sync'
end
~~~

Gemfile:

~~~ bash
source 'http://rubygems.org'
gem 'sass'
gem 'sass-globbing'
~~~

This [generates](http://bundler.io/v1.3/rationale.html) a `Gemfile.lock` listing all of the installed packages/versions.

The `npm install` lines in the Rakefile setup tools that we’ll discuss later. Our next layer in the stack are the SASS tools that Bundler installed.

## SASS at ThinkShout (please pass the Bourbon)
In the middle of our stack is [SASS](http://sass-lang.com/). We use SASS in a fairly simple way at ThinkShout, installing it with [sass-globbing](https://rubygems.org/gems/sass-globbing). This allows us to set up directories that allow any files using the appropriate `_filename.scss` syntax to be included in the build. We also tend to keep the directory structure fairly minimal:

`style.scss`:

~~~ css
@import 'lib/bourbon/bourbon';
@import 'lib/neat/neat';
@import 'lib/normalize/normalize';
@import 'global/*';
@import 'layout/*';
@import 'modules/*';
~~~

The first thing we include is the [Bourbon](http://bourbon.io/) mixin library. This includes coding shortcuts such as the [pixels-to-rems](http://bourbon.io/docs/#px-to-rem) syntax `rem(24)`. This allows us to read a design’s pixel spacing and it converts them to the appropriate rem values. The [Bourbon Docs](http://bourbon.io/docs/) are excellent and well-maintained as well. Never worry about browser prefixes or fallbacks again.

Next up is the Bourbon-related grid framework, [Neat](http://neat.bourbon.io/). A simple but powerful grid that uses semantic markup and easy-to-read terminology such as `@include span-columns(9)`. No extra wrappers, no specific classes to add, and it’s extremely robust. We haven’t run into any cross-browser issues in over two years of using it, which says a lot, and since it’s only applied as you specify, it’s easy to break out of the grid if you need to.

Next up is [normalize.css](https://github.com/necolas/normalize.css), a modern update to the old CSS reset stylesheets. Not really much to add to that except it’s _really_ well commented, so make sure you change it from `normalize.css` to `_normalize.scss` so that you don’t bloat your final `site.css` file.

The `Global` directory has the following:

~~~ bash
_01.vars.scss
_02.mixins.scss
_03.extends.scss
_04.base.scss
~~~

The _01, _02, etc. prefixes take advantage of the sass-globbing’s alphabetical file inclusion. All our site variables (colors, font weights, and so forth) are in `vars`, our custom mixins are next, then extends. Base has all of the base markup styles:

~~~ css
body {
  font-size: rem(16);
  font-style: normal;
  font-weight: $regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  text-rendering: optimizeLegibility; // Fix the character spacing for headings
}

p, a, ul, ol, etc...
~~~


The layouts directory usually has a `_layouts.scss` file, which covers the basics of site layout. Since we use Drupal, we’ll often add a `_regions.scss` as well to specify layout for the various Drupal-generated content zones on a site. These files are where we use the Neat framework the most.

Finally, we have the `modules` directory - where most of the theming takes place. These are usually named by content type (`_basic-pages.scss`, `_articles.scss`, etc.), though there are often files such as `_forms.scss` and `_homepage.scss` as well. Sometimes we don’t even have to use our [source maps](http://thesassway.com/intermediate/using-source-maps-with-sass) to know where code is!

One of our good habits is to start with our mobile-first, responsive `_01.template.scss` file:

~~~ css
// Default / Mobile

// Tablet (580px)
@media all and (min-width: $tablet) {
}

// Large Tablet (768px)
@media all and (min-width: $lg-tablet) {
}

// Desktop (1228px) $max-width: 1440px
@media all and (min-width: $desktop) {
}
~~~

When you want to add another theming module, you just make a copy of the template and your progressive breakpoints are included! (The `$max-width: 1440px` is there in a comment  because it’s handy).

All of this gets handled by a task in our Rakefile, which sets a watcher for changes to any SASS file and compiles them into a single `css/style.css`:

~~~ ruby
desc 'Watch sass'
task :sasswatch do
system 'sass -r sass-globbing --watch sass/style.scss:css/style.css'
end
~~~

## Pulling It All Together: Browsersync!

Finally, at the top of our stack, we have [Browsersync](https://browsersync.io/). Eric Paxton, our Senior Front End Engineer, wrote an [excellent overview](https://thinkshout.com/blog/2016/04/syncing-up-with-drupal8-and-browsersync/) of why we use this amazing tool, what it does, as well as how to install it in detail for Drupal 8.

In our stack it’s as simple as another task in that Rakefile:

~~~ ruby
desc 'Running Browsersync'
task :browsersync do
     system 'browser-sync start --proxy "local.dev" --files "css/*.css" --no-inject-changes'
end
~~~

And adding the following (generated by running `browser-sync start`) to the site’s `<head>` :

~~~ javascript
<!-- <script id="__bs_script__">
  //<![CDATA[ document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.2.12.3.js'><\/script>".replace("HOST", location.hostname));
  //]]>
</script> -->
~~~


This also sets a watcher on the CSS, and refreshes every browser you have open to `localhost:3000` or the local network IP address it generates upon running `rake serve`.

The last part of the Rakefile implements the tasks we set up:

~~~ ruby
desc 'Serve'
task :serve do
  threads = []
  %w{sasswatch browsersync}.each do |task|
    threads << Thread.new(task) do |devtask|
      Rake::Task[devtask].invoke
    end
  end
  threads.each {|thread| thread.join}
  puts threads
end
~~~

This has the _magical_ effect of opening a new browser window to `localhost:3000` when you run `rake serve`, and reloading it every time you save any of your SASS files. It also scrolls all open windows together, even when you open up things on your phone using the local network proxy, which it helpfully provides as output:

~~~ html
>>> Sass is watching for changes. Press Ctrl-C to stop.
[BS] Proxying: http://site.dev
[BS] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://172.16.5.235:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://172.16.5.235:3001
 -------------------------------------
[BS] Watching files...
[BS] File changed: css/style.css
      write css/style.css
      write css/style.css.map
~~~

This is really the cherry on top of the dev stack - after using it for a little while, you’ll wonder how you ever got along reloading everything manually.

## Stack Overview

In summary, here’s that front-end stack:

* Ruby via rbenv, managing gems using Bundler
* JavaScript via Node.js, managing packages using NPM
* SASS with globbing, set up in a simple directory structure
* Bourbon Mixin library
* Neat Grid system
* Normalize.css as _normalize.scss
* A simple module template containing responsive breakpoints
* Browsersync

None of this is carved in stone of course, and it gets slightly tweaked for every new build based on the project requirements, such as internationalization, the base CMS (Drupal, WordPress, or Jekyl in our case), and the desire to try out something new, which is fairly constant. After all, that’s how we got to the stack we have today!


