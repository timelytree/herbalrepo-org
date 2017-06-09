class PagesController < ApplicationController
  def about
    @categories = Category.all
  end
end
