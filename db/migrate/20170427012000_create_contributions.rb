class CreateContributions < ActiveRecord::Migration[5.0]
  def change
    create_table :contributions do |t|
      t.string :name, :email, :herb_sci_name
      t.text :text
      t.timestamps
    end
  end
end
