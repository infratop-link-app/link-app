Rails.application.routes.draw do
  root 'links#index'
  resources :links, except: [:show]
  resources :tags, only: [:new, :create, :update, :destroy]
end
