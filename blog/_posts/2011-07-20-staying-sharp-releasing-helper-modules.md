---
layout: blog
body-class: blog-post
topic: archive
hidden: true
header-image:
header-image-alt:

title: Staying Sharp, Releasing Helper Modules
created: 1311185469
permalink: blog/2011/07/sean/staying-sharp-releasing-helper-modules/
tags:
- Drupal
- Drupal Planet
- modules

short: The Footer Message Module as a Case Study
author: sean
---
<h2>The Footer Message Module as a Case Study</h2><p>In the world of Drupal rockstar engineers, I'm, well, a groupie wearing a worn-out DrupalCon t-shirt. I consider myself a darn good Drupal technologist. I can build sites like nobody's business, using Features-based development practices to codify configuration management, as well as installation profiles for test-driven development. I contribute small bug fix patches to the community. And when the stars align, I occasionally release a Drupal module or two that helps with small tasks that make site building more enjoyable.</p><!-- break --><p>Generally speaking, I leave the heavy lifting and hardcore module development to others on the ThinkShout team. That said, here at ThinkShout we believe in an engineering-driven culture. We support everyone on our team, including account management types like myself, in writing and releasing code to stay sharp. By keeping our heads in code at least a day or two a week, our less-technical, more client-facing staff tend to be better Drupal problem solvers. They can anticipate development issues that might affect project budgets, and they can come up with more innovative solutions to meet client needs.</p><p>A lot of Drupal engineering firms seem to be taking the opposite approach when it comes to where staff put their time. A lot of shops value placing a firm line between those who write code and those who manage projects. The idea there is that there's more objectivity when doing project management or account management when some project team members aren't involved in the day-to-day. From our perspective, that's a poor choice. Our team is motivated by having their hands, and hearts (yes, we are that sappy) deeply immersed in drupal code and best practices.</p><p>Lately I've been working on some Drupal 6.x to Drupal 7.x site upgrades. As a result, I've been dealing with a lot of niggly little data migrations due to changes to the underlying ways that Drupal stores data. One small example of this is the fact that in Drupal 7.x, there's no longer a dedicated "Site &nbsp;Footer" value that's editable from the "Site Information" admin screen. I guess the idea is that in Drupal 7.x, site footers are best stored in custom blocks, or that providing a site footer field should be handled in the Drupal contrib space.</p><p>Unfortunately, this makes the upgrade path to Drupal 7.x just a bit more involved, as many D6 themes use the site footer variable. Also, a lot of our existing Drupal 6.x clients are used to managing their site footers from the Site Information screen. So, as an opportunity to better get to know changes to Drupal 7.x's core API, as well as an opportunity to streamline the upgrade path on some of our projects, I decided to release the&nbsp;<a href="http://drupal.org/project/footer_message" target="_blank">Footer Message</a> module for D7.</p><p>The Footer Message module is not likely to ever see a ton of usage (since it's release 3 months ago it has only around 100 installations). But that's okay because, again, it scratched my own itch, taught me a ton about changes in D7, inspired me to keep on top of our craft, and helped me better understand the complexities (and therefore costs) in Drupal site upgrades.</p><h2>The Anatomy of the Drupal 7.x Footer Message Module</h2><p>The Footer Message module took about a half a day to build and release and taught me a number of things about Drupal 7.x. First, it taught me about how Drupal 7.x has split out&nbsp;<a href="http://api.drupal.org/api/drupal/developer--hooks--core.php/function/hook_block/6" target="_blank">hook_block()</a> into the easier to maintain implementations of&nbsp;<a href="http://api.drupal.org/api/drupal/modules--block--block.api.php/function/hook_block_info/7" target="_blank">hook_block_info()</a>, <a href="http://api.drupal.org/api/drupal/modules--block--block.api.php/function/hook_block_view/7" target="_blank">hook_block_view()</a>, etc.</p><p>Second, this module introduced me to <a href="http://api.drupal.org/api/drupal/modules--system--theme.api.php/function/hook_preprocess_HOOK/7" target="_blank">hook_preprocess_HOOK()</a>. As the API documentation states, this hook allows modules to preprocess theme variables for a specific theme hook. For D6 to D7 site upgrades, this is a nifty little function call - as it allowed me to reintroduce the $site_footer variable to my themes from a module.</p><p>What I most enjoyed learning in this process was how to use the new <a href="http://drupal.org/update/modules/6/7#text_format" target="_blank">'text_format' #type to create "text format-enabled" form elements</a>. Take a look at:</p>
<pre><code>
/**
 * Implements hook_form_FORM_ID_alter()
 */
function footer_message_form_system_site_information_settings_alter(&amp;$form, &amp;$form_state, $form_id) {	
  // Add a footer text area to the "Site Information" admin page.
  $site_footer = variable_get('footer_message_msg',
    array('value' =&gt; 'This is default site footer content.'));
  $form['footer_message_msg'] = array(
    '#type' =&gt; 'text_format',
    '#base_type' =&gt; 'textarea',
    '#title' =&gt; t('Site Footer message'),
    '#default_value' =&gt; $site_footer['value'],
    '#format' =&gt; isset($site_footer['format']) ? $site_footer['format'] : NULL, 
    '#required' =&gt; TRUE,
  );
}
</code></pre>
<p>Setting the #type to 'text_format' allows a site administrator to choose the input format for the site footer text area - which is pretty handy if you want to provide WYSIWYG editing of the site footer.</p><p><strong>Wrapping up,</strong> is the Footer Message module the most cutting edge work done in Drupal to date? <em>Heck no.</em> Is it the best way to manage site footer text on a D7 site? <em>Who knows.</em> But was it worth half a day of development to learn more about Drupal and release a small tool to the community? <strong>For sure!</strong></p>
