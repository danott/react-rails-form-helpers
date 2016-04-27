# React Rails Form Helpers

## Installation

Using via npm

```
npm install --save react-rails-form-helpers
```

Usage via vendoring

You can grab the latest UMD build from https://npmcdn.com/react-rails-form-helpers@latest/dist/react-rails-form-helpers.js

## About

This package provides components for composing a form targeted at Rails.
The main intent of this package is for communicating the intent of the form via named components.
If you're scared by *Rails Magic* you'll be happy to know that these components are mostly dumb.
The only magical parts are generating the attribute names and ensuring that the fields Rails expects exist on a form.

There are two varieties of components.

### "FieldTag" components

 The components with a `Tag` suffix are not magical at all.
 They exist to mirror the [Rails form helpers][] for expressing the intent.
 They are tiny wrappers around the built in ReactDOM `<input />` and `<select />` components.

### "Field" components

 The components without a `Tag` suffix are only slightly magical.
 They use a React context to generate the `input[name]` and `label[for]` attribute for nested attributes.

### FormTag

The `FormTag` component is a slim wrapper around the builtin `<form />` component.
It does three things:

1. Generates the hidden input for Rails' faux `PUT`, `PATCH`, and `DELETE` requests
2. Generates the hidden input for Rails' `csrf_token` which MUST be include in the document head
3. Generates the hidden input for Rails' `utf8` param to match the convention

### FormFor

The `FormFor` component is a Higher Order Component (HOC) of the `FormTag` component.
It provides the Rails context for generating `input[name]` by using it's own `name` prop.

### FieldsFor

The `FieldsFor` component pushes a name onto the Rails naming context.
That's it.

`FieldsFor` is aliased as `HashFields` and `ArrayFields` for expressing intent.

### Example

Let's build an example form with the `FormFor` component for generating correctly named field inputs.

```jsx
const EditOrderForm = React.createClass({
  getInitialState() {
    return {
      burgers: this.props.burgers,
    }
  },

  handleAddBurger() {
    const newBurger = { variety: "Hamburger", add_fried_egg: false }
    const burgers = [ ...this.state.burgers, newBurger ]
    this.setState({ burgers })
  },

  handleRemoveBurger(burgerToRemove) {
    return () => {
      const burgers = this.state.burgers.map((burger) => (
        burger === burgerToRemove ? { ...burger, destroy: true } : burger
      ))

      this.setState({ burgers })
    }
  },

  render() {
    return (
      <FormFor url="/orders/1" method="put" name="order">
        <HashFields name="customer">
          <Label htmlFor="name">Name</Label>
          <TextField name="name" defaultValue={this.props.customer.name} />

          <Label htmlFor="email">Email</Label>
          <EmailField name="mail" defaultValue={this.props.customer.email} />
        </HashFields>

        <ArrayFields name="burgers">
          {this.state.burgers.map((burger, index) => {
            <HashFields name={index}>
              {burger.id && (
                <HiddenField name="id" value={burger.id} />
              )}

              {burger.destroy ? (
                <DestroyField />
              ) : (
                <div>
                  <Label htmlFor="variety">Variety</Label>
                  <Select name="variety" defaultValue={burger.variety}>
                    <option>Hamburger</option>
                    <option>Cheeseburger</option>
                    <option>Bacon Cheeseburger</option>
                  </Select>

                  <Label htmlFor="add_fried_egg">Add a fried egg?</Label>
                  <CheckBox name="add_fried_egg" defaultChecked={burger.add_fried_egg} />

                  <a onClick={this.handleRemoveBurger(burger)}>Remove from order</a>
                </div>
              )}
            </HashFields>
          })}
        </ArrayFields>

        <a onClick={this.handleAddBurger}>Add a burger</a>

        <Label htmlFor="notes">Notes</Label>
        <TextArea name="notes" defaultValue={this.props.notes} />

        <Submit name="commit" value="Update order" />
      </FormFor>
    )
  }
})
```

The raw HTML output for this form (sanitized for legibility)

```html
<form accept-charset="UTF-8" action="/orders/1" id="order" method="post">
  <input name="_method" readonly type="hidden" value="put">
  <input name="authenticity_token" readonly type="hidden" value="csrf_token_from_head">
  <input name="utf8" readonly type="hidden" value="✓">

  <label for="order[customer][name]">Name</label>
  <input name="order[customer][name]" type="text">

  <label for="order[customer][email]">Email</label>
  <input name="order[customer][mail]" type="email">

  <div>
    <input name="order[burgers][0][id]" type="hidden" value="1">

    <label for="order[burgers][0][variety]">Variety</label>
    <select name="order[burgers][0][variety]">
      <option>
        Hamburger
      </option>
      <option>
        Cheeseburger
      </option>
      <option>
        Bacon Cheeseburger
      </option>
    </select>

    <label for="order[burgers][0][add_fried_egg]">Add a fried egg?</label>
    <input name="order[burgers][0][add_fried_egg]" readonly type="hidden" value="0">
    <input name="order[burgers][0][add_fried_egg]" type="checkbox" value="1">

    <a>Remove from order</a></span>
  </div>

  <div>
    <input name="order[burgers][1][id]" type="hidden" value="2">

    <label for="order[burgers][1][variety]">Variety</label>
    <select name="order[burgers][1][variety]">
      <option>
        Hamburger
      </option>
      <option>
        Cheeseburger
      </option>
      <option>
        Bacon Cheeseburger
      </option>
    </select>

    <label for="order[burgers][1][add_fried_egg]">Add a fried egg?</label>
    <input name="order[burgers][1][add_fried_egg]" readonly type="hidden" value="0">
    <input name="order[burgers][1][add_fried_egg]" type="checkbox" value="1">

    <a>Remove from order</a>
  </div>

  <div>
    <input name="order[burgers][2][id]" type="hidden" value="3">
    <input name="order[burgers][2][_destroy]" type="text" value="1">
  </div>

  <a>Add a burger</a>

  <label for="order[notes]">Notes</label>
  <textarea name="order[notes]"></textarea>

  <input name="order[commit]" type="submit" value="Update order">
</form>
```
