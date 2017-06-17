class AdminController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = Category.all
    @herbs = Herb.all
  end

  private

  def authenticate_user!
    if !logged_in?
      redirect_to login_path
    end
  end
end
