# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_01_27_135209) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "world_heritages", force: :cascade do |t|
    t.integer "unique_number"
    t.string "name_en"
    t.string "name_fr"
    t.string "short_description_en"
    t.string "short_description_fr"
    t.string "justification_en"
    t.string "justification_fr"
    t.integer "date_inscribed"
    t.integer "secondary_dates"
    t.integer "danger"
    t.decimal "longitude", precision: 10, scale: 7
    t.decimal "latitude", precision: 10, scale: 7
    t.decimal "area_hectares", precision: 12, scale: 2
    t.string "criteria_txt"
    t.string "category"
    t.string "states_name_en"
    t.string "states_name_fr"
    t.string "region_en"
    t.string "region_fr"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name_zh"
    t.string "states_name_zh"
    t.string "short_description_zh"
    t.string "region_zh"
  end

end
