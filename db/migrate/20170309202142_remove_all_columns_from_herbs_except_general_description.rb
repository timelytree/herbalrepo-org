class RemoveAllColumnsFromHerbsExceptGeneralDescription < ActiveRecord::Migration[5.0]
  def change
    remove_column :herbs, :tea_dosage_amount
    remove_column :herbs, :tea_steep_time
    remove_column :herbs, :tea_steep_temperature
    remove_column :herbs, :tincture_dosage_amount
    remove_column :herbs, :tea_preparation
    remove_column :herbs, :tincture_preparation
  end
end
