Rails.application.routes.draw do
  root :to => 'pages#landing'

  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/herbs', to: 'pages#landing'
  get '/herbs/:id', to: 'herbs#show'
  post '/herbs', to: 'herbs#create'
  patch '/herbs', to: 'herbs#update'

  get '/category', to: 'pages#landing'
  get '/category/:slug', to: 'categories#show'

  # get '/herbs/:id', to: 'herbs#show'
  # post '/herbs', to: 'herbs#create'
  # patch '/herbs', to: 'herbs#update'
end
