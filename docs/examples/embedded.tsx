import {
  CheckBox,
  FieldsFor,
  HashFields,
  Label,
  Select,
} from "react-rails-form-helpers"

export const title = "Inside a Rails form"
export const description =
  "When Rails renders the form, React can render just part of it: FieldsFor works without FormFor. Here it fills a hash stored in a JSON column. That's a plain hash, not an association, so there is no nested prop and no _attributes."
export const rails = `
<%= form_with model: @account do |f| %>
  <%= f.text_field :name %>
  <%= react_component "PreferencesFields", preferences: @account.preferences %>
  <%= f.submit %>
<% end %>

class Account < ApplicationRecord
  store_accessor :preferences, :theme
end

params.require(:account).permit(
  :name,
  preferences: [:theme, notifications: [:email, :push]]
)
`

/** The part React renders. */
function PreferencesFields() {
  return (
    <FieldsFor name="account">
      <HashFields name="preferences">
        <div className="field">
          <Label htmlFor="theme">Theme</Label>
          <Select name="theme" defaultValue="dark">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
        <HashFields name="notifications">
          <div className="row">
            <CheckBox name="email" defaultChecked />
            <Label htmlFor="email">Email me</Label>
          </div>
          <div className="row">
            <CheckBox name="push" />
            <Label htmlFor="push">Push notifications</Label>
          </div>
        </HashFields>
      </HashFields>
    </FieldsFor>
  )
}

/** Stands in for the form Rails rendered around it. */
export default function Embedded() {
  return (
    <form action="/accounts/1" method="post">
      <input type="hidden" name="_method" value="patch" />
      <input type="hidden" name="authenticity_token" value="token" />
      <div className="field">
        <label htmlFor="account_name">Name</label>
        <input id="account_name" name="account[name]" defaultValue="Jude" />
      </div>

      <PreferencesFields />

      <input type="submit" name="commit" value="Update Account" />
    </form>
  )
}
