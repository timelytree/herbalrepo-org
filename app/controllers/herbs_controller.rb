class HerbsController < ApplicationController
  def show
    @herb = Herb.find(params[:id])
    # binding.pry
    respond_to do |format|
      format.json { render json: @herb }
      format.html
    end
  end
end
