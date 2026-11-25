import {
  CheckBox,
  FormFor,
  HiddenField,
  Label,
  Radio,
  Select,
  Submit,
} from "react-rails-form-helpers"

const sizes = ["Single", "Double", "Triple stack"]

const toppings = [
  { id: 1, name: "Bacon" },
  { id: 2, name: "Fried egg" },
  { id: 3, name: "Avocado" },
]

export default function BurgerToppingsForm() {
  return (
    <FormFor url="/burgers/1" method="patch" name="burger" csrfToken="token">
      <fieldset>
        <legend>Size</legend>
        {sizes.map((size) => (
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
        {/* Submitted even when every box is unchecked, so the list can be cleared. */}
        <HiddenField name="topping_ids[]" value="" />
        {toppings.map((topping) => (
          <div className="row" key={topping.id}>
            <CheckBox
              name="topping_ids[]"
              checkedValue={topping.id}
              includeHidden={false}
              defaultChecked={topping.id === 1}
            />
            <Label htmlFor="topping_ids[]" value={topping.id}>
              {topping.name}
            </Label>
          </div>
        ))}
      </fieldset>

      <div className="field">
        <Label htmlFor="sauce_ids">Sauces</Label>
        {/* Same as above: lets deselecting every sauce clear the list. */}
        <HiddenField name="sauce_ids[]" value="" />
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
