class HerbsController < ApplicationController
  def index
    @categories = Category.all
    @herbs = Herb.all
    session.delete(:current_category)
  end

  def show
    @herb = Herb.find_by_slug(params[:slug])
    @categories = Category.all
    @back = Rails.application.routes.recognize_path(request.referrer)
    if @back[:controller] == 'herbs' && @back[:action] == 'index' || @back[:controller] == 'herbs' && session[:current_category] == nil
      session.delete(:current_category)
      @herbs = Herb.all
    elsif @back[:controller] == 'categories' || @back[:controller] == 'herbs' && session[:current_category] != nil
      @herbs = Category.find_by_name(session[:current_category]).herbs
    else
      @herbs = Herb.all
    end
  end

  def new
    @herb = Herb.new
    @categories = Category.all
    @loggedInUser = User.find_by_id(session[:user_id])
  end

  def create
    @herb = Herb.create(herb_params)
    @loggedInUser = User.find_by_id(session[:user_id])

    if @herb.save
      flash[:notice] = "Herb [#{@herb.name.upcase}] created successfully"
      redirect_to '/admin/herbs'
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to '/admin/herbs'
    end
  end

  def edit
    @herb = Herb.find_by_slug(params[:slug])
    @categories = Category.all
    @loggedInUser = User.find_by_id(session[:user_id])
  end

  def update
    @herb = Herb.find_by_slug(params[:herbs][:slug])
    @loggedInUser = User.find_by_id(session[:user_id])

    if @herb.update(herb_params)
      flash[:notice] = "Herb [#{@herb.name.upcase}] updated successfully"
      redirect_to "/admin/herb/edit/#{@herb.slug}"
    else
      flash.now[:error] = "Something went wrong, try again!"
      redirect_to "/admin/herb/edit/#{@herb.slug}"
    end
  end

  def destroy
    @herb = Herb.find_by_slug(params[:slug])

    @herb.destroy
    flash[:notice] = "Herb [#{@herb.name.upcase}] was deleted"

    redirect_to action: 'index', status: 303
  end

  private

  def herb_params
    params.require(:herbs).permit(
      :name,
      :latin_name,
      :information,
      :draft_status,
      :thumbnail,
      :user_id,
      category_ids: []
    )
  end
end
