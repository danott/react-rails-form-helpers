import { useContext, type ComponentProps, type ReactNode } from "react"
import { HiddenFieldTag } from "./tags.js"
import { NamespaceContext } from "./naming.js"

export type FormTagProps = Omit<ComponentProps<"form">, "action" | "method"> & {
  url: string
  method?: "get" | "post" | "put" | "patch" | "delete"
  /**
   * The CSRF token. Read from `<meta name="csrf-token">` when omitted.
   * Pass it explicitly when rendering on the server; pass `null` to leave it out.
   */
  csrfToken?: string | null
  /** Add Rails' legacy `utf8=✓` param. Rails stopped sending it in 6.0. */
  enforceUtf8?: boolean
}

function meta(name: string) {
  if (typeof document === "undefined") return undefined
  return document.querySelector<HTMLMetaElement>(`meta[name='${name}']`)
    ?.content
}

/**
 * A `<form>` with the hidden inputs Rails expects: `_method` for PUT, PATCH,
 * and DELETE, and the CSRF token for anything but GET.
 */
export function FormTag({
  url,
  method = "post",
  csrfToken,
  enforceUtf8 = false,
  children,
  ...props
}: FormTagProps) {
  const isGet = method === "get"
  const token = isGet
    ? null
    : csrfToken === undefined
      ? meta("csrf-token")
      : csrfToken

  return (
    <form
      acceptCharset="UTF-8"
      {...props}
      action={url}
      method={isGet ? "get" : "post"}
    >
      {enforceUtf8 && <HiddenFieldTag name="utf8" value="✓" />}
      {!isGet && method !== "post" && (
        <HiddenFieldTag name="_method" value={method} />
      )}
      {token && (
        <HiddenFieldTag
          name={meta("csrf-param") ?? "authenticity_token"}
          value={token}
          autoComplete="off"
        />
      )}
      {children}
    </form>
  )
}

/** A `FormTag` whose fields are named under `name`: `order[notes]`. */
export function FormFor({ name, ...props }: FormTagProps & { name?: string }) {
  return (
    <NamespaceContext value={name ? [name] : []}>
      <FormTag {...props} />
    </NamespaceContext>
  )
}

export type FieldsForProps = {
  name: string | number
  /**
   * Append `_attributes` for `accepts_nested_attributes_for`:
   * `<FieldsFor name="burgers" nested>` names fields `order[burgers_attributes][...]`.
   */
  nested?: boolean
  children?: ReactNode
}

/** Nest the fields inside under `name`. Use it on its own inside a form Rails rendered. */
export function FieldsFor({ name, nested = false, children }: FieldsForProps) {
  const namespaces = useContext(NamespaceContext)
  const scope = nested ? `${name}_attributes` : String(name)
  return (
    <NamespaceContext value={[...namespaces, scope]}>
      {children}
    </NamespaceContext>
  )
}

/** `FieldsFor`, named for a hash of fields. */
export const HashFields = FieldsFor
/** `FieldsFor`, named for a list of records indexed by position. */
export const ArrayFields = FieldsFor
