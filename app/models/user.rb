class User < ActiveRecord::Base
  has_secure_password validations: false

  has_many :herbs

  before_save :generate_slug

  def generate_slug
    username = self.username.strip.downcase
    username.gsub! /['`]/, ""
    username.gsub! /[^0-9A-Za-z]/, '-'
    username.gsub! /-+/,"-"
    username.gsub! /\A[-\.]+|[-\.]+\z/, ""
    self.slug = username
  end
end
