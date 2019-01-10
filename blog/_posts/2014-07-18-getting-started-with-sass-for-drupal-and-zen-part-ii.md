---
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

title: "Getting Started with SASS for Drupal and Zen, Part II"
published: true
featured: false
author: eric
date: 2014-07-18 13:00:00
short: Dig deeper into SASS with part two of this series.
tags:
- Drupal Planet
- SASS
- Drupal
- Theming
---

In [part one of "Getting Started with SASS for Drupal and Zen,"](/blog/2013/10/candice/getting-started-sass-drupal-and-zen/) we went over getting your environment set up to work with SASS.

If you followed the instructions in part one, you should have SASS/Compass, Zen, and your sub-theme installed. Your theme will be installed in `sites/all/YOUR THEME NAME`.

## Test the Install


Let's test to see if SASS is installed and compiling. Use your toolkit to compile your SASS directory or run `compass watch` from the command line in your theme directory. You should see the following output.

~~~
>>> Compass is watching for changes. Press Ctrl-C to Stop
~~~

To see more Compass commands, you can run `Compass -h`.

Open your Drupal site in your browser. Now that we are polling for changes with Compass, let's add the following to `style.scss` to see our changes being applied. After you save your change, refresh your page and you should see the difference.

~~~css
body {
  background: #000;
  color: #fff;
}
~~~

Compass will also output the overwritten files in your console if you are using command line to run it. It's okay to delete the CSS you added, so things will appear like the default Zen theme.

## SASS Primer
If you haven't used SASS, prepare to be hooked on it. Some advantages of SASS include DRY (Don't Repeat Yourself), CSS, function (mixins) for repetitive and lengthy blocks of CSS, and the ability to extend common styles.

### Variables
Variables in SASS start with a '$'. Use variables to define values you will use throughout your stylesheets. For example, let's define our color palette in `_init.scss`. There is a commented section for colors. You can drop them in there. I'm going to grab this [zen 2](http://www.colourlovers.com/palette/56833/zen.) palette from Kuler.

~~~scss
$sand:      #b0ae9e;
$brown:     #424345;
$white:     #fafeff;
$seagreen:  #9dbec7;
$wetsand:   #b0a092;
$red:       #ff0000;
$gray:      #a1a1a1;
~~~
Now these colors can be used everywhere in our stylesheets without having to write the hex value each time.

### Nesting
In typical CSS fashion, we would write a style like this:

~~~css
a {
	color: #9dbec7;
	text-decoration: none;
}

a:hover {
  color: #424345;
  -webkit-transition:   color 0.5 ease-out 0.5s;
  -moz-transition:      color 0.5 ease-out 0.5s;
  -o-transition:        color 0.5 ease-out 0.5;
  transition:           color 0.5 ease-out 0.5s;
}
~~~

With SASS, we can nest the style like this:

~~~scss
a {
  color: $seagreen;
  text-decoration: none;

  &:hover {
  	color: $brown;
  	-webkit-transition: color 0.5s ease-out 0.5s;
  	-moz-transition:    color 0.5s ease-out 0.5s;
  	-o-transition:      color 0.5s ease-out 0.5;
  	transition:         color 0.5s ease-out 0.5s;
  }
}
~~~

The ampersand represents the outer anchor selector. Also, notice how we are relying on the variables we defined for the colors instead of using hex values.

### Mixins and Extends

#### Mixins
Let's clean up that transition by writing a mixin for it.

~~~scss
@mixin transition($property, $duration, $easing) {
  -webkit-transition:	$color $duration $easing;
     -moz-transition:	$color $duration $easing;
       -o-transition:	$color $duration $easing;
          transition:	$color $duration $easing;
}
~~~

Now we can rewrite the anchor style and include the transition mixin.

~~~scss
a {
  color: $seagreen;
  text-decoration: none;

  &:hover {
  	color: $brown;
  	@include transition(color, 0.5s, ease-out, 0.5s);
  }
}
~~~

Keep in mind that Compass already provides some great [cross-browser mixins](http://compass-style.org/reference/compass/css3/) for CSS3. Style transition is one of them.

#### Extends
SASS lets you inherit common styles. A practical example is styling buttons. Buttons might have common styling, but differ in color or size.

~~~scss
// This is a SASS comment
/* This is also a comment */

// Our default button
.button {
  background: $seagreen;
  padding: 1em;
  border: 1px solid $seagreen;
}

.primary {
  @extend .button;
  padding: 1.5em 2em;
}

.warn {
  @extend .button;
  background: $red;
}

.disabled {
  @extend .button;
  background: $gray;
}

~~~

So why didn't we just use nesting? Extending keeps you from having to write multiple class names on html elements instead of writing it like the following:

~~~html
<a class="button primary" href="http://thinkshout.com">ThinkShout</a>
~~~

We can use one class because 'primary' will include all the same styles as 'button.'

~~~html
<a class="primary" href="http://thinkshout.com">ThinkShout</a>
~~~

## Using SASS in Your Theme
The stylesheets in your Zen sub-theme are organized according to the principles of [SMACSS](http://smacss.com). You'll notice the `style.scss` file doesn't actually contain any styles, but only imports. The `_init.scss` file contains additional imports such as Zen Grids and Compass utilities, mixins and helpers. If you look in `layouts/responsive.scss`, you'll see the Zen theme includes a mobile-first responsive layout by default.

Let's add some sass of our own. Add a file called `_main-nav.scss` to the `components` directory. In that file, add the following SASS. It's similar to the style we used in our SASS primer.

~~~scss
#navigation {
  background: $sand;

  .links  {
    a, a:visited {
      color: $white;
      text-decoration: none;

      &:hover {
        color: $brown;
        @include transition(color, 0.5s, ease-out, 0.5s);
      }
    }
  }
}
~~~

In order to get this change to take effect, you need to import it into your `style.scss`. Add an import statement for `_main-nav.scss` in the components section.


~~~scss
/* Component (SMACSS module) rules */
@import "components/misc";
@import "components/main-nav"; // Add this import statement
~~~

You may be wondering why you don't need the underscore in front of the file when importing. The underscore tells SASS that the file is a partial. The partial won't be compiled into its own file. It will be included in the `style.css` when compiled. If you don't have Compass running, go ahead and run `compass watch` in your theme directory or use your toolkit to compile. You should see your navigation style applied to your Drupal site when you refresh.

As you progress in your SASS development, I encourage you to use the [SASS Globbing](https://github.com/chriseppstein/sass-globbing) gem. It makes importing a breeze.

Now that you have used SASS in your theme and have the basics down, be sure to check out the [SASS](http://sass-lang.com/documentation) and [Zen Grids](http://zengrids.com) documentation to be even more productive in your theme development. Get the code for this article on [Github](https://github.com/thinkshout/Drupal-Sass-Zen-Blog).
