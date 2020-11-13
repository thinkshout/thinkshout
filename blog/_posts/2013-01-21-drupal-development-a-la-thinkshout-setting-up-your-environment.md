---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: 'Drupal Development a la ThinkShout: setting up your environment'
created: 1358796413
permalink: blog/2013/01/gabe/drupal-development-la-thinkshout-setting-your-environment/
tags:
- Drupal Planet
- git
- drush
- Developer Tools
short: The domain of developers is naturally fraught with some of the most obtuse configuration oddities. 
author: gabe
---
I've done more than my fair share of office IT support, and I feel pretty confident making existing software behave the way I want it to. Until, that is, it's time to set up a development environment: the domain of developers is fraught with some particularly obtuse configuration oddities. To save headaches here at ThinkShout, I documented our basic setup steps, and thought it might be of use to the community. So, for anyone out there who just wants to get a Drupal development environment running with minimal headaches, I present "Drupal Dev a la ThinkShout in x Coherent Steps". I'll try to keep this updated based on feedback and changes over time. Let's call this version 0.9 as of January 2013.

These instructions are designed for the following setup:  

*  Mac OS X 10.8.x (should probably work for 10.6 or 10.7)  
*  A fresh installation (if you've gotten started and used something outside our typical toolset, I'm afraid you are likely to have some headaches.)

(Note: If you are in a hurry, you might want to start the large downloads before you begin the rest of the instructions. <a href="http://developer.apple.com/downloads">Xcode</a> is the big one here.)

## Step 0 -- System settings ##
<code>Apple Menu -> System Preferences -> Users & Groups</code>  
Make sure your account is an Administrator.

<code>Apple Menu -> System Preferences -> Security & Privacy</code>  
Check the radio button for **Anywhere** under **Allow Applications downloaded from**. 

## Step 1 -- Basic Tools ##  
### iTerm 2 ###  
First, get yourself a real Terminal program. We like <a href = "http://www.iterm2.com">iTerm 2</a>.  

