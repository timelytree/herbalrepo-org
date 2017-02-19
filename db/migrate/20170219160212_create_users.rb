class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name, :username, :user_type, :password_digest
      t.timestamps
    end
  end
end
