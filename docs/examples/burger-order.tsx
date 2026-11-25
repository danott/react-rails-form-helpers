import { useState } from "react"
import {
  ArrayFields,
  CheckBox,
  DestroyField,
  FieldsFor,
  FormFor,
  HiddenField,
  Label,
  Select,
  Submit,
  TextArea,
  TextField,
} from "react-rails-form-helpers"

export const title = "Burger order"
export const description =
  "An order with one customer and many burgers, saved with accepts_nested_attributes_for. Add and remove burgers: saved burgers are marked _destroy, new ones just disappear."
export const rails = `
class Order < ApplicationRecord
  has_one :customer
  has_many :burgers
  accepts_nested_attributes_for :customer
  accepts_nested_attributes_for :burgers, allow_destroy: true
end

params.require(:order).permit(
  :notes,
  customer_attributes: [:id, :name, :email],
  burgers_attributes: [:id, :variety, :add_fried_egg, :_destroy]
)
`

type Burger = {
  key: number
  id?: number
  variety: string
  add_fried_egg: boolean
  destroy?: boolean
}

let nextKey = 3

export default function BurgerOrder() {
  const [burgers, setBurgers] = useState<Burger[]>([
    { key: 1, id: 1, variety: "Hamburger", add_fried_egg: true },
    { key: 2, id: 2, variety: "Cheeseburger", add_fried_egg: false },
  ])

  const add = () =>
    setBurgers([
      ...burgers,
      { key: nextKey++, variety: "Hamburger", add_fried_egg: false },
    ])

  // Saved burgers stay in the form with _destroy; unsaved ones are dropped.
  const remove = (burger: Burger) =>
    setBurgers(
      burger.id
        ? burgers.map((b) => (b === burger ? { ...b, destroy: true } : b))
        : burgers.filter((b) => b !== burger)
    )

  const restore = (burger: Burger) =>
    setBurgers(
      burgers.map((b) => (b === burger ? { ...b, destroy: false } : b))
    )

  return (
    <FormFor url="/orders/1" method="patch" name="order" csrfToken="token">
      <fieldset>
        <legend>Customer</legend>
        <FieldsFor name="customer" nested>
          <HiddenField name="id" value="7" />
          <div className="field">
            <Label htmlFor="name">Name</Label>
            <TextField name="name" defaultValue="Jude" />
          </div>
          <div className="field">
            <Label htmlFor="email">Email</Label>
            <TextField name="email" defaultValue="jude@example.com" />
          </div>
        </FieldsFor>
      </fieldset>

      <fieldset>
        <legend>Burgers</legend>
        <ArrayFields name="burgers" nested>
          {burgers.map((burger, index) => (
            <FieldsFor name={index} key={burger.key}>
              {burger.id && <HiddenField name="id" value={burger.id} />}

              {burger.destroy ? (
                <div className="row">
                  <DestroyField />
                  <span className="removed">{burger.variety}</span>
                  <button type="button" onClick={() => restore(burger)}>
                    Undo
                  </button>
                </div>
              ) : (
                <div className="row">
                  <Select name="variety" defaultValue={burger.variety}>
                    <option>Hamburger</option>
                    <option>Cheeseburger</option>
                    <option>Bacon Cheeseburger</option>
                  </Select>
                  <CheckBox
                    name="add_fried_egg"
                    defaultChecked={burger.add_fried_egg}
                  />
                  <Label htmlFor="add_fried_egg">Fried egg</Label>
                  <button type="button" onClick={() => remove(burger)}>
                    Remove
                  </button>
                </div>
              )}
            </FieldsFor>
          ))}
        </ArrayFields>
        <button type="button" onClick={add}>
          Add a burger
        </button>
      </fieldset>

      <div className="field">
        <Label htmlFor="notes">Notes</Label>
        <TextArea name="notes" defaultValue="Extra pickles" />
      </div>

      <Submit value="Update order" />
    </FormFor>
  )
}
