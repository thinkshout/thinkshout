require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

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

desc "Generate and publish site to gh-pages"
task :stage => [:build] do
  Dir.mktmpdir do |tmp|
    system "mv _site/* #{tmp}"
    system "git checkout gh-pages"
    system "rm -rf *"
    system "mv #{tmp}/* ."
    message = "Site updated at #{Time.now.utc}"
    system "git add -A"
    system "git commit -m #{message.shellescape}"
    system "git push origin gh-pages --force"
    system "git checkout master"
    system "echo 'GitHub pages deployment completed.'"
  end
end

desc "Generate and publish site to Amazon S3"
task :publish => [:build] do
  system "s3_website push"
end
