class AddSeoAltTextToHerbImage < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :seo_thumbnail_alt_text, :string
  end
end
