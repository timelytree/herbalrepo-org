class AddUserIdToHerbs < ActiveRecord::Migration[5.0]
  def change
    add_column :herbs, :user_id, :integer
  end
end
