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

  def create
    file = params[:herbs][:image]
    file_name = Time.now.to_i
    file_ext = file.content_type.split('/')[1]
    @herb = Herb.create(herb_params)

    if @herb.save
      upload(file, file_name, file_ext)
      @herb.update(thumbnail: "#{file_name}.#{file_ext}")
      flash[:notice] = "Herb [#{@herb.name.upcase}] created successfully"
      redirect_to admin_path
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to admin_path
    end
  end

  def update
    @herb = Herb.find_by_slug(params[:herbs][:slug])
    if @herb.update(herb_params)
      flash[:notice] = "Herb [#{@herb.name.upcase}] updated successfully"
      redirect_to "/admin/edit/#{@herb.slug}"
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to "/admin/edit/#{@herb.slug}"
    end
  end

  private

  def herb_params
    params.require(:herbs).permit(
      :name,
      :latin_name,
      :information,
      :draft_status,
      category_ids: []
    )
  end

  def upload(file, name, ext)
    File.open(Rails.root.join('public', 'uploads', "#{name}.#{ext}"), 'wb') do |f|
      f.write(file.read)
    end
  end
end
