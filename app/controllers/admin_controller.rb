class AdminController < ApplicationController
  before_action :authenticate_user!

  def index
    user_check
    @categories = Category.all
    @herbs = Herb.all
    @user = User.find_by_id(session[:user_id])
  end

  def showUserHerbs
    @user = User.find_by_slug(params[:slug])
    @herbs = @user.herbs
    @user = User.find_by_id(session[:user_id])
  end

  def updateUserProfile

  end

  private

  def authenticate_user!
    if !logged_in?
      redirect_to login_path
    end
  end

  def user_check
    @user = User.find_by_id(session[:user_id])
    if @user.user_type == 'superadmin' || @user.user_type == 'admin'
      return false
    elsif @user.user_type == 'contributor'
      redirect_to "/admin/user/#{@user.slug}"
    end
  end
end
