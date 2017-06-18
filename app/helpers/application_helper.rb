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

  def public_path
    return image_url('/')
  end

  def admin_section
    if params[:controller] == 'admin'
      return true
    elsif params[:controller] == 'sessions'
      return true
    elsif params[:controller] == 'herbs' && (params[:action] == 'new' || params[:action] == 'edit')
      return true
    elsif params[:controller] == 'categories' && (params[:action] == 'new' || params[:action] == 'edit')
      return true
    else
      return false
    end
  end
end
