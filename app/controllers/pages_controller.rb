class PagesController < ApplicationController
  def landing
    @herbs = Herb.all
  end
end
