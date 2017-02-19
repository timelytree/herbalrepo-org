module ApplicationHelper
  def price(num)
    return number_with_precision(num, precision: 2)
  end

  def datetime_ago(datetime)
    time_ago_in_words(datetime)
  end

  def datetime_human(datetime)
    datetime.strftime("%B #{datetime.day.ordinalize}, %Y")
  end

  def display_decimal(num, pre)
    number_with_precision(num, precision: pre)
  end

  def strip_string(item)
    #strip the string & downcase
    string = item.strip.downcase
    #blow away apostrophes
    string.gsub! /['`]/, ""
    #replace all non alphanumeric, underscore or periods with underscore
    string.gsub! /[^0-9A-Za-z]/, '-'
    #convert double dash to single dash
    string.gsub! /-+/,"-"
    #strip off leading/trailing dash
    string.gsub! /\A[-\.]+|[-\.]+\z/, ""
    return string
  end

  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: true
    }

    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end
end
