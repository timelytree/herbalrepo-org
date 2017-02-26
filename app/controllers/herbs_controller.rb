class HerbsController < ApplicationController
  def show
    @herb = Herb.find(params[:id])
    # binding.pry
    respond_to do |format|
      format.json { render json: @herb }
      format.html
    end
  end

  def create
    # binding.pry
    @herb = Herb.create(herb_params)

    if @herb.save
      flash[:notice] = "Herb [#{@herb.name.upcase}] created successfully"
      redirect_to root_path
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to root_path
    end
  end

  private

  def herb_params
    params.require(:herbs).permit(:name, :latin_name, :general_description, :tea_dosage_amount, :tea_steep_time, :tea_steep_temperature, :tea_preparation)
  end
end
