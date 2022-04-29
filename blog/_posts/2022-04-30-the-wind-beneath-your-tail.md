---
layout: blog
body-class: blog-post
topic: 
- technology
campaign-topic: "technological innovation"
title: "The Wind Beneath Your... Tail?"
homepage: true
author: joe
published: true
featured: true
short: "Jumping into Tailwind CSS - The 2022 ThinkShout Front-end Stack, part I"
tags:
  - frontend
  - "Tailwind CSS"
  - technology
  - Drupal
  - Front-end
  - SASS
  - SMACSS
  - BEM
  - "History of the Web"
date: 2022-03-30 11:00:00
image: /assets/images/ts_redesign/blog/up-and-theming1.jpg
header-image: /assets/images/ts_redesign/blog/up-and-theming1.jpg
header-image-alt: "Lego minifigs with the TS logo"
---
## Jumping into Tailwind CSS
### The 2022 TS Front-end Stack, pt I

Back in early 2017, in an effort to more fully understand the technology stack that ThinkShout uses, the blog post creatively titled [The 2017 ThinkShout Front-End Stack](https://thinkshout.com/blog/2017/02/the-2017-thinkshout-front-end-stack/) was written. It detailed the main elements of our default starter theme: The technology stack and the CSS toolset. 

However! Time passes, tools improve, and ThinkShout is retiring our 2017 starter theme. No more Ruby/Rake/Node handlers or Sass/Bourbon/Neat CSS toolset! A more detailed look at the technology stack will be forthcoming, as will a post discussing the design-to-theming process. This post is focusing on the centerpiece of the 2022 front-end stack, [Tailwind CSS](https://tailwindcss.com/). 

## Shifting our Thinking, or How I Learned to Stop Worrying and Love Design Tokens

One of the things that ThinkShout has been trying to do over the last few years is make the handoff from design to development easier for everyone involved. Gone are the days when a designer would throw a .psd over the fence at the dev team and scamper off to the next project, leaving the devs to figure out what the 'standard' margins and padding on a project might be. 

Our design team has evolved past flat design files, having tried [Sketch](https://www.sketch.com/), [InVision](https://www.invisionapp.com/), and now [Figma](https://www.figma.com/), which gives them tools that can be used directly for client presentations and then turned over to the dev team with design tokens built in. What's a token you ask? It might surprise you to learn you've been using them for years! If you've used Less or Sass, you would usually have a set of `$vars` defined for the colors, fonts, etc. Each of those `$black: #000000;` settings are a token. 

Design Tokens are used in tools like Figma to create consistency as a design system scales - so a designer doesn't have to constantly pick out a color from a palette - they can just use the `–bg-gray-lt` token set in the style guide. Sound familiar? This is exactly what front-end developers have been doing in Sass. With Tailwind, we can just import all of those values into our starter theme using a set of `*.tokens.json` files. This becomes our style dictionary.

##Tailwind documentation: starting off by stepping on your toes.

When the introduction to your tool uses a phrase like 'complex components from a constrained set of primitive utilities'... Well. Tailwind describes itself as 'A utility-first CSS framework', but that presupposes that you know what utility-first means. 

Here's what it means: _An extendable library of basic CSS classes that only get used as needed_. 

This reverses a lot of workflows (and thinking), so Tailwind tries to explain it by giving sample code that looks terrible, and then saying, yeah, it does look terrible, but 'you have to actually try it.' While this turns out to be true, they could certainly try a _little_ harder - because it's actually easy to understand, and amazingly useful for large websites with more than one front-end developer. 

With traditional site theming, you look at a site's markup and pre-set classes, and use those to create a CSS selector, such as '`aside.chat`' or '`aside.chat .logo`'. Then you add styles to those selectors, as `property: value;` pairs. The drawback to this for a large website is that you retype a ton of CSS. Think how many things on a site have '`background-color: #EFEFEF;`' or a font-family. That's what preprocessors such as Sass were supposed to fix, but all it really did was automate the retyping, and the resulting CSS is a huge, bloated mess.

Tailwind flips that - instead of writing a ton of CSS to reflect the site's markup, you define all the basic CSS classes first, using the smallest reusable elements, and then add those classes directly to the markup. The tokens we imported from the design? Those become the utility classes. So if your chat widget has a light gray background, you would add the '`bg-gray-lt`' class to the markup. You set up the style dictionary by adding a `/tokens/src/` directory with `.json` files, such as `color.tokens.json`:

~~~ json
{
  "color": {
    "black": { "value": "#000000" },
    "white": { "value": "#FFFFFF" },
    "blue": { "value":  "#003764" },
    "green": {"value": "#80BC00" },
    "accent": {"value": "#C91DB8" },

    "gray": {
      "lt": { "value": "#EBEBEB" },
      "dk": { "value": "#BCBCBC" }
    }
  }
}
~~~

These get post-processed into reusable custom properties:

~~~ css
--color-black: #000000;
--color-white: #ffffff;
--color-blue: #003764;
--color-green: #80bc00;
--color-accent: #c91db8;
--color-gray-lt: #ebebeb;
--color-gray-dk: #bcbcbc;
~~~

If those look familiar, it's because they're using CSS variables syntax. In addition to the generated values we set up, Tailwind pre-defines a few hundred basic utility classes for things such as flexbox, padding/margins,, and so forth. You can customize these to your designs, but you don't _have_ to use them when you're starting out - and you don't get any CSS bloat from the predefined classes because Tailwind optimizes your stylesheets using [post-processing](https://www.hongkiat.com/blog/css-post-processors-tips-resources/). Run the format command (`npm run format.tokens`), it looks through your markup for classes, and only generates the CSS that's being used. (Details on how this is set up in a follow-up post!)

Pro tip: if you use any programmatically generated classes, put all of the potential classes in your Tailwind styleguide file - that way they all get added to the generated CSS.

## Use a little or use a lot. It's your CSS. 

The other thing that the docs imply is that you need to use the Tailwind-defined classes for _everything_. Nothing could be farther from the truth - Tailwind uses `.css` files and you can just write the kind of CSS in them that you've been using for years, which is perfectly reasonable in a world of CMS-generated markup. Having `article.css` and `pages.css` files that set up your individual field theming in one place is fine. The Tailwind police are not coming to revoke your vim license. 

## Less Sass, more class.

The loss of a preprocessor such as Sass or Less may seem like a setback (Variables! Nesting! Beloved mixins!) but Tailwind does a great job of removing the need for those things. The `$variables` you always set up at the start of a project get replaced with [native CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (aka, CSS variables) with postcss-generated fallbacks for older browsers. And it puts all of them in a file for your reference, based on those design token `.json` files we set up earlier: `/assets/base/css/_generated-variables.css` 

For nesting, you just add the `postcss-nested` plugin to your `.postcssrc file`. So easy! 

As for mixins, the only ones we've used in a really consistent way from project-to-project have been setting breakpoint variables with a media query mixin. Tailwind simplifies this by using a default mobile-first approach set at common device widths. These use an ultra-shorthand of `sm: md: lg: xl: 2xl:`, which allows you to easily use them inline in markup. It's really gratifying to implement a larger margin-top (Tailwind class: `mt-`) at a higher breakpoint using something as simple as:

~~~ html
<div class="mt-sm lg:mt-md">
~~~

You can also override the default breakpoints in your style dictionary using ([W3C draft CSS specification](https://drafts.csswg.org/mediaqueries-5/#custom-media-query)!) custom media queries, post-processed with browser-compatible fallback CSS:

~~~ css
@custom-media --bp-sm (min-width: 501px);
@custom-media --bp-md (min-width: 769px);
@custom-media --bp-lg (min-width: 1025px);
~~~
 
Finally, in place of Sass's [dubious @extend](https://www.google.com/search?q=reasons+not+to+use+sass+%40extend), Tailwind has [@apply](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply), which seems the same (just apply any existing class to the new class you're defining), but instead of adding tons of new selectors and bloating your CSS, it just generates the `property: value;` pairs for the new class - and again, _only_ if that class is being used. 

## The Big Payoff - why Tailwind is Awesome

All of the things I've discussed so far seem practical for a modern front-end build system. Using utility classes and keeping CSS minimal keeps code DRY. Getting to use advanced CSS without worrying about browser support is fun. Setting up a style dictionary of all of the vars/tokens using .json files is a really clean way of organizing the setup. 

But what's the big payoff? Why go to the trouble to learn all of the default classes (`pb-sm` for `padding-bottom: var(--font-size-sm)`, for example)? 

Here it is: _*You only have to learn Tailwind's namespace once*_. Just like with any site build, after you've been doing the theming for a few days, you get to know what the `gray-dk` and `gray-lt` are. But when you set up a base style dictionary, it means the next Tailwind site 
your team builds _will use the same tokens, even when the values are different_. Here's the light gray from the last five non-Tailwind sites I've worked on:

~~~ css
$light-gray
$ltgray
$lt-grey (with an alias to $lt-gray!)
$e5-light-gray
$whispy
~~~

Every time you work on these sites, you first have to find and open the `$vars.scss` (or `_01.variables.scss`, or whatever someone decided to call it that day) and see what the Sass alias for the default light gray (grey?) is, then apply that color to the background property of the class selector for the element you're theming. I get tired even thinking about it.

Tailwind helps you eliminate that for every site you build with it. No more [BEM](http://getbem.com/naming/), [SMACSS](http://smacss.com/book/categorizing), or other maddening systems to learn/implement on a per-project basis. This idea - not having to re-learn all of the basic site variables and classes for a new build - is kind of jarring at first, because it's such a huge change from how things have worked over the last decade+. But it's what makes the modest investment in learning Tailwind and setting up a base style dictionary absolutely worthwhile.

And aside from the slight barrier to entry of the introduction, the Tailwind docs are truly excellent, with the utility class naming following [very consistent](https://tailwindcss.com/docs/background-color) and [easy to learn](https://tailwindcss.com/docs/display) patterns. The example I've been using through this post is based on one of the patterns - in this case `bg-` (for background color), and then the color token `gray-lt`. 

Seriously though, `$whispy`?

<br>
<br>

---
