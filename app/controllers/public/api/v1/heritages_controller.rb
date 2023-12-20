module Public
  module Api
    module V1
      class HeritagesController < ApplicationController
        def index
          heritages = WorldHeritage.where(heritages_params).page(params[:page]).per(params[:per_page])

          render json: { total_pages: heritages.total_pages, current_page: heritages.current_page, data: heritages }
        end

        def heritages_params
          params.permit(:category, :states_name_en, :region_en)
        end
      end
    end
  end
end
