class AdminController < ApplicationController
  def index
    @categories = Category.all
    @herbs = Herb.all
  end

  def new
    @herb = Herb.new
    @categories = Category.all
  end

  def edit
    @herb = Herb.find_by_slug(params[:slug])
    @categories = Category.all
  end
end
