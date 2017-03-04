class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    @herbs = @category.herbs
    @categories = Category.all
  end
end
