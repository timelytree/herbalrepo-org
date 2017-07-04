class AddSeoTitleAndDescriptionColumnsToHerbs < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :seo_title, :string
    add_column :herbs, :seo_description, :string
  end
end
