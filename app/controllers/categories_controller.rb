class CategoriesController < ApplicationController
  def show
    @category = Category.find_by_slug(params[:slug])
    @herbs = @category.herbs
    @categories = Category.all
    @back = Rails.application.routes.recognize_path(request.referrer)
    session[:current_category] = @category.name.downcase
  end

  def new

  end

  def create

  end

  def update

  end

  private

  def category_params
    params.require(:herbs).permit(
      
    )
  end
end
