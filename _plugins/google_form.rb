# Title: Google Form
# Authors: Arshad http://donothackcore.com
# Description: A filter to embed Google Forms in Octopress
#
# Syntax {% google_form formkey [message] %}
#
# Examples:
# {% google_form dGVfY3MwcklDcjVrZERGYlRoZWdJQnc6MQ Thank you. I'll get back to you shortly %}
#
require 'open-uri'
require 'nokogiri'

module Jekyll

  class GoogleForm < Liquid::Tag
    @url = ''
    @formkey = ''
    @redirect = ''
    @formhtml = ''

    def initialize(tag_name, markup, tokens)
      if markup =~ /([a-zA-Z0-9_\-]*)?\s(.+)/
        @formkey = $1
        @redirect = $2

        #url of the Google Form
        @url = "https://docs.google.com/forms/d/#{@formkey}/viewform?embedded=true"

        #parse the HTML and get the form markup only
        $response = open(@url);
        doc = Nokogiri::HTML(open(@url))
        form = doc.xpath("//form").first.unlink

        @formhtml = form.to_html
      end
      super
    end

    def render(context)
      if @formhtml
        html = '<div class="google-form-wrapper">'
        html += '<script type="text/javascript">var submitted=false;</script>'
        html += '<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted) {window.location='';}"></iframe>'
        html += @formhtml
        html += '</div>'
      else
        "Error processing input, expected syntax: {% google_form formkey [redirect] %}"
      end
    end
  end
end

Liquid::Template.register_tag('google_form', Jekyll::GoogleForm)
