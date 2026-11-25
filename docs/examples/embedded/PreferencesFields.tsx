import {
  CheckBox,
  FieldsFor,
  HashFields,
  Label,
  Select,
} from "react-rails-form-helpers"

type Preferences = {
  theme: string
  notifications: { email: string; push: string }
}

/** Rendered inside a form Rails already rendered, so there's no FormFor. */
export default function PreferencesFields({
  preferences,
}: {
  preferences: Preferences
}) {
  return (
    <FieldsFor name="account">
      <HashFields name="preferences">
        <div className="field">
          <Label htmlFor="theme">Theme</Label>
          <Select name="theme" defaultValue={preferences.theme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
        <HashFields name="notifications">
          <div className="row">
            <CheckBox
              name="email"
              defaultChecked={preferences.notifications.email === "1"}
            />
            <Label htmlFor="email">Email me</Label>
          </div>
          <div className="row">
            <CheckBox
              name="push"
              defaultChecked={preferences.notifications.push === "1"}
            />
            <Label htmlFor="push">Push notifications</Label>
          </div>
        </HashFields>
      </HashFields>
    </FieldsFor>
  )
}
