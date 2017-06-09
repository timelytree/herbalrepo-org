class ContributionsController < ApplicationController
  def index
    @categories = Category.all
  end

  def create
    @contribution = Contribute.create(contribution_params)

    if @contribution.save
      flash[:notice] = "Your contribution was submitted, stay awesome! :)"
      redirect_to contribute_path
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to contribute_path
    end
  end

  private

  def contribution_params
    params.require(:contribution).permit(:name, :email, :herb_sci_name, :text)
  end
end
