---
layout: post
title: "A beginner's guide to using Hudson for continuous integration with Drupal"
created: 1285784669
permalink: "blog/2010/09/sean/beginners-guide-using-hudson-continuous-integration-drupal/"
tags: 
  - Drupal
  - Drupal Planet
  - Continuous integration
  - Testing
  - Best practices
short: "Developing our first open source Drupal product, Watershed now, as well as in our recent work on internationalization in Drupal 7 with Meedan.net, we've run into some bottlenecks managing the testing of new releases of Drupal installation profiles and features. The only way to make sure that installation profiles are built correctly obviously is to build them up from scratch. Features exports are great, but they too can be a little tricky, and thus require continual testing."
author: sean
published: true
featured: false
---

Developing our first open source Drupal product, [Watershed
now](http://drupal.org/project/watershednow), as well as in our recent work on
internationalization in Drupal 7 with [Meedan.net](http://meedan.net), we've
run into some bottlenecks managing the testing of new releases of Drupal
[installation profiles](http://drupal.org/project/Installation+profiles) and
[features](http://drupal.org/project/features). The only way to make sure that
installation profiles are built correctly obviously is to build them up from
scratch. Features exports are great, but they too can be a little tricky, and
thus require continual testing.

Especially for complex Drupal distributions, running an installation profile
by hand takes a nontrivial amount of time. Then, clicking through and testing
that everything is working correctly is even more time-consuming. Wouldn't it
be great if there was a way that you could just check your new Drupal code
into version control and have a dozen helpful little gnomes do all this
testing for you?

###  _Enter Hudson..._

**[Hudson](http://hudson-ci.org/)** is that helpful gnome. More specifically, Hudson is an "extensible [continuous integration (CI)](http://en.wikipedia.org/wiki/Continuous_integration) server". From a 10,000 ft view, Hudson is a tool for offloading the deployment and automated testing of a software application. You write your code, you push it into version control, and Hudson takes over the tasks of grabbing that code, running an installation/deployment process, testing the application (if you provide it with tests), and reporting back to you those test results. 

There are a number of different continuous integration tools out there written
in a variety of languages. Hudson seems to be leading the pack in the Drupal
space. I'm not exactly sure why Hudson is _winning_. For our part, we like
working with Hudson because it provides a large number of integrations with
other development tools, it provides an intuitive and easy-to-use, web-based
user interface, and it can be quickly installed on a Debian server via
standard package management (+1 for us folks that don't want to spend our
lives doing systems administration).

###  Our Hudson workflow

We'll geek out in a minute to help you get Hudson up and running. But first,
we'd like to outline how we are currently integrating Hudson into our
development workflow, as well as how we hope to take advantage of Hudson in
the near future. As of right now, we've setup Hudson to begin the build and
testing process every time that we commit upstream to a master code repository
on GitHub. By configuring a [post-receive hook](http://help.github.com/post-
receive-hooks/), GitHub fires off a simple HTTP request to our Hudson server
to begin the build process. Hudson clones our Drupal code repository and then
executes a short Bash script that uses Drush to install, configure, and test
our Drupal distribution. Once the build process is complete, this same Bash
script triggers Drupal to run our test scripts (in our case,
[SimpleTest](http://drupal.org/project/simpletest)). Upon completion of the
tests, Hudson emails us with the results of our automated tests.

Admittedly, the percentage of automated test coverage of our distros is not
high at this point. Since a lot of the user stories that we want to test in
our distros revolve around basic content management tasks, writing automated
tests often takes considerably more time than configuring the features
themselves. We're playing around with using [Selenium](http://seleniumhq.org/)
so that our project and product managers can record tests the first time they
click through a site to review features - and then including these tests in
our Hudson workflow. This would be a far cry from [test-driven
development](http://en.wikipedia.org/wiki/Test-driven_development), but it's a
start.

For our work with Meedan.net, we are also toying around with the idea of
integrating GitHub's [Jekyll-based
wiki](http://wiki.github.com/mojombo/jekyll/) with our project management
tool, [Pivotal Tracker (PT)](http://pivotaltracker.com). Leveraging Pivotal
Tracker's API, in theory, we could write out the associated user stories to a
GitHub wiki page every time that we close a release in PT. If a GitHub push is
tagged with that release, we would then have a wiki page write-up of all the
user stories that should be tested with a given Hudson build. That wiki page
would then become the test script for repeatable manual testing by our product
team.

_**Now the fun part...**_

###  Getting Hudson up and running with Drupal

As I mentioned at the beginning of this post, we are running Hudson on a
Debian server. Hudson is a Java app that runs on Tomcat. If you are
comfortable installing Java apps, you can run it on whatever you like -
including Windows. But we're lazy, and we like Debian - or more specifically
Ubuntu. All and all, the process for getting Hudson up and running on Ubuntu
was pretty easy. There's lots of little fiddly steps, but Googling all the
little error messages that popped up in our terminal, we were able to do this
pretty painlessly.

####  Step 1: Get an Ubuntu 10.04 server up and running

There are thousands of guides and options for getting a Debian-based LAMP
stack up and running. I always fall back on the wonderfully simple
[instructions](http://articles.slicehost.com/ubuntu-lucid) provided by
Slicehost. As for choosing a host, you want to consider the benefit of having
a CI server up and running all the time, versus the convenience of that server
having some beef specs to crunch through your automated tests more quickly.
For example, running the full suite of Drupal 7 simpletests on a 512MB
RackSpace Cloud Server took over 5 hours. If you are a power-user of Hudson,
you can configure it to spawn off builds to a network of slave servers to
distribute this testing load. For us, the answer was to build the Hudson
server on RackSpace's cloud with moderate server resources, knowing that we
could spin up additional instances as needed, as well as beef up a particular
instance with more RAM if we needed to run a lot of tests.

As for the specifics of our build, we basically followed the following
articles to get a pretty-vanilla LAMP stack running with PostFix as the
outgoing mail server:

  * [Ubuntu Lucid Setup - part 1:](http://articles.slicehost.com/2010/4/30/ubuntu-lucid-setup-part-1) Your Ubuntu Lucid Slice will be a bare-bones install when it's created. We need to connect via SSH and secure it as soon as possible. 
  * [Ubuntu Lucid Setup - part 2:](http://articles.slicehost.com/2010/4/30/ubuntu-lucid-setup-part-2) Now that we've secured access to our Ubuntu Lucid slice we can update it and get it ready for the rest of the server install. 
  * [Barebones Postfix install for Ubuntu:](http://articles.slicehost.com/2010/3/1/barebones-postfix-install-for-ubuntu) A barebones set of instructions for installing Postfix. Aimed at experienced admins who just want to set up a basic postfix install to send email from a slice. 
  * [Installing apache on Ubuntu:](http://articles.slicehost.com/2010/5/19/installing-apache-on-ubuntu) Installing the apache web server on an Ubuntu server is as simple using the "aptitude" package manager. 
  * [Installing PHP on Ubuntu:](http://articles.slicehost.com/2010/5/19/installing-php-on-ubuntu) Now that apache is running on your Ubuntu server you might want to add PHP support to it. Here's how. 
  * Finally, you'll want to make sure that you have command-line PHP installed so that you can run Drush: 

`&gt; $ sudo install php5-cl`

_(Note: As of 9/10, there's a small bug in the first line at the top of PHP's
Imagemagik and Mcrypt libraries that will throw annoying warnings when running
Drupal SimpleTests. To unclutter your test output, consider making a [quick
edit](https://bugs.launchpad.net/ubuntu/+source/php5/+bug/573436) to:

/etc/php5/cli/conf.d/imagick.ini and /etc/php5/cli/conf.d/mcrypt.ini.)_

####  Installing Hudson on Debian

Check out Hudson's own documentation of [the installation process on Debian
systems](http://wiki.hudson-
ci.org/display/HUDSON/Installing+Hudson+on+Ubuntu). It's basically just
pulling down the [.deb package](http://hudson-ci.org/debian/), and then
installing via package management. Depending on your environment, you might
need to first install some dependencies such as Daemon and Java:

`&gt; $ sudo apt-get install daemon`

By default, Hudson will run on port 8080. You can change that, but I find it
to be a good thing, as then I can run an associated Drupal site on port 80,
and switch back and forth between the two quickly in a browser (more on the
Drupal apache config later).

Note: Hudson will create a new user on your system called Hudson. Hudson and
all the CI "jobs" that you create with Hudson are stored under:
/var/lib/hudson.

####  Installing Git

Obviously, Hudson needs access to your codebase to run the build process. This
can be handled in a number of ways. We prefer to work off a clone of our code
repository on GitHub. To do so, you'll first need to install Git on your
server:

`&gt; $ sudo apt-get install git-core`

Next, you will need to make sure that the Hudson user on your system has the
ability to clone your remote Git repository. Setting up Hudson to pull from
private repositories or non-GitHub repositories is straight-forward, but out
of scope of this write-up. Since we're working on open source, public-facing
repositories, Hudson simply needs to be able to clone a repository using the
"read-only" repository URL. That said, we still need to set up Hudson as a
proper citizen of the Git world. To do so, run the following commands:

&gt; $ cd /var/lib/hudson

$ su hudson

$ git config --global user.name "hudson" # Let git know the Hudson user name.

$ git config --global user.email "example@example.com" # Make sure that Git
knows that user's email address.

####  Installing Drush

Our new Hudson user needs to be able to run Drush commands as part of the
build process. There are a variety of opinions on where and how to install
Drush. Personally, I like to install Drush in the home directory of the
primary user account that I use on the server (the one that I use for day-to-
day tasks and sudoing). First, download [Drush
3.x](http://drupal.org/project/drush) to /home/youruser. Then follow the
standard installation [instructions](http://drupalcode.org/viewvc/drupal/contr
ibutions/modules/drush/README.txt?view=markup). Pay particular attention to
step #3, as you need to make sure that any user on your system (in particular
Mr. Hudson) can run Drush.

####  Global Configuration of Hudson

When you first install Hudson, anyone with access to the Hudson GUI will be
able to run the application as an admin. If you are putting Hudson on a
public-facing URL, this obviously poses massive security issues. To get up and
running, you'll probably want to lockdown Hudson with the [standard security
step](http://wiki.hudson-ci.org/display/HUDSON/Standard+Security+Setup).

Next, you'll want to set the outgoing email address for Hudson, and add any
plug-ins or other configuration options that you'd like at:
http://hudson.example.com:8080/configure.

####  Configuring your first Drupal job

Now we're ready for the fun stuff - actually getting all these tools working
together to build and test a Drupal site. Hudson manages its builds based on
the concept of "jobs" and "workspaces". Each job represents a specific
build/testing process with unique steps. Each job also has a workspace that
contains the codebase that we're testing. For our initial, and simplest, use
case, we'll setup a single job that builds and tests code cloned from GitHub
in a single workspace.

_(As a point of reference, the basic directory structure for this
job/workspace is the following:

/var/lib/hudson/jobs/job_name/workspace_name.)_

To create a new job, we will:

  * Go to: http://hudson.example.com:8080/view/All/newJob, give the job an name, and select "Build a free-style software project." 
  * From there, you'll want to enter the public, read-only URL of the GitHub repo you wish to clone (again, this is for our simple example). 
  * Optionally, you can set a "trigger" for the build - which will provide a tokenized URL that GitHub can ping after a push to trigger the build process. 
  * Optionally, under **Post-build Actions**, you'll want to select "Publish JUnit test result report" and then set the path for these test results to: drupal_root/scripts/tests/_.xml (where "drupal" represents the root directory of the Drupal install - more on this purpose of this step below.) 
  * Most importantly, you'll want to add a build step to execute a shell commands once the project has been cloned with Git. It's here that Hudson will use Drush to build and test our Drupal site. 

####  Building and testing your installation profile with Drush

The command line steps for building a Drupal site from an installation profile
differ greatly between Drupal 6.x and Drupal 7.x. With the introduction of the
Drush command **site-install** in D7, the process is much easier. [Site-
install](http://drupal.org/project/drush_site_install6) has been backported to
D6, though I haven't used it personally. It seems like most folks using Hudson
for Drupal 6 testing are using [Aegir's](http://groups.drupal.org/hostmaster2)
backend, Provision, as documented by [Steve
Merrill](http://www.slideshare.net/smerrill/continuous-integration-and-
drupal). That said, I've found installing and configuring Aegir for this
purpose to be a bit overkill. For building and testing Drupal 6 installation
profiles, I prefer to use a few mysql and curl commands via Bash, which I'll
try to document in a follow-up blog post.

For Drupal 7, the build and testing steps via the command line can be as
simple as:
````
&gt; cd /var/lib/hudson/jobs/job_name/workspace_workspace/drupal_root

yes | drush si

yes | drush en simpletest

rm -rf scripts/tests/_.xml
````
/usr/bin/php scripts/run-tests.sh --url http://hudson.example.com --all --php
/usr/bin/php --xml scripts/tests

Walking through the steps above: First, we jump the the root directory of our
Drupal installation. (Note, this depends upon how you have your Drupal
codebase structured in Git). Then, we'll run the Drush site-install command,
using the Bash command "yes" to step through the Drush's user input prompt. In
the example above, we are simply running the default installation profile for
Drupal 7. Run "drush si --help" at the command line to understand your options
when running this command. This example also assumes that you've already
created a default Drupal database and have manually created a Drupal settings
file that contains these database credentials. (It's a much better practice to
add these credentials to the site-install command with the --db-url paramater,
but I like the simplicity of the example above when first getting started with
Hudson.)

Next, we need to run our simpletests. (Note: Simpletest is in core for Drupal
7.x, for Drupal 6.x this module needs to be added to your contrib modules.) To
do so, we first enable the simpletest module with Drush. Then, we run the
scripts/run-test.sh command to start our tests.

Running simpletest is where the subtleties of this process really come out.
There are a number of great write-ups on this:

  * http://activismlabs.org/2010/07/28/create-simple-tests-for-drupal-features/ discusses simpletest + Features 
  * http://drupal.org/node/645286 discusses running tests through the command line when building/testing them 

You'll also want to strongly consider applying [this
patch](http://drupal.org/node/602332) to scripts/run-tests.sh in Drupal core.
This adds the --xml parameter to the scripts/run-tests.sh script to output
your test results in JUnit format, which Hudson can then present as a report
for the job. Note: you'll also want to add a "tests" directory at
scripts/tests and make it writable by Hudson. If you don't run this patch,
remove the --xml parameter from the final command above.

That's pretty much all there is to running the build/test suite. Hudson will
attempt to clone the Git repository and run Drush to install Drupal and run
the simpletests. If it fails at any point in this process, it will send you an
email letting you know. If any of the simpletests fail, it will also let you
know. If you've got the JUnit export of your test results configured
correctly, you can view a nice web-based report of these results at:
http://hudson.example.com:8080/job/job_name/build_id/testReport/.

####  Viewing your Hudson-built Site in the Browser

There are likely many more elegant ways to manage Apache to allow you to view
your newly-built Drupal site in a web browser. But in the most simple case of
using Hudson to test a single build process, you can simply point Apache's
default virtual host to your Drupal installation. To do so, run the following
commands on your Hudson server:

````
&gt; $ cd /var

$ sudo rm -rf www # Remove the default Apache directory

$ sudo ln -s /var/hudson/jobs/job_name/workspace_name www # Create a symbolic
link for this directory to your Drupal codebase in the Hudson job

$ sudo chmod 755 /var/hudson #Make sure that Apache can write to this
directory. Note: This is a gross simplification. But Apache needs to be able
to read this directory.
````

Once this is done, you should be able to visit your newly-built Drupal site
at: http://hudson.example.com, and then switch to the Hudson user interface
at: http://hudson.example.com:8080.

Welcome to the wonderful world of Drupal Continuous Integration!
