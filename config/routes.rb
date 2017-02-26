Rails.application.routes.draw do
  root :to => 'pages#landing'

  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/herbs/:id', to: 'herbs#show'
  post '/herbs', to: 'herbs#create'
  patch '/herbs', to: 'herbs#update'
end
