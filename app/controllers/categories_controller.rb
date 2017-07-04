class CategoriesController < ApplicationController
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
