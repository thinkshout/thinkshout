---
layout: blog
body-class: blog-post
topic: technology
title: The WYSIWYG is a Lie
homepage: false
author: joe
published: true
featured: false
short: Drupal's CKEditor does not show the styles from the default theme. Let's fix that and make WYSIWYG true again.
tags:
  - Drupal Planet
  - Drupal
  - Front-end
  - CSS
  - CKEditor
  - WYSIWYG
date: 2017-08-29 08:20:00
image: https://thinkshout.com/assets/images/marquee/expertise.jpg
---

If you've ever implemented a WYSIWYG editor in Drupal, one thing that becomes apparent quickly is that the term (What You See Is What You Get) is a complete lie. None of the default theme styles appear in the editor, because the editor shows up in the admin theme. This obviously diminishes its value, and makes custom element styles useless. The good news is that it's fairly simple to fix - once you know how.

Drupal 8's default WYSIWYG is CKEditor, and it's included as a core module with [its own API](https://www.drupal.org/docs/8/api/ckeditor-api/overview). This is great, because they also added a way to get that default theme front-end code into the admin theme CKEditor. The description of how to manage this leaves a bit to be desired, as all they mention is 'specifying a `ckeditor_stylesheets` key in the `*.info.yml` file'.

Let's start from the beginning. Say you've been working on a D8 site and the intro has an H2, some text, and a call to action button:

![intro1.png](/assets/images/blog/intro1.png){:.center}

That's great! What does CKEditor show us?

![intro2.png](/assets/images/blog/intro2.png){:.center}

Oh. What I see is certainly *not* what I get. Let's start by showing the basic styles in CKEditor. Go to your current default theme (ours is in `/web/themes/custom/`) and find your `THEMENAME.info.yml`. Open it in your favorite editor and you'll see something like this:

~~~yaml
name: My Theme Name
type: theme
description: A base theme for My Site
package: Other
core: 8.x

base theme: classy

regions, etc...
~~~

Now add the `ckeditor_stylesheets:` key and the target file right below the `core: 8.x` line, like so:

~~~yaml
...
package: Other
core: 8.x
ckeditor_stylesheets:
  - css/ckeditor.css
~~~

If there's something already under `core: 8.x` just put the CKEditor lines below it.

Next you have to actually add a file there! Go to your theme's `/css/` directory and add an empty `ckeditor.css` file next to the site's `style.css`.

Now, you *could* just tell CKEditor to load all of the site CSS - but that would be overkill for the poor little iframe. It's better to just find the vanilla CSS styles you need in your `style.css` file and copy them over. In our case it's only about 160 lines of CSS - the default styles for the site, plus some rendered Sass mixins for the button. How does our WYSIWYG look now?

![intro3.png](/assets/images/blog/intro3.png){:.center}

Bazinga! What a difference.

Hmm, but our button is missing its styles because we haven't configured the CKEditor for that yet.

Go into the Drupal configs to set that up at `/admin/config/content/formats` and click 'configure' for the CKEditor text format you want (Full HTML, etc).

If you don't have 'Styles' in the 'Active Toolbar', add it by dragging it in. It looks good next to 'Format', and has a similar behavior:

![ckedit1.png](/assets/images/blog/ckedit1.png){:.center}

Then scroll down to the 'Styles dropdown' tab and add the appropriate markup and class for the button.

![ckedit2.png](/assets/images/blog/ckedit2.png){:.center}

In our case we want to turn an anchor link (`a`) into a button by adding a `.button` class, so we use `a.button`. The text after the pipe (`|`) is what will appear in the 'Styles' dropdown.

Finally, make sure you've added that markup to the 'allowed HTML tags' section if you're adding it to a restricted markup configuration:

![ckedit6.png](/assets/images/blog/ckedit6.png){:.center}

_Important Note:_ style options won't show up in the Styles dropdown unless you have clicked/selected an eligible piece of markup - in our case the `a` tag - in the CKEditor window. So in our example, we'd have to click on 'read more' before we click on the Styles dropdown.

![ckedit5.gif](/assets/images/blog/ckedit5.gif){:.center}

As long as you have `a.button` styles in `ckeditor.css`, it should work right away. (Well, after a cache clear. It's Drupal.)

And that's it! From here you can continue to add styles to `ckeditor.css`, and to the Styles dropdown in the Drupal 'Text formats and editors' admin. 

The WYSIWYG is no longer a lie!

