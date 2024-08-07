class ApplicationController < ActionController::Base
  before_action :set_locale

  def set_locale
    # binding.pry
    if params[:locale] && I18n.available_locales.include?( params[:locale].to_sym )
      session[:locale] = params[:locale]
    end

    I18n.locale = session[:locale] || I18n.default_locale
    @locale_params = { locale_params: I18n.locale }.to_json
  end
end
