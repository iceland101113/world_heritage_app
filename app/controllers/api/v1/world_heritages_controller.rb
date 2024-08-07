module Api
  module V1
    class WorldHeritagesController < ApplicationController
      def index
        i18n_locale = I18n.locale == :'zh-TW' ? 'zh' : I18n.locale.to_s
        world_heritages = WorldHeritage.all.map do |world_heritage|
          {
            name: world_heritage.send("name_#{i18n_locale}"),
            short_description: world_heritage.send("short_description_#{i18n_locale}"),
            country: world_heritage.send("states_name_#{i18n_locale}"),
            region: world_heritage.send("region_#{i18n_locale}"),
            longitude: world_heritage.longitude,
            latitude: world_heritage.latitude,
            unique_number: world_heritage.unique_number,
            category: world_heritage.category,
          }
        end
        # world_heritages = WorldHeritage.all
        countries = world_heritages.map { |item| { name: item[:country], region: item[:region] } }.uniq
        regions = world_heritages.map { |item| { name: item[:region] } }.uniq
        # countries = world_heritages.map { |item| { name: item.states_name_en, region: item.region_en } }.uniq
        # regions = world_heritages.map { |item| { name: item.region_en } }.uniq
        render json: { data: world_heritages.as_json, countries: countries, regions: regions }
      end

      def show
        render json: WorldHeritage.find(params[:id])
      end

      # def create
      #   render json: WorldHeritage.create(world_heritage_params)
      # end

      # def update
      #   WorldHeritage.find(params[:id]).update(world_heritage_params)
      #   render json: WorldHeritage.find(params[:id])
      # end

      # def destroy
      #   render json: WorldHeritage.find(params[:id]).destroy
      # end

      # private

      # def world_heritage_params
      #   params.require(:world_heritage).permit(:name, :description, :image_url, :country_id)
      # end
    end
  end
end
