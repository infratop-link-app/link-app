Rails.application.routes.draw do
  root 'links#index'
  resources :links, except: [:show] do
    collection do
      get :blue_index
    end
  end
  resources :tags, only: [:new, :create, :update, :destroy]
end
