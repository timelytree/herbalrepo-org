class Herb < ActiveRecord::Base
  has_and_belongs_to_many :categories

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
      tincture_preparation: self.tincture_preparation
    }
  end
end
