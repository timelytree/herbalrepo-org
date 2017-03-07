source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.1'
gem 'haml-rails'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt'
gem 'mysql2'
gem 'rename'
gem 'redcarpet'

group :development do
  gem 'thin'
  gem 'pry'
  gem 'pry-nav'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

#/////////////////////////////////////////////////// Rails 4.2.7 Gemfile Archive
# source 'https://rubygems.org'
# ruby '2.4.0'

# gem 'rails', '5.0.1'
# gem 'sass-rails'
# gem 'haml-rails'
# gem 'uglifier'
# gem 'coffee-rails'
# gem 'jquery-rails'
# gem 'turbolinks'
# gem 'jquery-turbolinks'
# gem 'jbuilder'
# gem 'sdoc', group: :doc
# gem 'bcrypt'
# gem 'mysql2'
# gem 'rb-readline'
# gem 'mail_form'
# gem 'therubyracer', platforms: :ruby
# gem 'will_paginate'
# gem 'redcarpet'
# gem 'rename'
# # gem 'globalize', git: 'https://github.com/globalize/globalize'
# # gem 'spina', git: 'https://github.com/denkGroot/Spina'

# group :development do
#   gem 'thin'
#   gem "better_errors"
#   gem "binding_of_caller"
# end

# group :development, :test do
#   gem 'pry'
#   gem 'pry-nav'
#   gem 'rspec-rails'
# end

# group :test do
#   gem 'database_cleaner'
#   gem 'shoulda-matchers'
# end

# group :production do
#   gem 'execjs'
#   # gem 'rails_12factor'
# end
