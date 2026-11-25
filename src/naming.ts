import { createContext, useContext } from "react"

/** The stack of names that fields are nested under, e.g. ["order", "burgers_attributes", "0"]. */
export const NamespaceContext = createContext<readonly string[]>([])

/**
 * Build the `name` attribute Rails expects: `order[customer_attributes][name]`.
 * A trailing `[]` is kept at the end, so `tag_ids[]` becomes `order[tag_ids][]`.
 */
export function railsName(namespaces: readonly string[], name: string) {
  const multiple = name.endsWith("[]")
  const [first, ...rest] = [...namespaces, multiple ? name.slice(0, -2) : name]
  return (
    first + rest.map((part) => `[${part}]`).join("") + (multiple ? "[]" : "")
  )
}

/** Build the `id` attribute Rails generates: `order_customer_attributes_name`. */
export function railsId(namespaces: readonly string[], name: string) {
  return [...namespaces, name.replace(/\[\]$/, "")].join("_")
}

/** Rails' `sanitized_value`, used to give each radio button its own id. */
export function sanitizedValue(value: unknown) {
  return String(value)
    .replace(/[\s.]/g, "_")
    .replace(/[^-\w]/g, "")
    .toLowerCase()
}

/**
 * The `name` and `id` for a field within the current `FormFor`/`FieldsFor`.
 * Use it to build your own Rails-aware inputs.
 */
export function useFieldName(name: string) {
  const namespaces = useContext(NamespaceContext)
  return { name: railsName(namespaces, name), id: railsId(namespaces, name) }
}
