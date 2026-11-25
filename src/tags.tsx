import type { ComponentProps } from "react"

export type InputTagProps = Omit<ComponentProps<"input">, "type">

function inputTag(type: string, displayName: string) {
  const Tag = (props: InputTagProps) => <input type={type} {...props} />
  Tag.displayName = displayName
  return Tag
}

export const ColorFieldTag = inputTag("color", "ColorFieldTag")
export const DateFieldTag = inputTag("date", "DateFieldTag")
export const DatetimeFieldTag = inputTag("datetime-local", "DatetimeFieldTag")
export const DatetimeLocalFieldTag = inputTag(
  "datetime-local",
  "DatetimeLocalFieldTag"
)
export const EmailFieldTag = inputTag("email", "EmailFieldTag")
export const HiddenFieldTag = inputTag("hidden", "HiddenFieldTag")
export const MonthFieldTag = inputTag("month", "MonthFieldTag")
export const NumberFieldTag = inputTag("number", "NumberFieldTag")
export const PasswordFieldTag = inputTag("password", "PasswordFieldTag")
export const RadioTag = inputTag("radio", "RadioTag")
export const RangeFieldTag = inputTag("range", "RangeFieldTag")
export const SearchFieldTag = inputTag("search", "SearchFieldTag")
export const TelephoneFieldTag = inputTag("tel", "TelephoneFieldTag")
export const TextFieldTag = inputTag("text", "TextFieldTag")
export const TimeFieldTag = inputTag("time", "TimeFieldTag")
export const UrlFieldTag = inputTag("url", "UrlFieldTag")
export const WeekFieldTag = inputTag("week", "WeekFieldTag")

/** Rails' `submit_tag`: named `commit` unless you say otherwise. */
export const SubmitTag = (props: InputTagProps) => (
  <input type="submit" name="commit" {...props} />
)

export const LabelTag = (props: ComponentProps<"label">) => <label {...props} />
export const SelectTag = (props: ComponentProps<"select">) => (
  <select {...props} />
)
export const TextAreaTag = (props: ComponentProps<"textarea">) => (
  <textarea {...props} />
)

export type CheckBoxTagProps = InputTagProps & {
  /** Submitted when checked. Defaults to "1", like Rails. */
  checkedValue?: string | number
  /** Submitted when unchecked. Defaults to "0", like Rails. */
  uncheckedValue?: string | number
  /** Render the hidden input that submits `uncheckedValue`. Defaults to true. */
  includeHidden?: boolean
}

/**
 * A checkbox preceded by a hidden input, like Rails' `check_box`, so an
 * unchecked box still submits a value. The hidden input shares the box's
 * `disabled` and `form`, so a disabled box submits nothing at all.
 */
export const CheckBoxTag = ({
  checkedValue = "1",
  uncheckedValue = "0",
  includeHidden = true,
  ...props
}: CheckBoxTagProps) => (
  <>
    {includeHidden && (
      <input
        type="hidden"
        name={props.name}
        value={uncheckedValue}
        disabled={props.disabled}
        form={props.form}
        autoComplete="off"
      />
    )}
    <input type="checkbox" value={checkedValue} {...props} />
  </>
)
