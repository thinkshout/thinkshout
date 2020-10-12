---
title: Six Scary Words and Un-hacking Drupal
layout: blog
body-class: blog-post
topic: technology
header-image:
header-image-alt:

author: joe
published: true
featured: false
short: Getting hacked is terrifying, but it doesn't have to be.
tags:
- hacking
- Drupal security
- Drupageddon
- SQL Injection
- Pantheon
- Drupal Planet
date: 2014-12-22 16:00:00
---


"I think our site’s been hacked."

These six scary words strike fear in the hearts of most developers. Even Drupal devs hear it now and then, though the security measures built into the codebase make it extremely robust. For attacks that target Drupal, exploiting known security holes are the easiest to implement on a large scale. This is why it’s important to keep your code up-to-date, and to host your Drupal sites with a company that specializes in Drupal, as well as to have a process in place so you can quickly update your sites should an exploit be discovered.

However, even the most diligent Drupal developers could be forgiven for allowing their site to fall prey to the recent (mid-October 2014) database exploit ‘[SA-CORE-2014-005 - Drupal core - SQL injection](https://www.drupal.org/SA-CORE-2014-005)’, better known as **_Drupageddon_**. Automated scripts were widely hacking sites a mere *seven hours* after the exploit was announced. There were also disturbing details after the announcement - some people were logging into their sites to find them already upgraded. It turns out that some of the hackers were upgrading the sites to keep additional hackers out! 

The good news for ThinkShout was the fact that we host most of our sites on [Pantheon](https://www.getpantheon.com/), a company that hosts ‘10s of 1000s of Drupal sites’, and thus had [advance notice](https://www.getpantheon.com/blog/what-we-are-seeing-drupal-sa-2014-005) of the security announcement. Since security is an integral part of our Support & Success practices, we were able to patch all of our client sites while Pantheon was monitoring and blocking the ongoing attacks.

About a month later though, we were contacted by a former client whom we had not heard from in a few years. They were concerned about the vulnerability of their Drupal installation, which had not been upgraded or patched since we installed it in late 2012. It was not on Pantheon, but rather a generic shared hosting site, and they were very budget-constrained. 

We were given access to a cPanel login and asked to patch, review and (if needed), repair the site, or provide a detailed repair estimate if there was going to be substantial cost. At this point, it’s worth reviewing the official [Drupal checklist](https://www.drupal.org/PSA-2014-003) for repairing a hacked site (paraphrased for brevity):

1. Take the website offline

2. Notify the server’s administrator (so they can look for backdoors)

3. Remove all the website’s files and database from the server

4. Restore all files and database from backups from before 15 October 2014

5. Update or patch the restored Drupal core code

6. Put the restored and patched/updated website back online

7. Manually redo all site changes since the date of the backup

8. Audit anything merged from the compromised website, such as custom code, configuration, files or other artifacts, to confirm they are correct and have not been tampered with.

Logging into cPanel for the affected client site, we ran into problem #1: no backups! Even if there had been a backup system in place, it would have been close, since most hosts do not keep backups older than 30 days. 

What about version control? If I could get access to a Git repo, we should be able to recreate the file system locally from a master branch, and use that to compare against the live site. After setting up SSH keys on the server and importing to a local machine, we were able to log  into the shared hosting server. Alas, no version control. Worse, the file permissions in the web root meant we couldn’t install Git. 

At this point, it felt like we were running out of options, so we took a step back and reviewed our goals for the site: 

1. Upgrade Drupal core.

2. Check if the site had, in fact, been hacked.

3. If hacked, determine the scope and remediation steps.

Working from here, we went back into cPanel and created a backup of the site and its db. We then downloaded them and installed them on a local development machine. Drupal core had not been updated, so it had not been subject to one of the more sophisticated ‘upgrade’ hacks. We updated core, verified that the site still performed as expected, then did the same for the live site.

We then ran the Drush [drupalgeddon-test](https://www.drupal.org/project/drupalgeddon) on our local machine to determine if any obvious hacks had taken place. Success! It reported that it had been hacked, due to the presence of two suspicious users. Logging into the site showed a user with no email, and a [test@test.com](mailto:test@test.com) account that had last logged in two weeks ago. We were lucky here - the site only had 10 registered users, so it was easy to spot outliers. 

At this point, we began a timestamp-based file-by-file check to ensure that no scripts had been inserted. This showed that only files in /sites/default/files had been altered. A manual review of these files showed only the usual stuff: images, videos, and PDFs. We then reviewed the site db, in particular, the menu_router table, looking for attempts to insert code or write to the server - these were also negative. Based on this, and the hosting site’s good practices regarding file permissions (the thing that kept us from installing Git), we felt confident that there was no malicious scripting inserted in the site’s codebase. 

At this point, the scope became fairly clear - the site had been ‘bot hacked’ once or twice, based on there being two suspicious users. At some point after the hack, someone, perhaps another bot, logged in using one of the fake accounts and had a look around the site, and either found nothing of value, or no easy way of compromising the site further (or some mix of both). Again, the site was lucky. With no e-commerce, minimal users, and a well-secured file system, it was a very low-value site for a hacker. 

Remediation was fairy simple - update core, remove the bad users, and advise the client to set up automated backups on their hosting account. We were able to do so in the eight hours allotted, despite the lack of backups of version control, and the client suffered no data loss or downtime. It was a very positive outcome, but the client was *very* lucky. If they had been a higher-value site with stored sensitive data, they would have been in a world of hurt. 

The lesson from all of this is to think proactively - don’t just take the best approach in preventing a hack (updated code, secure hosting), but also have systems and procedures in place (automatic backups, source control) in the event a hack does occur. By doing so, you’ll not only make a hack less likely, you’ll feel *slightly* less dread if someone utters those six scary words. 
