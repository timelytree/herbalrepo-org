class CreateCategoriesHerbs < ActiveRecord::Migration[5.0]
  def change
    create_table :categories_herbs do |t|
      t.integer :category_id, :herb_id
      t.timestamps
    end
  end
end
