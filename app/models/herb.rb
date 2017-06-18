class Herb < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :categories

  mount_uploader :thumbnail, ImageUploader

  before_save :generate_slug

  def as_json(options={})
    {
      id: self.id,
      name: self.name,
      latin_name: self.latin_name,
      tea_dosage_amount: self.tea_dosage_amount,
      tea_steep_time: self.tea_steep_time,
      tea_steep_temperature: self.tea_steep_temperature,
      tincture_dosage_amount: self.tincture_dosage_amount,
      general_description: self.general_description,
      tea_preparation: self.tea_preparation,
      tincture_preparation: self.tincture_preparation,
      categories: self.categories.ids
    }
  end

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
