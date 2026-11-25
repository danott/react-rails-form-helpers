class AccountsController < ApplicationController
  def update
    @account = Account.find(params[:id])

    if @account.update(account_params)
      redirect_to @account
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.require(:account).permit(
      :name,
      preferences: [:theme, notifications: [:email, :push]]
    )
  end
end
