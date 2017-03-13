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
    string = item.strip.downcase
    string.gsub! /['`]/, ""
    string.gsub! /[^0-9A-Za-z]/, '-'
    string.gsub! /-+/,"-"
    string.gsub! /\A[-\.]+|[-\.]+\z/, ""
    return string
  end
end
