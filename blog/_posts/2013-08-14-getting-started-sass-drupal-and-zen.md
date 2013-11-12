---
layout: post
title:  Getting Started with SASS for Drupal and Zen
date:   2013-10-21
short: Want to get started using SASS/Compass with Drupal? And fast? This series will give you an introduction to SASS/Compass, plus how get started using it with Drupal right away using the Zen base theme.
categories: jekyll update
---

Part 1: Installing and configuring SASS/Compass

Want to get started using SASS/Compass with Drupal? And fast? This series will give you an introduction to SASS/Compass, plus how get started using it with Drupal right away using the Zen base theme. Welcome to Part 1: Installing and Configuring SASS/Compass.

In case you missed it, SASS (or Syntactically Awesome Style Sheets), is a new way of writing CSS that can save you time, future-proof your code, and make your stylesheets–like the acronym says–Awesome. SASS is a CSS preprocessor, which means that you can write your stylesheets in SASS, complete with all its nifty features, and compile it to regular CSS that your browser can read. On its own, SASS gives you the ability to use nested styles, variables, functions, operators, and a whole lot more.

While SASS is great on its own, it's even better when you add Compass to the mix. Compass Core describes itself as "a design-agnostic framework that provides common code that would otherwise be duplicated across other frameworks and extensions." Basically it gives you a huge library of commonly-used styles and functions to work with, such as cross-browser CSS3 code, typography rules, and tools for image sprite generation.

Now that you're (hopefully!) excited to start using Compass/SASS, let's move on to the tutorial:

Install SASS/Compass

To start, you need a copy of SASS and Compass on your computer. There are a couple different ways to install them:

A. Install SASS/Compass using a Ruby gem (the package manager for Ruby).

There are several tutorials on how to install using this method, and they vary depending on what operating system you use. So check out one of these tutorials and come back for step 2. Don't worry, we'll wait.

i. http://thesassway.com/beginner/getting-started-with-sass-and-compass
ii. http://compass-style.org/install/

B. Use an application that manages SASS/Compass for you.

This is probably the easiest way to get up and running with SASS, especially if you're not comfortable working on the command line. Some of these apps also boast nice features, such as automatic browser reloading and support for additional preprocessors and libraries, such as LESS and Bourbon.

i. Scout (Mac/Windows, Free)
ii. Compass.app (Mac/Windows/Linux, $10 at time of writing)
iii. CodeKit (Mac, $28 at time of writing)

Configure SASS/Compass to watch your project for changes

Now that we have it installed, how do we use it? Essentially, we need to tell Compass to "watch" a certain folder or project. Then each time we make a change to a file in that project, SASS/Compass will compile it into a CSS file that our browsers can read.

If you decided to use an app to manage SASS/Compass, adding a new project is probably as simple as clicking a "new" or "add" button in your app and selecting your project folder. (Hint: Your project folder will be where config.rb is located, which we'll discuss in a bit).

If you're using a command line interface, tell Compass to watch a folder with:

compass watch [path/to/project]
More information on Compass command line options can be found at:

i. http://compass-style.org/help/tutorials/command-line/

Install Zen

Typically at this point, we would talk about how to configure your project for SASS/Compass. However, the über-popular Zen base theme for Drupal comes with some great defaults, so let's jump right in to using SASS with Zen.

Start by downloading Zen (at least version 5.4) from Drupal.org and creating a new sub theme, which we'll call "mytheme".

i. Instructions with Drush: https://drupal.org/node/2021609
ii. Instructions without Drush: https://drupal.org/node/1549668

Then tell compass to "watch" your new subtheme by adding the "mytheme" project folder to your app or using the command line interface as described above.

Zen File Structure

Now that we have "mytheme" set up, let's look at the file structure:




