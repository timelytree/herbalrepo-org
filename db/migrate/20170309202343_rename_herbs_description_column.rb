class RenameHerbsDescriptionColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :herbs, :general_description, :information
  end
end
