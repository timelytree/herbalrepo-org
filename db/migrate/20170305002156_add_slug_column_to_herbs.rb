class AddSlugColumnToHerbs < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :slug, :string
  end
end
