source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.3'
gem 'haml-rails'
gem 'jbuilder'
gem 'bcrypt'
gem 'mysql2'
gem 'rename'
gem 'redcarpet'
gem 'mini_magick'
gem 'carrierwave'
gem 'turnout'

group :development do
  gem 'thin'
  gem 'pry'
  gem 'pry-nav'
  gem 'web-console'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
