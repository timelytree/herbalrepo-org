Rails.application.routes.draw do
  root :to => 'herbs#index'

  # //////////////////////////////////////////////////////////////////// Session
  # ----------------------------------------------------------------------------
  get '/login', to: 'sessions#new'
  post '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # ////////////////////////////////////////////////////////////////////// Herbs
  # ----------------------------------------------------------------------------
  get '/herbs', to: 'herbs#index'
  get '/herbs/:slug', to: 'herbs#show'
  post '/herbs', to: 'herbs#create'
  patch '/herbs', to: 'herbs#update'
  delete '/herbs/:slug', to: 'herbs#destroy'

  # ////////////////////////////////////////////////////////////////////// Admin
  # ----------------------------------------------------------------------------
  # Herbs
  get '/admin', to: 'admin#herbsINDEX'
  get '/admin/herbs', to: 'admin#herbsINDEX'
  get '/admin/herb/new', to: 'herbs#new'
  get '/admin/herb/:slug/edit', to: 'herbs#edit'
  get '/admin/user/:slug/herbs', to: 'admin#herbsSHOW'
  # Users
  get '/admin/users', to: 'users#index'
  get '/admin/user/new', to: 'users#new'
  patch '/admin/user', to: 'users#update'
  # Categories
  get '/admin/categories', to: 'admin#categoriesINDEX'
  get '/admin/category/new', to: 'categories#new'
  get '/admin/category/:slug/edit', to: 'categories#edit'
  post '/admin/category/:slug/edit', to: 'categories#update'

  # ///////////////////////////////////////////////////////////////// Categories
  # ----------------------------------------------------------------------------
  get '/category/:slug', to: 'categories#show'
  post '/categories', to: 'categories#create'
  patch '/categories', to: 'categories#update'
  delete '/categories/:slug', to: 'categories#destroy'

  # ////////////////////////////////////////////////////////////////////// Pages
  # ----------------------------------------------------------------------------
  get '/about', to: 'pages#about'
  get '/contribute', to: 'contributions#index'
  post '/contribute', to: 'contributions#create'
end
