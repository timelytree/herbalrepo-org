Rails.application.routes.draw do
  root :to => 'herbs#index'

  get '/login', to: 'sessions#new'
  post '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/herbs', to: 'herbs#index'
  get '/herbs/:slug', to: 'herbs#show'
  post '/herbs', to: 'herbs#create'
  patch '/herbs', to: 'herbs#update'
  delete '/herbs/:slug', to: 'herbs#destroy'

  get '/admin', to: 'admin#index'
  get '/admin/herbs', to: 'admin#herbsIndex'
  get '/admin/herb/new', to: 'herbs#new'
  get '/admin/herb/edit/:slug', to: 'herbs#edit'
  get '/admin/user/:slug', to: 'admin#showUserHerbs'
  get '/admin/categories', to: 'admin#categoriesIndex'
  post '/admin/category/edit/:slug', to: 'admin#editCategory'
  patch '/admin/user', to: 'users#update'

  get '/category/:slug', to: 'categories#show'
  post '/categories', to: 'categories#create'
  patch '/categories', to: 'categories#update'

  get '/about', to: 'pages#about'
  get '/contribute', to: 'contributions#index'
  post '/contribute', to: 'contributions#create'
end
