Rails.application.routes.draw do
  root :to => 'pages#landing'

  get '/herbs/:id', to: 'herbs#show'
end
