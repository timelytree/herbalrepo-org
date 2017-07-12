class PagesController < ApplicationController
  def about
    @categories = Category.all
    @herbs = Herb.where(draft_status: 'live')
    @footerHerbs = Herb.where(draft_status: 'live').last(3).reverse
  end
end
