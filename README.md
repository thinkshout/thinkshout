# ThinkShout.com

The ThinkShout.com website, built with Jekyll, Foundation 5, SASS, and lots of love.

## Installation
1. You need Ruby. It comes with OSX or install rbenv via Homebrew.
2. Install Bundler if you don't have it, `gem install bundler`.
3. In the root of the project, run `bundle install`.

## Building
1. To build the site, run `rake build`.
2. To serve the site locally, `rake serve`.

## Branches
1. Dev: New feature development.
2. Master: New content. Features from Dev merged into master. Pushed to stage.
3. Live: Mapped to production. No commits, only merges from master.

## Content editing
Blog posts should be managed via [prose.io](http://prose.io/). Visit the website and, when prompted, authorize via GitHub. Select the [thinkshout/thinkshout](http://prose.io/#thinkshout/thinkshout) project. Prose will only make the blog post folder accessible. You can create new posts by clicking the large green "new file" button at the top of the page. Existing posts can be edited by clicking on the file in the list. When editing or creating a post, the metadata button on the right side will load with the available variables that can be filled in, including teaser, author name, and tags.

## Deploying
The site is hosted on Amazon S3 where we have 2 buckets, one for staging mapped to http://staging.thinkshout.com and one for production mapped to our apex domain, http://thinkshout.com. The S3 configuration for both these are in there respective s3_website*.yml configuration files.
1. Staging deployment: `rake stage`.
2. Production deployment: `rake publish`