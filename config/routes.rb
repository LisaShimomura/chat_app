Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    resources :comments
  end

  resources :messages
  root to: 'messages#index'
end
