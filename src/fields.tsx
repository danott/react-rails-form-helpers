import type { ComponentProps, ComponentType } from "react"
import * as Tags from "./tags.js"
import { sanitizedValue, useFieldName } from "./naming.js"

type FieldProps<P> = Omit<P, "name"> & { name: string }

/** Wrap a tag so its `name` and `id` follow the surrounding form's naming. */
function field<P extends { name?: string; id?: string }>(
  Tag: ComponentType<P>,
  displayName: string
) {
  const Field = (props: FieldProps<P>) => {
    const field = useFieldName(props.name)
    return <Tag {...(props as P)} name={field.name} id={props.id ?? field.id} />
  }
  Field.displayName = displayName
  return Field
}

export const CheckBox = field(Tags.CheckBoxTag, "CheckBox")
export const ColorField = field(Tags.ColorFieldTag, "ColorField")
export const DateField = field(Tags.DateFieldTag, "DateField")
export const DatetimeField = field(Tags.DatetimeFieldTag, "DatetimeField")
export const DatetimeLocalField = field(
  Tags.DatetimeLocalFieldTag,
  "DatetimeLocalField"
)
export const EmailField = field(Tags.EmailFieldTag, "EmailField")
export const HiddenField = field(Tags.HiddenFieldTag, "HiddenField")
export const MonthField = field(Tags.MonthFieldTag, "MonthField")
export const NumberField = field(Tags.NumberFieldTag, "NumberField")
export const PasswordField = field(Tags.PasswordFieldTag, "PasswordField")
export const RangeField = field(Tags.RangeFieldTag, "RangeField")
export const SearchField = field(Tags.SearchFieldTag, "SearchField")
export const Select = field(Tags.SelectTag, "Select")
export const TelephoneField = field(Tags.TelephoneFieldTag, "TelephoneField")
export const TextArea = field(Tags.TextAreaTag, "TextArea")
export const TextField = field(Tags.TextFieldTag, "TextField")
export const TimeField = field(Tags.TimeFieldTag, "TimeField")
export const UrlField = field(Tags.UrlFieldTag, "UrlField")
export const WeekField = field(Tags.WeekFieldTag, "WeekField")

/** Rails' `f.submit` is not scoped to the form's name: it submits `commit`. */
export const Submit = Tags.SubmitTag

/** A radio button whose id includes its value, like Rails' `order_size_large`. */
export const Radio = (props: FieldProps<Tags.InputTagProps>) => {
  const field = useFieldName(props.name)
  const id = props.id ?? `${field.id}_${sanitizedValue(props.value)}`
  return <Tags.RadioTag {...props} name={field.name} id={id} />
}

/**
 * A label pointing at a field by its name: `<Label htmlFor="email" />`.
 * Pass `value` to point at one radio button.
 */
export const Label = ({
  htmlFor,
  value,
  ...props
}: Omit<ComponentProps<"label">, "htmlFor"> & {
  htmlFor: string
  value?: string | number
}) => {
  const { id } = useFieldName(htmlFor)
  const target = value === undefined ? id : `${id}_${sanitizedValue(value)}`
  return <Tags.LabelTag {...props} htmlFor={target} />
}

/** Marks a nested record for removal, for `accepts_nested_attributes_for ... allow_destroy: true`. */
export const DestroyField = () => <HiddenField name="_destroy" value="1" />
