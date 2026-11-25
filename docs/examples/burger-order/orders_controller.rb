class OrdersController < ApplicationController
  def update
    @order = Order.find(params[:id])

    if @order.update(order_params)
      redirect_to @order
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(
      :notes,
      customer_attributes: [:id, :name, :email],
      burgers_attributes: [:id, :variety, :add_fried_egg, :_destroy]
    )
  end
end
