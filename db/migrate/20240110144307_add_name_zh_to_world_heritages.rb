class AddNameZhToWorldHeritages < ActiveRecord::Migration[7.0]
  def change
    add_column :world_heritages, :name_zh, :string, after: :name_fr
    add_column :world_heritages, :states_name_zh, :string, after: :states_name_fr
    add_column :world_heritages, :short_description_zh, :string, after: :short_description_fr
  end
end
