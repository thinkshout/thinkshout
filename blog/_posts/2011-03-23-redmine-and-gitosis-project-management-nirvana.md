---
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

title: Redmine and Gitosis, project management nirvana?
created: 1300921909
permalink: blog/2011/03/lev/redmine-and-gitosis-project-management-nirvana/
tags:
- project management
- Drupal Planet
- tools

short: Tools to manage features, bugs, tasks, and communicate with your clients
author: lev
---
<p>If, like us, you find yourself running several development projects, you likely use some sort of a ticketing system to manage features, bugs, tasks, etc. and communicate with your clients. There are many, many options, ranging from proprietary commercial offerings like <a href="http://www.fogcreek.com/fogbugz">FogBugz</a>  and <a href="http://www.atlassian.com/software/jira">Jira</a>, SaSS offerings like <a href="http://unfuddle.com">Unfuddle</a> and <a href="http://lighthouseapp.com">Lighthouse</a>, and open source tools such as <a href="http://track.org">Track</a>, <a href="http://www.bugzilla.org">Bugzilla</a>, <a href="http://redmine.org">Redmine</a>, and Drupal&#8217;s own <a href="http://drupal.org/project/project">project module</a>. Wikipedia has a great <a href="http://en.wikipedia.org/wiki/Comparison_of_issue-tracking_systems">comparison of issue tracking systems</a>. After much careful consideration, ThinkShout settled on <a href="http:;//redmine.org">Redmine</a> due to it&#8217;s excellent interface, multi-project support, repository integration, rich feature set, and large install base.</p>
<!--break-->
<h2>Redmine with GitHub</h2>
<p>But this post isn&#8217;t focused on Redmine, so I won&#8217;t go into too much detail about it. I will add that I&#8217;ve been using Redmine as my primary project management and communications tool for both clients and developers for about 2 years and am very happy with it. It doesn&#8217;t do everything perfectly, but makes it for by placing all the tools you need under one roof. Also worth watching is <a href="http://chiliproject.org">Chili Project</a>, a recent fork of Redmine by some very prominent members of that community.</p>
<p>Redmine also does a great job associating commits with tickets. Using keywords in your commit message, you can close, resolve, or simply associate the commit with a ticket.<br />
<img src="/sites/default/files/redmine_blog_revs.jpg" alt="" /></p>
<p>Enough said on that front. We also obviously need to host remote source control repositories, in our case git. GitHub is amazing in so many ways, and <a href="https://github.com/organizations/thinkshout">ThinkShout takes full advantage of it</a>, but aside from the $100 monthly cost, which is not a huge deal, the workflow for setting up a project between Redmine and GitHub is less than ideal.</p>
<ol>
	<li>Create the project in Redmine and add members to their respective roles.</li>
	<li>Create the remote repository on GitHub and again assign members to their respective roles. Note that all stakeholders need to have accounts on <em>both</em> Redmine and GitHub.</li>
	<li>Assuming you already have the Redmine GitHub hook plugin installed, in your repository settings, add a post commit hook to ping your Redmine instance.</li>
	<li><span class="caps">SSH</span> into your Redmine server and clone your GitHub repository. Note that the user running Redmine, E.g., www-data will need read/write access to the repository directory.</li>
	<li>Under your project settings in Redmine, enable the repository module and enter the path to the repository you cloned above.</li>
</ol>
<p>See what I mean, quite a <span class="caps">PITA</span>! Now imagine the team working on the project changes; you have to reassign roles on both Redmine and Github.</p>
<h2>Redmine with Gitosis on the same server</h2>
<p>Wouldn&#8217;t it be great if we could simply create a project on Redmine, assign users to the developer role, and have the system automatically create the repository and manage access control? I thought so, and spent several days banging my head against the wall back in January when first setting up some of ThinkShout&#8217;s new infrastructure. It seemed simple enough. There are two key components. The first is <a href="http://en.wikibooks.org/wiki/Git/Gitosis">Gitosis</a>, which is essentially an access control layer written in Python that sits on top of git. On it&#8217;s own, it lets designated users manage access to git repositories through a master admin repository. That admin repository contains a conifguration file with projects, users, and their public keys. The other is the <a href="http://www.redmine.org/plugins/redmine_gitosis">Gitosis Redmine plugin</a> which manages the gitosis admin repository based on a projects users and roles. It also provides an interface in Redmine where users can upload their public keys, similar to GitHub.</p>
<p>Granted my Ruby and SysAdmin chops are <em>very</em> weak, so I&#8217;m not even sure what the exact problems were, but I do know I wasn't alone in my troubles getting this setup working properly. Also,</p>
<ul>
	<li>The version of Gitosis Redmine plugin listed on the plugins page was woefully out of date and the network graph on GitHub wasn&#8217;t clear which path to follow.</li>
	<li>The gist of the complication revolves around permissions. You have the Gitosis user which owns the repository directory, the user used to initialize Gitosis and has access to the Gitosis admin repository, and the Redmine user which runs the entire process.</li>
</ul>
<p>Call me a sissy, but I gave up and we stuck with good old GitHub.</p>
<h2>Solution at last!</h2>
<p>A combination of things spurred me to give this another shot. There was an intriguing thread on Twitter about Gitosis/Redmine being the best solution for remote repository hosting, I came across an <a href="http://github.com/xdissent/redmine_gitosis">updated version of the Gitosis Redmine plugin</a>, and, most importantly, I found an <a href="http://dev.remarkablewit.com/redmine/projects/dev-server/wiki">excellent guide which walks you through the process</a> (thanks Greg Thornton). I used this guide just for the Gitosis / Redmine integration, as we already had Redmine running. There are lots of walk throughs dedicated to <a href="http://www.redmine.org/projects/redmine/wiki/HowTos">installing Redmine</a> on its own. Turns out the key is using access control lists to determine which user has access to all the key files and directories, rather than trying to manage file and directory ownership without ACLs. Probably also fair to mention we were one public repository away from the $100/month plan on GitHub.</p>
<p>All said and done, we&#8217;re thrilled with our current setup which has greatly simplified our project workflow, condensing the 5 steps mentioned above into just one. Couldn&#8217;t recommend it more.</p>
