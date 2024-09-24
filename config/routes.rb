Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "home/index"  
  get "api_docs/index"
  root "home#index"
  namespace :api do
    namespace :v1 do
      resources :world_heritages, only: [:index, :show]
    end
  end

  namespace :public do
    namespace :api do
      namespace :v1 do
        resources :heritages, only: [:index, :show]
      end
    end
  end
end
