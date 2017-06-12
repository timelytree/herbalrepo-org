class AdminController < ApplicationController
  before_action :authenticate_user!

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

  private

  def authenticate_user!
    if !logged_in?
      redirect_to login_path
    end
  end
end
