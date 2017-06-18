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
  get '/admin', to: 'admin#herbsIndex'
  get '/admin/herbs', to: 'admin#herbsIndex'
  get '/admin/herb/new', to: 'herbs#new'
  get '/admin/herb/edit/:slug', to: 'herbs#edit'
  # Users
  get '/admin/user/:slug', to: 'admin#showUserHerbs'
  patch '/admin/user', to: 'users#update'
  # Categories
  get '/admin/categories', to: 'admin#categoriesIndex'
  get '/admin/category/edit/:slug', to: 'categories#edit'
  post '/admin/category/edit/:slug', to: 'categories#update'

  # ///////////////////////////////////////////////////////////////// Categories
  # ----------------------------------------------------------------------------
  get '/category/:slug', to: 'categories#show'
  post '/categories', to: 'categories#create'
  patch '/categories', to: 'categories#update'

  # ////////////////////////////////////////////////////////////////////// Pages
  # ----------------------------------------------------------------------------
  get '/about', to: 'pages#about'
  get '/contribute', to: 'contributions#index'
  post '/contribute', to: 'contributions#create'
end
