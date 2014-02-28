# ThinkShout.com

The ThinkShout.com website, built with Jekyll, Foundation 5, SASS, and lots of love.

## Installation
1. You need Ruby. It comes with OSX or install [rbenv](https://github.com/sstephenson/rbenv#homebrew-on-mac-os-x) via Homebrew.
2. Install Bundler if you don't have it, `gem install bundler`.
3. In the root of the project, run `bundle install`.

## Building
1. To build the site, run `rake build`.
2. To serve the site locally, `rake serve`.

## Branches
1. Dev: New feature development.
2. Master: New content. Features from Dev merged into master. Pushed to stage.
3. Live: Mapped to production. No commits, only merges from master.

### Development workflow
Something along the lines of the following should be used by developers working on this site.

1. Clone the repository if you don't have it.
2. Checkout the dev branch, `git checkout dev`.
3. Make sure you're current, `git pull origin dev`.
4. Optionally grab the latest content by rebasing master from the dev branch, `git rebase master`.'
5. Create a feature branch _off of dev_, `git checkout -b myfeature`.
6. Make magic happen
7. Merge your feature into dev, `git checkout dev && git merge myfeature`. Clean up and delete your feature branch.
8. Run `rake serve` and make sure all is well.
9. Push your exciting new feature, `git push origin dev`.
10. If it's ready for staging, merge into master, `git checkout master && git merge dev && git push origin master`.
11. Optionally deploy to staging, `rake stage`.
12. To launch the new feature, `git checkout live && git merge master`. Then publish, `rake publish`.

## Content editing
Blog posts should be managed via [prose.io](http://prose.io/). Visit the website and, when prompted, authorize via GitHub. Select the [thinkshout/thinkshout](http://prose.io/#thinkshout/thinkshout) project. Prose will only make the blog post folder accessible. You can create new posts by clicking the large green "new file" button at the top of the page. Existing posts can be edited by clicking on the file in the list. When editing or creating a post, the metadata button on the right side will load with the available variables that can be filled in, including teaser, author name, and tags.

### Home Page Posts
To get a post to show on the home page, add `featured: true` to the post's YAML front matter. This will also add a class of `featured-post` across the site for styling convenience.

## Deploying
The site is hosted on Amazon S3 where we have 2 buckets, one for staging mapped to http://staging.thinkshout.com and one for production mapped to our apex domain, http://thinkshout.com. The S3 configuration for both these are in there respective s3_website*.yml configuration files. In order to deploy to either environment, you will need to have environment variables set for the S3 id and secret.

1. Staging deployment: `rake stage`.
2. Production deployment: `rake publish`
