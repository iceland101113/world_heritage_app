class AddWorldHeritage < ActiveRecord::Migration[7.0]
  def change
    create_table :world_heritages do |t|
      t.integer :unique_number
      t.string :name_en
      t.string :name_fr
      t.string :short_description_en
      t.string :short_description_fr
      t.string :justification_en
      t.string :justification_fr
      t.integer :date_inscribed
      t.integer :secondary_dates
      t.integer :danger
      t.decimal :longitude, precision: 10, scale: 7
      t.decimal :latitude, precision: 10, scale: 7
      t.decimal :area_hectares, precision: 12, scale: 2
      t.string :criteria_txt
      t.string :category
      t.string :states_name_en
      t.string :states_name_fr
      t.string :region_en
      t.string :region_fr
      
      t.timestamps
    end
  end
end
