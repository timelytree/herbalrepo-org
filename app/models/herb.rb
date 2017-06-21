class Herb < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :categories

  mount_uploader :thumbnail, ImageUploader

  before_save :generate_slug

  # before_validation :check_slug

  validates :name, presence: true
  validates :latin_name, presence: true
  # validate :check_slug

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
    name = self.name.strip.downcase
    name.gsub! /['`]/, ""
    name.gsub! /[^0-9A-Za-z]/, '-'
    name.gsub! /-+/,"-"
    name.gsub! /\A[-\.]+|[-\.]+\z/, ""
    self.slug = name
  end

  def check_slug
    # binding.pry
    if self.slug == generate_slug
      errors.add(:slug, 'already has an active term')
    end
  end
end
