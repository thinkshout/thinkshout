# module Jekyll
#   class TagIndex < Page
#     def initialize(site, base, dir, tag)
#       @site = site
#       @base = base
#       @dir = dir
#       @name = 'index.html'
#       self.process(@name)
#       self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
#       self.data['tag'] = tag
#       self.data['feed_url'] = dir
#       tag_title_prefix = site.config['tag_title_prefix'] || 'Posts Tagged &ldquo;'
#       tag_title_suffix = site.config['tag_title_suffix'] || '&rdquo;'
#       self.data['title'] = "#{tag_title_prefix}#{tag}#{tag_title_suffix}"
#     end
#   end

#   class TagFeed < Page
#     def initialize(site, base, tag_dir, tag)
#       @site = site
#       @base = base
#       @dir  = tag_dir
#       @name = 'rss.xml'
#       self.process(@name)
#       # Read the YAML data from the layout page.
#       self.read_yaml(File.join(base, '_layouts'), 'tag_feed.xml')
#       self.data['tag']    = tag
#       # Set the title for this page.
#       tag_title_prefix = site.config['tag_title_prefix'] || 'Posts Tagged &ldquo;'
#       tag_title_suffix = site.config['tag_title_suffix'] || '&rdquo;'
#       self.data['title'] = "#{tag_title_prefix}#{tag}#{tag_title_suffix}"
#       # Set the meta-description for this page.

#       # Set the correct feed URL.
#       self.data['feed_url'] = "#{tag_dir}/#{name}"
#     end
#   end

#   class TagGenerator < Generator
#     safe true
#     def generate(site)
#       if site.layouts.key? 'tag_index'
#         dir = site.config['tag_dir'] || 'tag'
#         site.tags.keys.each do |tag|
#           path = File.join(dir, friendly_tag(tag))
#           write_tag_index(site, path, tag)
#           write_tag_feed(site, path, tag)
#         end
#       end
#     end

#     def write_tag_index(site, dir, tag)
#       index = TagIndex.new(site, site.source, dir, tag)
#       index.render(site.layouts, site.site_payload)
#       index.write(site.dest)
#       site.pages << index
#     end

#     def write_tag_feed(site, dir, tag)
#       feed = TagFeed.new(site, site.source, dir, tag)
#       feed.render(site.layouts, site.site_payload)
#       feed.write(site.dest)
#       site.pages << feed
#     end

#   end

#   # Adds some extra filters used during the category creation process.
#   module TagLinks

#     # Outputs a list of categories as comma-separated <a> links. This is used
#     # to output the category list for each post on a category page.
#     #
#     #  +categories+ is the list of categories to format.
#     #
#     # Returns string
#     #
#     def tag_links(tags)
#       config = @context.registers[:site].config
#       dir = '/' + config['baseurl'] + (config['tag_dir'] || 'tag') + '/'
#       tags = tags.sort!.map do |item|
#         "<a class='tag' rel='tag category' title='View all posts tagged #{item}.' href='#{dir}#{friendly_tag(item)}/'>#{item}</a>"
#       end

#       tag_separator = config['tag_separator'] || ' '
#       tags.join(tag_separator)
#     end
#   end

# end

# Liquid::Template.register_filter(Jekyll::TagLinks)

# # Helper to consistently format tags for use in paths.
# def friendly_tag(tag)
#   return tag.downcase.gsub(' ', '-')
# end
