class CategoriesController < ApplicationController
  def show
    @category = Category.find_by_slug(params[:slug])
    @herbs = @category.herbs
    @categories = Category.all
    @back = Rails.application.routes.recognize_path(request.referrer)
    session[:current_category] = @category.name.downcase
    if @back[:controller] != 'pages'
      session[:current_category] = @category.name.downcase
    end
  end
end
