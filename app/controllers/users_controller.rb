class UsersController < ApplicationController
  def update
    @user = Herb.find_by_id(params[:id])

    if @user.update(herb_params)
      flash[:notice] = "Herb [#{@user.name.upcase}] updated successfully"
      # redirect_to "/admin/edit/#{@user.slug}"
    else
      flash.now[:error] = "Something went wrong, try again!"
      # redirect_to "/admin/edit/#{@user.slug}"
    end
  end

  private

  def user_params
    params.require(:users).permit(

    )
  end
end
