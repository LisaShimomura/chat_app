Rails.application.routes.draw do
  # ログイン後にはrootに飛ばされる
  #基本的なルーティング
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    omniauth: 'users/omniauth',
    passwords: 'users/passwords',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
  }
  resources :users, only: [:show] do
    collection do
      get '/search', to: 'users#search'
    end
  end
  root 'messages#index'
  resources :messages, only: [:create]
  resources :friendships, only: [:create, :destroy]

  # APIのルーティング
  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:index, :create] do
      collection do
        post :upload_image
      end
    end
    resources :users, only: [:index, :show, :create] do
      collection do
        get :search
      end
    end
    resources :current_user, only: [:index] do
      collection do
        put :update
      end
    end
  end
end
