class Category < ActiveRecord::Base
  has_and_belongs_to_many :herbs

  before_save :generate_slug

  def generate_slug
    name = self.name.strip.downcase
    name.gsub! /['`]/, ""
    name.gsub! /[^0-9A-Za-z]/, '-'
    name.gsub! /-+/,"-"
    name.gsub! /\A[-\.]+|[-\.]+\z/, ""
    self.slug = name
  end
end
