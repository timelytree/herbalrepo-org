Rails.application.routes.draw do
  root :to => 'herbs#index'

  post '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/herbs', to: 'herbs#index'
  get '/herbs/:slug', to: 'herbs#show'
  post '/herbs', to: 'herbs#create'
  patch '/herbs', to: 'herbs#update'

  get '/category', to: 'pages#landing'
  get '/category/:slug', to: 'categories#show'

  get '/about', to: 'pages#about'
  get '/contribute', to: 'pages#contribute'

  # get '/herbs/:id', to: 'herbs#show'
  # post '/herbs', to: 'herbs#create'
  # patch '/herbs', to: 'herbs#update'
end
