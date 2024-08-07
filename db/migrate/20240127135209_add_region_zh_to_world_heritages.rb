class AddRegionZhToWorldHeritages < ActiveRecord::Migration[7.0]
  def change
    add_column :world_heritages, :region_zh, :string
  end
end
