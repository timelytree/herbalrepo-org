class AddDraftStatusToHerbs < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :draft_status, :string
  end
end
