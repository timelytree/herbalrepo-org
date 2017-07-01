class PagesController < ApplicationController
  def about
    @categories = Category.all
    @herbs = Herb.all
  end
end
