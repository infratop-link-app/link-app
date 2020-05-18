Rails.application.routes.draw do
  root 'links#index'
  resources :links, except: [:show]
end
