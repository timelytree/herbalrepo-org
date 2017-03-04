class HerbsController < ApplicationController
  def show
    session[:return_to] ||= request.referer
    @herb = Herb.find(params[:id])
    @categories = Category.all
    @herbs = Herb.all
    @back = Rails.application.routes.recognize_path(request.referrer)
    if @back[:id] != nil
      @back_slug = Category.find(@back[:id]).slug
    end
    respond_to do |format|
      format.json { render json: @herb }
      format.html
    end
  end

  def create
    file = params[:herbs][:image]
    file_name = Time.now.to_i
    file_ext = file.content_type.split('/')[1]
    @herb = Herb.create(herb_params)

    if @herb.save
      upload(file, file_name, file_ext)
      @herb.update(thumbnail: "#{file_name}.#{file_ext}")
      flash[:notice] = "Herb [#{@herb.name.upcase}] created successfully"
      redirect_to root_path
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to root_path
    end
  end

  def update
    @herb = Herb.find(params[:id])
    if @herb.update(herb_params)
      flash[:notice] = "Herb [#{@herb.name.upcase}] updated successfully"
      redirect_to root_path
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to root_path
    end
  end

  private

  def herb_params
    params.require(:herbs).permit(
      :name,
      :latin_name,
      :general_description,
      :tea_dosage_amount,
      :tea_steep_time,
      :tea_steep_temperature,
      :tea_preparation,
      category_ids: []
    )
  end

  def upload(file, name, ext)
    File.open(Rails.root.join('public', 'uploads', "#{name}.#{ext}"), 'wb') do |f|
      f.write(file.read)
    end
  end
end
