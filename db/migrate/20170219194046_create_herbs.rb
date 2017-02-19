class CreateHerbs < ActiveRecord::Migration[5.0]
  def change
    create_table :herbs do |t|
      t.string :name, :latin_name, :tea_dosage_amount, :tea_steep_time, :tea_steep_temperature, :tincture_dosage_amount
      t.text :general_description, :tea_preparation, :tincture_preparation
      t.timestamps
    end
  end
end
