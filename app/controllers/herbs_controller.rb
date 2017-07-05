class HerbsController < ApplicationController
  def index
    @categories = Category.all
    @herbs = Herb.all
    @recentlyAddedHerbs = Herb.last(6).reverse
  end

  def show
    @herb = Herb.find_by_slug(params[:slug])
    draft_check(@herb)
    @herbs = Herb.all
    @recentlyAddedHerbs = Herb.last(6).reverse
    @categories = Category.all
  end

  def new
    @herb = Herb.new
    @categories = Category.all
    @textareaPLACEHOLDER = %q(
      [glance--]
      - Treats
        -
      - Location
        -
      - Type
        -
      [--glance]

      [introduction--]
      ### INTRODUCTION
      [--introduction]

      [preparation--]
      ### PREPARATION
      #### TEA
      - Put 1.8g (1 tsp) of loosely ground Valerian Root into a cup.
      - Pour 250mL (1 cup) of 95˚C water into the cup.
      - Cover and let steep for 20-30 mins.
      - For best effects, let steep in room-temperature water for 12-24 hours.

      #### TINCTURE
      - Fill a 500mL (1 pint) jar half-way with loosely-ground Valerian Root
      - Fill the rest with 80- or 100-proof vodka (1:1 ratio, herb:vodka)
      - Mix thoroughly
      - Let sit out of direct sunlight for 6 weeks
      - Give the jar a shake every day.
      - After 6 weeks, strain using a cheese cloth and discard solids.
      [--preparation]

      [directions--]
      ### DIRECTIONS FOR USE & DOSAGE
      [--directions]

      [adversity--]
      ### ADVERSE EFFECTS & CONTRAINDICATIONS
      [--adversity]

      [references--]
      ### REFERENCES
      1.
      [--references]
    )
  end

  def create
    @herb = Herb.create(herb_params)

    if @herb.save
      flash[:notice] = "Herb [#{@herb.name.upcase}] created successfully"
      redirect_to '/admin/herbs'
    else
      flash[:error] = "Something went wrong, try again!"
      redirect_to '/admin/herbs'
    end
  end

  def edit
    @herb = Herb.find_by_slug(params[:slug])
    @categories = Category.all
  end

  def update
    @herb = Herb.find_by_slug(params[:herbs][:slug])

    if @herb.update(herb_params)
      flash[:notice] = "Herb [#{@herb.name.upcase}] updated successfully"
      redirect_to "/admin/herb/#{@herb.slug}/edit"
    else
      flash.now[:error] = "Something went wrong, try again!"
      redirect_to "/admin/herb/#{@herb.slug}/edit"
    end
  end

  def destroy
    @herb = Herb.find_by_slug(params[:slug])

    @herb.destroy
    flash[:notice] = "Herb [#{@herb.name.upcase}] was deleted"

    redirect_to action: 'index', status: 303
  end

  private

  def herb_params
    params.require(:herbs).permit(
      :name,
      :latin_name,
      :information,
      :draft_status,
      :thumbnail,
      :user_id,
      :seo_title,
      :seo_description,
      :seo_thumbnail_alt_text,
      category_ids: []
    )
  end

  def draft_check(herb)
    if herb.draft_status != 'live' && !logged_in?
      raise ActionController::RoutingError.new('Not Found')
    end
  end
end