### Sublime 2 ###  
Now let's get a nice text editor. For simple code edits and configuration file changes, we recommend <a href="http://www.sublimetext.com/2">sublime2</a> -- it's nag-ware, but it's a very gental nag, and if you like it it's only $59.  
(Bonus! Launch Sublime from the command line: http://www.sublimetext.com/docs/2/osx_command_line.html )

## Step 2 -- Developer Tools ##  
### Homebrew ###  
Much has been written about package managers, and to be honest I haven't read much of it. But <a href="http://mxcl.github.com/homebrew">Homebrew</a> works for me, and you'll want to use it to make these instructions easy. To install Homebrew, pop on over to iTerm, paste in this command, and follow the prompts:  
<code>ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"</code>

### Xcode ###  
Now let's head on over to Apple's website and install <a href="http://developer.apple.com/downloads">Xcode</a>. You'll have to login with an Apple ID (free registration) to download, and it's a doozy. Go make yourself a sandwich and crack a microbrew while you wait.  
Once Xcode is downloaded, run the installer. When that completes, pop back into iTerm and paste in this command:  
<code>xcodebuild -license</code>  
(I'm not a lawyer, so I'll let you make your own decision about agreeing to the license.. but if you don't, the rest of these instructions might not work out)

### git ###  
No <a href="http://en.wikipedia.org/wiki/Free_and_open_source_software">FOSS</a> development environment is complete without git. You can DIY this part by going <a href="http://help.github.com/articles/set-up-git">here</a>, or you can just use Homebrow from iTerm:  
<code>brew install git
brew update</code>

### drush ###  
While we're at it, let's install drush with Homebrew too:  
<code>brew install drush</code>  
That was easy!

## Step 3 -- Environment ##  
### MAMP ###  
Mac, Apache, MySQL, and PHP all in one package should make things easy, right? MAMP is great, but installing it is only the beginning: lots of little configuration options are hiding in the weeds. Some people like to use MAMP Pro, but I'm happy with basic MAMP. I've got the vital configuration options for you here, but you can read more details at <a href="http://drupal.org/node/66187">D.O</a>.

### General MAMP ###  
* Download <a href="http://www.mamp.info">MAMP</a>
* Unzip the download and install it into your Applications directory.
* Launch MAMP and click **Preferences**
* set **Cache** to **APC**
* Click the **Ports** tab
* Click **Set to default Apache and MySQL ports** (this should set them to 80 and 3306 respectively -- if you are running anything else on these ports, you should know it and you should already know not to do this)

### PHP ###  
* Browse to <code>/Applications/MAMP/bin/php</code> and observe the collection of PHP versions available to you. Select exactly 2 that you would like to have available regularly (I recommend the latest 5.3 and 5.4 versions), and rename each of the *other* folders by adding an underscore to the beginning of the name: "_php5.2.17" for example. 
* Restart MAMP. Click **Preferences**: you should see the two versions of PHP that you did *not* rename available for selection.
* Using Sublime, edit the php.ini files for the versions of PHP that you are going to use. You can find them here: <code>/Applications/MAMP/bin/php/php###/conf/php.ini</code> where ### matches with the PHP versions you selected.
* In each of these php.ini files, find the line that says "memory_limit" and change the value to be 256M (128M will work, if you're a big Scrooge) <code>memory_limit 256M</code>
* Now find the line that says "error_reporting" and set it to E_ALL
* Find "display_errors" and "display_startup_errors" and set them to "On"


### Drush Redux ###
Thought your Drush was all set? If only we were so lucky... Drush uses PHP, but if it points at a different PHP than MAMP is using, you'll see some wacky errors on certain Drush operations. To avoid this, we put MAMP's PHP at the beginning of our PATH variable:

*  If you don't already have a file in your home directory called ".bash_profile", create it (<code>touch ~/.bash_profile</code>). Then open it in Sublime.
*  At the bottom of your .bash_profile (which may be the top, if it's new), type <code>export PATH=</code> then insert the path to one of your MAMP PHP bin directories (we use php5.4.4 in our example), followed by <code>:$PATH</code>. Mine looks like this:
<code>/Applications/MAMP/bin/php/php5.4.4/bin:$PATH</code>
*  Save your .bash_profile and restart iTerm.
*  Type <code>which php</code> and hit enter. You should see something like this:
<code>/Applications/MAMP/bin/php/php5.4.4/bin/php</code>
That means you are using MAMP's php, and so is Drush. (if it doesn't work, type "echo $PATH" -- is your new php path the first item? Is it accurate?)

### Apache ###  
* Using Sublime, edit <code>/Applications/MAMP/conf/apache/httpd.conf</code>
* Search httpd.conf for "Virtual Hosts" and uncomment the following line so that it reads like so:  
    <code> # Virtual hosts
Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf</code>
* Enable Clean URLs: Search for "AllowOverride", and set it to "All": <code>AllowOverride = All</code>

### MySQL ###  
Put mysql into your PATH by running this command in iTerm:  
<code>ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql</code>  
(Yes, there are other ways to do this, like adding /Applications/MAMP/Library/bin/ to your PATH -- that's fine if you prefer it and won't interfere with the rest of our plans) 

For many Drupal sites, you also need to increase your MySQL max_allowed_packet size:
<code>cp /Applications/MAMP/Library/support-files/my-small.cnf /Applications/MAMP/conf/
mv /Applications/MAMP/conf/my-small.cnf /Applications/MAMP/conf/my.cnf</code>
Now open /Applications/MAMP/conf/my.cnf in Sublime and search for max_allowed_packet. Set it to something like 64M and restart MySQL using MAMP.

### Sequel Pro ###  
Sequel Pro gives us a friendly interface to interact with MySQL. <a href="http://sequelpro.com/download">Download</a> and install it.  
Now run Sequel Pro. It'll ask you for some settings. Use these:  
<code>name: local  
server: 127.0.0.1  
user: root  
pass: root  
port: 3306 (must match MAMP setup)</code>
And click **Connect**


## Step 4 -- Project Setup ## 
Now that our environment is all shined-up, we need somewhere to put our work! You can put your Drupal root just about anywhere, but I like to create a file in my home directory called **projects**, so we'll be using that as an example:  
<code>mkdir ~/projects</code>  
Our first project is a site that is going to bring about world peace, so let's call it "worldpeace":
<code>mkdir ~/projects/worldpeace</code>  
We need to tell Apache where to find our new website: let's get the path:
<code>cd ~/projects/worldpeace
pwd</code>  
Now open <code>/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf</code> in Sublime.  There should be a nice example of how to add a virtual host in the file already, but go ahead and paste this code at the bottom:  
<code><VirtualHost *:80>
    ServerAdmin email@address.com
    DocumentRoot "PATH/TO/projects/worldpeace/drupal"
    ServerName worldpeace.local
    ErrorLog "logs/worldpeace.local-error_log"
    CustomLog "logs/worldpeace.local-access_log" common
</VirtualHost></code>

You'll want to customize these lines to match your setup. Use the output from the "pwd" you just ran to get the DocumentRoot correct, and make sure to have unique names for each site's log files.
Now let's tell our computer's domain name service to look for this site on the local computer. Create a backup copy of `/etc/hosts` (`cp /etc/hosts /etc/hosts.bak`) before opening it in Sublime. Add a host line that looks like this:  
<code>127.0.0.1 worldpeace.local</code>
The name must *exactly* match the "ServerName" we just set in `httpd-vhosts.conf`.
Now go into MAMP and stop/start the Servers.

Let's give our site a Database to work in, shall we?  

* Open up Sequel Pro, and connect to MySQL if you aren't already connected.  
* Click the **Database** menu and select **Add Database**
* Give your database an easy name like "worldpeace"

All we need now is Drupal! You can go into your project folder and perform a git checkout if you are fancy, or setup a  fresh installation. Since we installed Drush already, it's pretty easy to setup a fresh site from iTerm (these instructions liberally cribbed from <a href="http://coderintherye.com/install-drupal-7-using-drush">coderintherye.com</a>). Note that these instructions assume that the most recent stable drupal is 7.18. If a newer version has been released, the "mv" command will need to be updated to match:
<code>cd ~/projects/worldpeace
drush dl drupal
mv drupal-7.18 drupal
cd drupal
drush site-install standard --db-url=mysql://root:root@localhost/worldpeace</code>
(That "--db-url" is formatted thusly: mysql://*myslqusername*:*mysqlpassword*@localhost/*databasename*)

Now point a web browser to http://worldpeace.local -- so Drupalicious!
