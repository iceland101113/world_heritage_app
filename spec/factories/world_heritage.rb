FactoryBot.define do
  factory :world_heritage do
    unique_number { 1 }
    name_en { "test heritage" }
    short_description_en { "test short description" }
    longitude { 0 }
    latitude { 0 }
  end
end
