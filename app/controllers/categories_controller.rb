class CategoriesController < ApplicationController
  def show
    @category = Category.find_by_slug(params[:slug])
    @herbs = @category.herbs
    @categories = Category.all
    @back = Rails.application.routes.recognize_path(request.referrer)
    session[:current_category] = @category.name.downcase
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.create(category_params)

    if @category.save
      flash[:notice] = "Herb [#{@category.name.upcase}] created successfully"
      redirect_to '/admin/categories'
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to '/admin/categories'
    end
  end

  def edit
    @category = Category.find_by_slug(params[:slug])
  end

  def update
    @category = Category.find_by_slug(params[:categories][:slug])

    if @category.update(category_params)
      flash[:notice] = "Herb [#{@category.name.upcase}] updated successfully"
      redirect_to "/admin/category/#{@category.slug}/edit"
    else
      flash.now[:error] = "Something went wrong, try again!"
      redirect_to "/admin/category/#{@category.slug}/edit"
    end
  end

  def destroy
    @category = Category.find_by_slug(params[:slug])

    if @category.destroy
      flash[:notice] = "Category [#{@category.name.upcase}] was deleted"
      # redirect_to controller: 'admin', action: 'categoriesIndex', status: 303
      # redirect_to controller: 'admin', action: 'categoriesIndex', status: 303
      # status
      # return :back
      head :ok
    end
  end

  private

  def category_params
    params.require(:categories).permit(
      :name,
      :thumbnail,
      :icon
    )
  end
end
