module Jekyll

  class TeamPage < Page
    def initialize(site, base, dir, person)
      @site = site
      @base = base
      @dir = dir
      @name = "#{person['name']}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'teammember.html')
      self.data['url'] = "#{dir}/#{person['name']}.html"

      self.data['title'] = "#{person['first_name']}#{person['last_name']}"
    end
  end

  class TeamGenerator < Jekyll::Generator
    safe true

    def generate(site)

      dir = site.config['team_dir'] || 'team'
      site.data['team'].each do |person|
        site.pages << TeamPage.new(site, site.source, dir, person)
      end

    end

  end
end