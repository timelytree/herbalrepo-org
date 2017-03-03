class PagesController < ApplicationController
  def landing;
    @categories = Category.all
  end
end
