require 'csv'

namespace :import_word_heritages do
  desc 'Import heritages from csv file'
  task :run => :environment do
    path = Pathname.new('world_Heritage_List.csv').expand_path
    sub_string = {
      '<p>' => '',
      '</p>' => '',
    }

    ::WorldHeritage.destroy_all
    # CSV.read(path.to_s, col_sep: ',', headers: true, encoding: 'windows-1251:utf-8').each do |row|
    CSV.read(path.to_s, col_sep: ',', headers: true, encoding: 'utf-8').each do |row|
    # puts row['name_fr']
      word_heritage = ::WorldHeritage.new(
        unique_number: row['unique_number'],
        name_en: row['name_en'],
        name_fr: row['name_fr'],
        short_description_en: row['short_description_en'][3..-5],
        short_description_fr: row['short_description_fr'][3..-5],
        justification_en: row['justification_en'] ? row['justification_en'][3..-5] : nil,
        justification_fr: row['justification_fr'] ? row['justification_fr'][3..-5] : nil,
        date_inscribed: row['date_inscribed'],
        secondary_dates: row['secondary_dates'],
        danger: row['danger'],
        longitude: row['longitude'],
        latitude: row['latitude'],
        area_hectares: row['area_hectares'],
        criteria_txt: row['criteria_txt'],
        category: row['category'],
        states_name_en: row['states_name_en'],
        states_name_fr: row['states_name_fr'],
        region_en: row['region_en'],
        region_fr: row['region_fr'],
      )

      word_heritage.save!
      puts "w #{word_heritage.unique_number} finished"
    rescue => e
      puts "w #{row["unique_number"]} failed for #{e}"
    end
  end
end
