class AddThumbnailColumnToHerbs < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :thumbnail, :string
  end
end
