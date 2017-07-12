class PagesController < ApplicationController
  def about
    @categories = Category.all
    @herbs = Herb.all
    @footerHerbs = Herb.where(draft_status: 'live').last(3).reverse
  end
end
