---
layout: blog
body-class: blog-post
topic: technology
title: Drupal 8 File-based Configuration on Pantheon
homepage: false
author: greg
published: true
featured: false
short: Greg explores some of the benefits of file-based configuration with Pantheon.
tags:
  - Drupal
  - Drupal Planet
  - Drupal 8
  - Pantheon
date: 2016-05-03 15:00:00
image: /assets/images/thinkshout-logo1.jpg
---

As Drupal 7 developers, we know how risky it is to edit production code and configuration live. However, we often let clients do it because using Features is hard. Drupal 8 has solved a lot of this headache with file-based configuration management, which allows [file-based workflows](http://www.gregboggs.com/drupal-configuration-best-practices/) that gracefully avoid editing production directly. This article will show you how to use Drupal 8 configuration management and Pantheon’s amazing workflow tools to easily give your clients the ability to make configuration changes. We’ll show you how to seamlessly integrate those changes into your normal development workflow, so that you - and your clients - will win at Drupal!

## Benefits of File-based Config

Storing active configuration directly in files has many benefits. The main benefit is that clients no longer have any reason to ever edit production configuration directly on production. Further, using file-based configuration removes the extra steps required to edit configuration in the database. These extra steps are confusing, can fail with fatal errors, and are made unnecessary by not storing configuration in the database.

## How to Enable File-based Config

The [documentation for enabling this](https://www.drupal.org/node/2416555) isn’t too difficult. But, Pantheon recommends [not storing the services.yml](https://pantheon.io/docs/services-yml/) file in version control. So, we’ll create a new services YAML file and include that along with the active configuration settings in settings.php. Before you start, export your current configuration to the sites/default/config folder and deploy that to Pantheon. Next, enable file storage by adding the following config.services.yml to your sites folder and using the following settings.php.

<script src="https://gist.github.com/Greg-Boggs/cfa837b4efddf268916ba30ac07d9a8d.js"></script>

Once deployed to Pantheon, the site will now be running in file-based configuration storage. To test this, go ahead and make a setting change in your local environment. You should see Drupal immediately write the change to site/default/config. Deploying this edit to Pantheon should make the Pantheon site immediately update to reflect the new configuration change. You just won at Drupal!

## Configuration Workflow on Pantheon

Now create a multidev for the client to use. Once the multidev is created, put the Pantheon account into SFTP mode because SFTP mode allows Drupal to edit the configuration files directory. So, now so the client can edit the configuration in Drupal and save their work with the Pantheon dashboard.

![file-config1](/assets/images/blog/file-config1.png)<span class="caption"><i class="fa fa-caret-up"></i>Changes ready to commit</span>

![file-config2](/assets/images/blog/file-config2.png)<span class="caption"><i class="fa fa-caret-up"></i>Changes committed</span>

![file-config3](/assets/images/blog/file-config3.png)<span class="caption"><i class="fa fa-caret-up"></i>Merge to development</span>

![file-config4](/assets/images/blog/file-config4.png)<span class="caption"><i class="fa fa-caret-up"></i>Configuration deployed to development</span>

When the client has completed their work, they can deploy it using the Pantheon deployment tools. You can merge in a client’s work into your own easily because the client is now using version control. Once the configuration is merged to Dev, the standard Pantheon workflow makes it easy to deploy these changes to production.

## Don’t Edit Production Directly
If production is in SFTP mode, clients can still edit production live. To prevent this, either keep production in Git mode, or use the [Config Readonly](https://www.drupal.org/project/config_readonly) module to lock production configuration. 

Drupal gives users the power to build and edit a website, and users can make dramatic changes to websites with just a few clicks in forms. With Pantheon’s tools and Drupal 8, we now have the ability to use those wonderful tools in a safe environment. The tools combined allow us to  bring clients into the workflow and manage deployments as a part of the team because Drupal 8 allows us to build robust, collaborative workflows like never before. 



