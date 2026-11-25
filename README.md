# React Rails Form Helpers

Build forms in React that submit the params Rails expects.

```
npm install react-rails-form-helpers
```

Requires React 19.

## About

These components name your inputs the way Rails' form builder does, and add the hidden inputs Rails relies on. Everything else is a plain DOM element: every prop you pass, including `ref`, goes straight to the `<form>`, `<input>`, `<select>`, `<textarea>`, or `<label>` underneath.

There are two kinds of components.

- **`…Tag` components** (`TextFieldTag`, `SelectTag`, …) mirror Rails' `*_tag` helpers. They render exactly what you give them.
- **Field components** (`TextField`, `Select`, …) mirror Rails' form builder. They take a short `name` and turn it into the full `name` and `id` for the form they're in: `name="email"` becomes `name="order[customer_attributes][email]"` and `id="order_customer_attributes_email"`.

### FormTag

A `<form>` that adds:

1. `_method` for `put`, `patch`, and `delete`, which browsers can't send directly.
2. The CSRF token, read from `<meta name="csrf-token">` in the document head. Pass `csrfToken` yourself when rendering on the server, or `csrfToken={null}` to leave it out. `get` forms never send it.

Pass `enforceUtf8` if your app still expects the `utf8=✓` param from Rails before 6.0.

### FormFor

A `FormTag` that names its fields under `name`, like `form_with model: @order`.

### FieldsFor

Nests the fields inside it under another name, like `fields_for`. On its own (without `FormFor`) it lets React render part of a form that Rails rendered.

For `accepts_nested_attributes_for`, add `nested` and it appends `_attributes` for you:

```jsx
<FieldsFor name="customer" nested>  {/* order[customer_attributes][…] */}
```

`HashFields` and `ArrayFields` are the same component, named to say what you're nesting.

### Other fields

- **`CheckBox`** renders a hidden input before the checkbox, so an unchecked box still submits `"0"` (change it with `uncheckedValue`, or leave the hidden input out with `includeHidden={false}`). When the box is disabled, the hidden input is too, so nothing is submitted.
- **`Radio`** gets an id that includes its value (`order_size_large`). Target it with `<Label htmlFor="size" value="large">`.
- **`DestroyField`** submits `_destroy=1` to remove a nested record.
- **`Submit`** submits `commit`, not scoped to the form's name, like `f.submit`.
- End a name with `[]` to submit an array: `<Select name="topping_ids[]" multiple>` submits `order[topping_ids][]`.
- **`useFieldName(name)`** returns the `{ name, id }` a field would get, for building your own inputs.

## Example

Try this and other nested forms live, with the `params` Rails would receive shown as you edit: [examples](https://danott.github.io/react-rails-form-helpers/).

```jsx
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

function EditOrderForm({ order }) {
  const [burgers, setBurgers] = useState(order.burgers)

  const addBurger = () => setBurgers([...burgers, { variety: "Hamburger" }])
  const removeBurger = (removed) =>
    setBurgers(
      burgers.map((b) => (b === removed ? { ...b, destroy: true } : b))
    )

  return (
    <FormFor url={`/orders/${order.id}`} method="patch" name="order">
      <FieldsFor name="customer" nested>
        <Label htmlFor="name">Name</Label>
        <TextField name="name" defaultValue={order.customer.name} />
      </FieldsFor>

      <ArrayFields name="burgers" nested>
        {burgers.map((burger, index) => (
          <FieldsFor name={index} key={index}>
            {burger.id && <HiddenField name="id" value={burger.id} />}

            {burger.destroy ? (
              <DestroyField />
            ) : (
              <div>
                <Label htmlFor="variety">Variety</Label>
                <Select name="variety" defaultValue={burger.variety}>
                  <option>Hamburger</option>
                  <option>Cheeseburger</option>
                </Select>

                <Label htmlFor="add_fried_egg">Add a fried egg?</Label>
                <CheckBox
                  name="add_fried_egg"
                  defaultChecked={burger.add_fried_egg}
                />

                <button type="button" onClick={() => removeBurger(burger)}>
                  Remove
                </button>
              </div>
            )}
          </FieldsFor>
        ))}
      </ArrayFields>

      <button type="button" onClick={addBurger}>
        Add a burger
      </button>

      <Label htmlFor="notes">Notes</Label>
      <TextArea name="notes" defaultValue={order.notes} />

      <Submit value="Update order" />
    </FormFor>
  )
}
```

Rails receives:

```ruby
{
  "_method" => "patch",
  "authenticity_token" => "…",
  "order" => {
    "customer_attributes" => { "name" => "Jude" },
    "burgers_attributes" => {
      "0" => { "id" => "1", "variety" => "Hamburger", "add_fried_egg" => "1" },
      "1" => { "id" => "2", "_destroy" => "1" },
      "2" => { "variety" => "Hamburger", "add_fried_egg" => "0" }
    },
    "notes" => "Extra pickles"
  },
  "commit" => "Update order"
}
```

## Upgrading from 0.1

- React 19 is required. `prop-types` is gone; the package ships TypeScript types instead.
- The package is ESM only, and the UMD build in `dist/` is gone (React 19 no longer ships one either).
- `Submit` submits `commit` instead of `order[commit]`, matching Rails.
- The `utf8` param is off by default. Pass `enforceUtf8` to keep it.
- `CheckBox`'s hidden input is disabled along with the box.
- `Radio` ids include the value.
- `DatetimeField` renders `datetime-local`, since browsers dropped `datetime`.
- Refs reach the underlying element.

## Development

```
npm install
npm test
npm run typecheck
npm run build
npm run docs   # the examples site, at http://localhost:5173
```
