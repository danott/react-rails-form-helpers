import { createRef } from "react"
import {
  ArrayFields,
  CheckBox,
  DestroyField,
  FieldsFor,
  FormFor,
  HiddenField,
  Label,
  Radio,
  Select,
  Submit,
  TextField,
} from "../src/index.js"
import { railsParams, render, submittedEntries } from "./helpers.js"

const Form = ({ children }: { children: React.ReactNode }) => (
  <FormFor url="/orders/1" method="patch" name="order" csrfToken={null}>
    {children}
  </FormFor>
)

test("fields are named and id'd under the form's name", () => {
  const html = render(
    <Form>
      <Label htmlFor="notes">Notes</Label>
      <TextField name="notes" defaultValue="Extra pickles" />
    </Form>
  )

  expect(html.querySelector("label")!.htmlFor).toBe("order_notes")
  expect(html.querySelector("input[type=text]")!.id).toBe("order_notes")
  expect(
    railsParams(
      <Form>
        <TextField name="notes" defaultValue="Extra pickles" />
      </Form>
    )
  ).toMatchObject({ order: { notes: "Extra pickles" } })
})

test("nested attributes arrive as Rails' accepts_nested_attributes_for expects", () => {
  const burgers = [
    { id: 1, variety: "Hamburger" },
    { id: 2, variety: "Cheeseburger", destroy: true },
    { variety: "Veggie" },
  ]

  const params = railsParams(
    <Form>
      <FieldsFor name="customer" nested>
        <TextField name="name" defaultValue="Jude" />
      </FieldsFor>
      <ArrayFields name="burgers" nested>
        {burgers.map((burger, index) => (
          <FieldsFor name={index} key={index}>
            {burger.id && <HiddenField name="id" value={burger.id} />}
            {burger.destroy ? (
              <DestroyField />
            ) : (
              <Select name="variety" defaultValue={burger.variety}>
                <option>Hamburger</option>
                <option>Cheeseburger</option>
                <option>Veggie</option>
              </Select>
            )}
          </FieldsFor>
        ))}
      </ArrayFields>
    </Form>
  )

  expect(params).toEqual({
    _method: "patch",
    order: {
      customer_attributes: { name: "Jude" },
      burgers_attributes: {
        0: { id: "1", variety: "Hamburger" },
        1: { id: "2", _destroy: "1" },
        2: { variety: "Veggie" },
      },
    },
  })
})

test("a trailing [] collects an array, like has_many ids", () => {
  const params = railsParams(
    <Form>
      <Select name="topping_ids[]" multiple defaultValue={["1", "3"]}>
        <option value="1">Bacon</option>
        <option value="2">Egg</option>
        <option value="3">Avocado</option>
      </Select>
    </Form>
  )

  expect(params).toMatchObject({ order: { topping_ids: ["1", "3"] } })
})

describe("CheckBox", () => {
  const box = (props: React.ComponentProps<typeof CheckBox>) =>
    submittedEntries(
      <Form>
        <CheckBox {...props} />
      </Form>
    ).filter(([k]) => k !== "_method")

  test("submits 0 when unchecked and 1 when checked; Rails keeps the last value", () => {
    expect(box({ name: "rush" })).toEqual([["order[rush]", "0"]])
    expect(box({ name: "rush", defaultChecked: true })).toEqual([
      ["order[rush]", "0"],
      ["order[rush]", "1"],
    ])
  })

  test("submits nothing when disabled, checked or not (#31)", () => {
    expect(box({ name: "rush", disabled: true })).toEqual([])
    expect(box({ name: "rush", disabled: true, defaultChecked: true })).toEqual(
      []
    )
  })

  test("can leave out the hidden input", () => {
    expect(box({ name: "rush", includeHidden: false })).toEqual([])
  })
})

test("Submit is named commit, not scoped to the form, like Rails' f.submit", () => {
  const html = render(
    <Form>
      <Submit value="Update order" />
    </Form>
  )
  expect(html.querySelector<HTMLInputElement>("input[type=submit]")!.name).toBe(
    "commit"
  )
})

test("radio buttons get an id per value, and labels can target them", () => {
  const html = render(
    <Form>
      <Radio name="size" value="large" defaultChecked />
      <Label htmlFor="size" value="large">
        Large
      </Label>
    </Form>
  )

  expect(html.querySelector("input[type=radio]")!.id).toBe("order_size_large")
  expect(html.querySelector("label")!.htmlFor).toBe("order_size_large")
})

test("fields forward refs to the underlying element (#19)", () => {
  const ref = createRef<HTMLInputElement>()
  render(
    <Form>
      <TextField name="notes" ref={ref} />
    </Form>
  )
  expect(ref.current).toBeInstanceOf(HTMLInputElement)
})
