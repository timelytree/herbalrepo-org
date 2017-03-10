class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      flash[:notice] = "Login successful"
      redirect_to :back
    else
      flash[:error] = "Something is wrong with your username or password, try again!"
      redirect_to :back
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = "Logout successful"
    redirect_to :back
  end
end
