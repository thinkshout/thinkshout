---
layout: blog
body-class: blog-post
topic: technology
title: "Adding Webpack to a traditional Drupal theme"
homepage: true
author: sam
published: true
featured: true
short: "Learn how to bring your frontend into the future."
tags:
  - Drupal Planet
  - Drupal
  - Javascript
  - Drupal 8
  - Themes
  - Webpack
  - "Drupal APIs"
date: 2019-10-22 10:00:00
header-image: /assets/images/blog/webpack-car.jpg
header-image-alt: "A restored classic Mustang."
---
As part of a frontend modernization initiative at ThinkShout, we’ve started to move our Drupal themes from using our dated [Ruby] and [Gulp] build process to [Webpack], a popular JavaScript based asset bundler. Beyond being new, shiny, and trendy, this gives us some very real benefits: ES6 transpiling for our JS, complex loader chaining for our Sass, and Webpack’s native tree shaking and code splitting. An added bonus is that we get to move away from `ruby-sass`, which [officially reached end of life in March].

While Webpack is an amazing tool for modern frontend applications, it wasn’t really optimized for our old-school use case - just compiling Sass (without CSS-in-JS) and minifying files. As a result, wrangling the Webpack config file to line up with what our developers expected from the build was a little tricky.

Let’s dive into an example theme I’ve set up for this blog post, which mimics the setup we’re already using on a few production sites. If you want to skip ahead and check out the theme, it’s located at [https://github.com/thinkshout/webpack_example].

Before going to the Webpack-specific code, here’s an overview of the main features this setup provides:

**Sass compilation**

The Sass loader-chain (a set of functions that transform assets) takes our raw `.scss` files and compiles them into a single `.css` file. As a part of the chain [PostCSS] is run, which uses the [Autoprefixer] plugin to add vendor-specific prefixes to our CSS rules. This enables us to use new technology like CSS Grid while maintaining support for older browsers.

**JavaScript compilation**

The JS we write isn’t too complicated, and our Webpack config reflects that. We’re currently only using [Babel] to transpile ES6 syntax for older browsers, and Webpack allows us to import modules from our dependencies or our shared code. Our requirements are simple now, but if we choose to adopt a frontend framework for a project in the future we won’t have to rewrite the entire build to accomplish that.

**Developer tooling**

We’ve added [Browsersync] support to our Webpack config, which auto-reloads the page when assets are changed and allows us to share interactive sessions with our mobile devices and peers. Additionally when Webpack is run in its “development” mode, source maps are generated and the un-minified CSS/JS is output to a separate directory, which is only used on our local machines. This ensures that only the production build gets committed to Git and deployed to our production sites.

Now that that’s covered, we can start going through code.

Here are the important contents of [package.json], split up into readable chunks.

First we’ll go through the dependencies.

We use Babel to transpile JS to a syntax compatible with older browsers:

```json
  "devDependencies": {
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "babel-loader": "^8.0.5",
```

`@babel/preset-env` contains all the individual Babel transformation tools that we need, which is nice because we’re not too picky with our JS build. `babel-loader` is what adds Babel support to Webpack.

Our Sass build is a bit more complicated:

```json
    "autoprefixer": "^9.5.1",
    "css-loader": "^2.1.1",
    "mini-css-extract-plugin": "^0.6.0",
    "node-sass": "^4.12.0",
    "node-sass-glob-importer": "^5.3.1",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
```

A lot of these packages were mentioned earlier, but one worth mentioning is `node-sass-glob-importer`, which was required to support the globbing syntax (i.e. `@import “config/*”`) we were used to with our old build.

Next is Browsersync, which is not required for the Webpack build but is super useful for our developers:

```json
    "browser-sync": "^2.26.7",
    "browser-sync-webpack-plugin": "^2.2.2",
```

And finally, Webpack:

```json
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2"
  },
```

Our `package.json` file also contains a number of scripts that run Webpack with different flags during development:

```json
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "build:dev": "webpack --config webpack.config.js --mode development",
    "start": "webpack --watch",
    "start:dev": "webpack --watch --mode development"
  },
```

The scripts aren’t required (you could just run `webpack-cli`), but are a nice abstraction away from the build tools for developers that don’t want to get in the weeds.

The core of the project is the [webpack.config.js] file - we only have one for this project, although it’s very common to have one for development and production.

At the top of the file, we setup our dependencies and define our entry points:

```js
const globImporter = require("node-sass-glob-importer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = (env, argv) => {
  const isDevMode = argv.mode === "development";
  return {
    devtool: isDevMode ? 'source-map' : false,
    entry: {
      main: ["./js/main.js", "./scss/main.scss"]
    },
```


The `isDevMode` variable is used to determine if Webpack is being run in development mode. There may be a better way to check this, but looking for the passed `--mode` option works for us. For the example project we only define two entrypoints, but for a larger theme you may want to split large Drupal behaviors into different JS files, or high-priority Saas into a separate stylesheet (for inlining in a Twig template or loading synchronously).

Next are our rules for compiling Saas into CSS:

```js
   module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: false,
                localIdentName: "[local]___[hash:base64:5]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                importer: globImporter(),
                sourceMap: true,
              }
            }
          ]
        },
```

Our loader chain is fairly straightforward, and compiles Saas to CSS, passes that through PostCSS, then loads it with the standard CSS loader before outputting a minified file. We’ve disabled CSS modules to improve performance, since we aren’t using CSS-in-JS for our themes.

As mentioned before, our JS loading is very simple, and just uses Babel to transpile our modern JS to something most browsers can consume:

```js
       {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { modules: false }]]
            }
          }
        }
      ]
    },
```

Finally we define the output directory, plugins, and configuration for our build:

```js
   output: {
      path: isDevMode ? path.resolve(__dirname, "dist_dev") : path.resolve(__dirname, "dist"),
      filename: "[name].min.js",
      publicPath: "/assets/"
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new BrowserSyncPlugin({
        host: "localhost",
        port: 3000,
        proxy: "http://drupal.localhost/"
      })
    ]
  };
};
```

The plugins enable CSS minification and our local dev server, which proxies the local Drupal site.

You’ll notice that the destination directory changes depending on the mode - since we expect the `dist` directory to be committed to the repository, we want to avoid developers running a development build and pushing that to production, which is almost guaranteed to happen if your development build can be committed. `dist_dev` is ignored by Git, so there’s no-chance of making a mistake here. That said, this does require developers to run `npm run build` when they’re ready to commit if they were previously running `npm run start:dev`, which is a bit awkward. This works for now but we're looking to find a better solution.

To get `dist_dev` to show up in Drupal instead of `dist`, I wrote this hook:

```php
function webpack_example_page_attachments_alter(array &$attachments) {
  // Use the dev library if we're developing locally.
  if (in_array('webpack_example/main', $attachments['#attached']['library']) && file_exists(__DIR__ . '/dist_dev')) {
    $index = array_search('webpack_example/main', $attachments['#attached']['library']);
    $attachments['#attached']['library'][$index] = 'webpack_example/dev';
  }
}
```

which uses a separate development library definition that uses `dist_dev` files. Since `dist_dev` can never exist on production, this seems like a low-risk addition.

That’s basically everything - in the end, we now have a way to use modern build tools with a traditional Drupal theme, and hope that it leads to us writing more ambitious JavaScript for more complex interactions. If you want to check out the complete example theme, you can do so at [https://github.com/thinkshout/webpack_example].

If you want to see the starter themes we're using Webpack on, check out [thinkshout/ts_grid] and [thinkshout/thinkwp]. ts_grid in particular has some great Sass tooling for working with CSS grid, which PostCSS helps with. Credit to Amy Swan and Jaymz Rhime for making our Webpack dreams real.

P.S. If you’re a Webpack expert and have any suggestions for us, please open a PR or issue in the repo. I’m especially looking for ways we can make use of code splitting in the context of defining lots of Drupal behaviors.

[Ruby]: https://sass-lang.com/ruby-sass
[Gulp]: https://gulpjs.com/
[Webpack]: https://webpack.js.org/
[officially reached end of life in March]: https://github.com/rails/sass-rails/issues/420
[Autoprefixer]: https://github.com/postcss/autoprefixer
[PostCSS]: https://github.com/postcss/postcss
[Babel]:https://babeljs.io/
[Browsersync]: https://www.browsersync.io/
[https://github.com/thinkshout/webpack_example]: https://github.com/thinkshout/webpack_example
[package.json]: https://github.com/thinkshout/webpack_example/blob/master/package.json
[webpack.config.js]: https://github.com/thinkshout/webpack_example/blob/master/webpack.config.js
[thinkshout/ts_grid]: https://github.com/thinkshout/ts_grid
[thinkshout/thinkwp]: https://github.com/thinkshout/thinkwp
