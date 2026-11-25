import type { ComponentType } from "react"

import BurgerOrderForm from "./burger-order/BurgerOrderForm.js"
import burgerOrderForm from "./burger-order/BurgerOrderForm.tsx?raw"
import orderModel from "./burger-order/order.rb?raw"
import ordersController from "./burger-order/orders_controller.rb?raw"

import SurveyForm from "./survey/SurveyForm.js"
import surveyForm from "./survey/SurveyForm.tsx?raw"
import surveyModel from "./survey/survey.rb?raw"
import questionModel from "./survey/question.rb?raw"
import surveysController from "./survey/surveys_controller.rb?raw"

import BurgerToppingsForm from "./toppings/BurgerToppingsForm.js"
import burgerToppingsForm from "./toppings/BurgerToppingsForm.tsx?raw"
import burgerModel from "./toppings/burger.rb?raw"
import burgersController from "./toppings/burgers_controller.rb?raw"

import PreferencesFields from "./embedded/PreferencesFields.js"
import preferencesFields from "./embedded/PreferencesFields.tsx?raw"
import accountEditView from "./embedded/edit.html.erb?raw"
import accountModel from "./embedded/account.rb?raw"
import accountsController from "./embedded/accounts_controller.rb?raw"
import accountEditHtml from "./embedded/rendered.html?raw"

export type SourceFile = { path: string; source: string }

export type Example = {
  title: string
  description: string
  Component: ComponentType<any>
  /**
   * When React renders only part of a form, the HTML Rails rendered around it.
   * The component mounts into its `[data-react-class]` element.
   */
  railsHtml?: string
  files: SourceFile[]
}

const component = (name: string, source: string) => ({
  path: `app/javascript/components/${name}.tsx`,
  source,
})

export const examples: Record<string, Example> = {
  "burger-order": {
    title: "Burger order",
    description:
      "An order with one customer and many burgers, saved with accepts_nested_attributes_for. Add and remove burgers: saved burgers are marked _destroy, new ones just disappear.",
    Component: BurgerOrderForm,
    files: [
      component("BurgerOrderForm", burgerOrderForm),
      { path: "app/models/order.rb", source: orderModel },
      {
        path: "app/controllers/orders_controller.rb",
        source: ordersController,
      },
    ],
  },
  survey: {
    title: "Survey builder",
    description:
      "Nested attributes two levels deep: a survey has many questions, and each question has many choices. Every level is its own FieldsFor, so names stack up to survey[questions_attributes][0][choices_attributes][1][text].",
    Component: SurveyForm,
    files: [
      component("SurveyForm", surveyForm),
      { path: "app/models/survey.rb", source: surveyModel },
      { path: "app/models/question.rb", source: questionModel },
      {
        path: "app/controllers/surveys_controller.rb",
        source: surveysController,
      },
    ],
  },
  toppings: {
    title: "Arrays and choices",
    description:
      "A name ending in [] submits an array, which is how Rails sets has_many ids. As with Rails' collection_check_boxes and multiple selects, a hidden empty value comes first so clearing every choice clears the list. Checkboxes and radio buttons each get an id that includes their value, and a Label with a value points at one.",
    Component: BurgerToppingsForm,
    files: [
      component("BurgerToppingsForm", burgerToppingsForm),
      { path: "app/models/burger.rb", source: burgerModel },
      {
        path: "app/controllers/burgers_controller.rb",
        source: burgersController,
      },
    ],
  },
  embedded: {
    title: "Inside a Rails form",
    description:
      "Rails renders the form, and React renders just part of it: FieldsFor works without FormFor. Here it fills a hash stored in a json column. That's a plain hash, not an association, so there's no nested prop and no _attributes.",
    Component: PreferencesFields,
    railsHtml: accountEditHtml,
    files: [
      { path: "app/views/accounts/edit.html.erb", source: accountEditView },
      component("PreferencesFields", preferencesFields),
      { path: "app/models/account.rb", source: accountModel },
      {
        path: "app/controllers/accounts_controller.rb",
        source: accountsController,
      },
    ],
  },
}
