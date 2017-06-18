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

  get '/admin/new-herb', to: 'herbs#new'
  get '/admin/edit/:slug', to: 'herbs#edit'

  get '/category', to: 'pages#landing'
  get '/category/:slug', to: 'categories#show'

  get '/about', to: 'pages#about'
  get '/contribute', to: 'contributions#index'
  post '/contribute', to: 'contributions#create'

  get '/admin', to: 'admin#index'

  get '/admin/user/:slug', to: 'admin#showUserHerbs'
  patch '/admin/user', to: 'admin#updateUserProfile'
end
