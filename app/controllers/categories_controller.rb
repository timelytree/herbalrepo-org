class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    @herbs = @category.herbs
    @categories = Category.all
    @back = Rails.application.routes.recognize_path(request.referrer)
  end
end
