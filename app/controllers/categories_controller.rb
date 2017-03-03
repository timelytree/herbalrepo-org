class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    @herbs = @category.herbs
  end
end
