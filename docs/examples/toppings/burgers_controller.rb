class BurgersController < ApplicationController
  def update
    @burger = Burger.find(params[:id])

    if @burger.update(burger_params)
      redirect_to @burger
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def burger_params
    params.require(:burger).permit(:size, topping_ids: [], sauce_ids: [])
  end
end
