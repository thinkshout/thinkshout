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
    @message= ''
    @formhtml = ''

    def initialize(tag_name, markup, tokens)
      if markup =~ /([a-zA-Z0-9_\-]*)?\s(.+)/
        @formkey = $1
        @message = $2

        #url of the Google Form
        @url = "https://docs.google.com/forms/d/#{@formkey}/viewform?embedded=true"

        #parse the HTML and get the form markup only
        doc = Nokogiri::HTML(open(@url))
        form = doc.xpath("//form").first.unlink

        @formhtml = form.to_html
      end
      super
    end

    def render(context)
      if @formhtml
        html = '<div class="google-form-wrapper">'
        html += "<p class='success-msg'>#{@message}</p>"
        html += @formhtml
        html += '</div>'
      else
        "Error processing input, expected syntax: {% google_form formkey [message] %}"
      end
    end
  end
end

Liquid::Template.register_tag('google_form', Jekyll::GoogleForm)
