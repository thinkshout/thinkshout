task :default => :server

desc 'Build site with Jekyll'
task :build do
  jekyll 'build'
end

desc 'Build and start local server'
task :server do
  jekyll 'serve -w --baseurl=""'
end

desc 'Build and deploy'
task :deploy => :build do
  system 'rsync -rtzh --delete _site/ walkah.net:/var/www/walkah.net/'
end

def jekyll(opts = '')
  system 'rm -rf _site'
  system 'jekyll ' + opts
end

desc "Generate and publish site to gh-pages"
task :publish => [:generate] do
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
    system "GitHub pages deployment completed."
  end
end
