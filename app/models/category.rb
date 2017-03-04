class Category < ActiveRecord::Base
  has_and_belongs_to_many :herbs

  before_save :generate_slug

  def generate_slug
    #strip the string & downcase
    name = self.name.strip.downcase
    #blow away apostrophes
    name.gsub! /['`]/, ""
    # @ --> at, and & --> and
      # title.gsub! /\s*@\s*/, " at "
      # title.gsub! /\s*&\s*/, " and "
    #replace all non alphanumeric, underscore or periods with underscore
    name.gsub! /[^0-9A-Za-z]/, '-'
    #convert double dash to single dash
    name.gsub! /-+/,"-"
    #strip off leading/trailing dash
    name.gsub! /\A[-\.]+|[-\.]+\z/, ""
    self.slug = name
  end
end
