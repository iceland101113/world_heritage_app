module Api
  module V1
    class WorldHeritagesController < ApplicationController
      def index
        world_heritages = WorldHeritage.all
        countries = world_heritages.map { |item| { name: item.states_name_en, region: item.region_en } }.uniq
        regions = world_heritages.map { |item| { name: item.region_en } }.uniq
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
