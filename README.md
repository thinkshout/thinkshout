# ThinkShout.com

The ThinkShout.com website, built with Jekyll, Foundation 5, SASS, and lots of love.

## Installation & Building
[See the Wiki](https://github.com/thinkshout/thinkshout/wiki/Installation-Guide)

## Branches
1. Dev: New feature development.
2. Stage: New content. Features from Dev merged into stage. Pushed to stage.
3. Live: Mapped to production. No commits, only merges from stage.

### Development workflow
Something along the lines of the following should be used by developers working on this site.

1. Clone the repository if you don't have it.
2. Checkout the dev branch, `git checkout dev`.
3. Make sure you're current, `git pull origin dev`.
4. Optionally grab the latest content by rebasing stage from the dev branch, `git rebase stage`.'
5. Create a feature branch _off of dev_, `git checkout -b myfeature`.
6. Make magic happen
7. Merge your feature into dev, `git checkout dev && git merge myfeature`. Clean up and delete your feature branch.
8. Run `rake serve` and make sure all is well.
9. Push your exciting new feature, `git push origin dev`.
10. If it's ready for staging, merge into stage, `git checkout stage && git merge dev && git push origin stage`.
11. Optionally deploy to staging, `rake stage`.
12. To launch the new feature, `git checkout live && git merge stage`.

## Content editing
Blog posts should be managed via [prose.io](http://prose.io/). Visit the website and, when prompted, authorize via GitHub. Select the [thinkshout/thinkshout](http://prose.io/#thinkshout/thinkshout) project. Prose will only make the blog post folder accessible. You can create new posts by clicking the large green "new file" button at the top of the page (see below "New Posts section"). Existing posts can be edited by clicking on the file in the list. When editing or creating a post, the metadata button on the right side will load with the available variables that can be filled in, including teaser, author name, and tags.

### New Posts
It is important that the file name of the post uses the following format: ```blog/_posts/[date]*.md```

Where "```*```" is the title of your post (with no spaces - use dashes instead).

For example the default ```blog/_posts/2014-03-14-your-filename.md``` file name could be changed to ```blog/_posts/2014-03-14-my-new-blog-post.md```.

This is necessary because Jekyll uses this field value to generate the Markdown file that will be complied into your blog post, which must be in the ```blog/_posts``` directory and be named with a leading date.

#### To specify a post title
Head to the metadata tab using the button on the right and specify your title in the "Raw Metadata" field as follows:

```title: "My New Blog Post"```

If you do not specify a title, Jekyll will generate one for you based on the name of your file by replacing dashes with spaces and capitalizing the first letter of each word.

#### Other metadata options (and what they do)
* Short teaser - text that will display below the linked title in post teaser  (used, for example, on the /blog page)
* Author short name - makes your picture, name, and job title show up in the post teaser.
* Featured - check to get a post to show on the home page.
* Tags - ??? can't figure out how to add existing tags to new posts that don't have any - old posts have select list options, but that's because there are tags already defined in their front matter ////Alex
* Raw Metadata - any other YAML front matter you'd like to include (case sensitive).

### Home Page Posts
To get a post to show on the home page, add `featured: true` to the post's YAML front matter. This will also add a class of `featured-post` across the site for styling convenience.

### Preview your post
Click on the preview (eye) button on the right hand side. If you don't see images, etc. that you're referencing in your Markdown it's because they're not pushed to the repo (stage
branch).

## Testing, CI, and Deployment
The site is hosted on [Netlify](https://netlify.com). Netlify will build previews of all commits in any branch. Preview environments are available in the Pull Request status checks. Commits to `stage` are published to https://stage.thinkshout.com and commits to `live` are published to https://thinkshout.com.

Sites you might be interested in looking at:
- local: http://localhost:4000/
- stage: https://stage.thinkshout.com/
- live: https://thinkshout.com/

## Wonderlab sub-site

The /wonderlab sub-site is generated using the following components:

- A `wonderlab.html` landing page that lists wonderlab blogs
- A `wonderlab` collection defined in `config.yml`
- Blog posts nested under `_wonderlab/*`
- Metadata for categories in `_data/wonderlab.yml`

Most of the post fields are standard for Jekyll, with the exception of the
"index" field, which is used for manually ordering posts within a
Wonderlab category.

The code is set up to work for multiple categories, so hypothetically if you
wanted to launch a new topic, you would just add a new entry to
`_data/wonderlab.yml` (at the top of the array).
