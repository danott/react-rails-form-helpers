class SurveysController < ApplicationController
  def create
    @survey = Survey.new(survey_params)

    if @survey.save
      redirect_to @survey
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def survey_params
    params.require(:survey).permit(
      :title,
      questions_attributes: [:id, :prompt, :kind, choices_attributes: [:id, :text]]
    )
  end
end
