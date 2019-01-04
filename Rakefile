require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

task :default => :serve

desc 'Install dependencies'
task :install do
  system 'bundle install'

  unless File.exist?('package.json')
    system 'npm init'
  end

  system 'npm install -g browser-sync'
end


desc 'Build site with Jekyll'
task :build do
  system 'bundle exec sass --update -r sass-globbing assets/sass:assets/css'
  system 'bundle exec jekyll build'
end

desc 'Watch sass files'
task :sasswatch do
  system 'bundle exec sass -r sass-globbing --watch assets/sass:assets/css'
end

desc 'Watch jekyll files'
task :jekyllwatch do
  system 'bundle exec jekyll serve --watch --baseurl="" --drafts --incremental'
end

desc 'BrowserSync for live reloading and injecting new changes'
task :browsersync do
  system 'browser-sync start --proxy "localhost:4000" --files "_site/assets/*, _site/*.md, _site/*.html, _site/*.js"'
end

# Run development tasks on separate threads
task :serve do
  threads = []
  %w{sasswatch jekyllwatch browsersync}.each do |task|
    threads << Thread.new(task) do |devtask|
      Rake::Task[devtask].invoke
    end
  end
  threads.each {|thread| thread.join}
end
