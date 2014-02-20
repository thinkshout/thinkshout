require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'
require 's3_website'

task :default => :server

desc 'Build site with Jekyll'
task :build do
  system 'compass compile'
  jekyll 'build'
end

desc 'Build and start local server'
task :serve do
  system 'compass compile'
  jekyll 'serve -w --baseurl=""'
end

def jekyll(opts = '')
  system 'rm -rf _site'
  system 'jekyll ' + opts
end

desc "Generate and publish site to Amazon S3"
task :publish => [:build] do
  system "s3_website --headless push"
end

desc "Generate and publish site stage.thinkshout.com"
task :stage => [:build] do
  config = YAML.load(Erubis::Eruby.new(File.read("s3_website_stage.yml")).result)
  in_headless = true
  S3Website::Uploader.run('_site', config, in_headless)
end
