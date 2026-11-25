import {
  CheckBox,
  FormFor,
  HiddenField,
  Label,
  Radio,
  Select,
  Submit,
} from "react-rails-form-helpers"

export const title = "Arrays and choices"
export const description =
  "A name ending in [] submits an array, which is how Rails sets has_many ids. Like collection_check_boxes, one hidden empty value comes first so unchecking every box clears the list. Radio buttons each get their own id, and a Label with a value points at one."
export const rails = `
class Burger < ApplicationRecord
  has_and_belongs_to_many :toppings
  has_and_belongs_to_many :sauces
end

params.require(:burger).permit(:size, topping_ids: [], sauce_ids: [])
`

const toppings = [
  { id: 1, name: "Bacon" },
  { id: 2, name: "Fried egg" },
  { id: 3, name: "Avocado" },
]

export default function Toppings() {
  return (
    <FormFor url="/burgers/1" method="patch" name="burger" csrfToken="token">
      <fieldset>
        <legend>Size</legend>
        {["Single", "Double", "Triple stack"].map((size) => (
          <div className="row" key={size}>
            <Radio
              name="size"
              value={size}
              defaultChecked={size === "Double"}
            />
            <Label htmlFor="size" value={size}>
              {size}
            </Label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Toppings</legend>
        <HiddenField name="topping_ids[]" value="" />
        {toppings.map((topping) => (
          <div className="row" key={topping.id}>
            <CheckBox
              name="topping_ids[]"
              id={`burger_topping_ids_${topping.id}`}
              checkedValue={topping.id}
              includeHidden={false}
              defaultChecked={topping.id === 1}
            />
            <label htmlFor={`burger_topping_ids_${topping.id}`}>
              {topping.name}
            </label>
          </div>
        ))}
      </fieldset>

      <div className="field">
        <Label htmlFor="sauce_ids">Sauces</Label>
        <Select name="sauce_ids[]" multiple defaultValue={["1", "3"]}>
          <option value="1">Ketchup</option>
          <option value="2">Mustard</option>
          <option value="3">Mayo</option>
        </Select>
      </div>

      <Submit value="Update burger" />
    </FormFor>
  )
}
