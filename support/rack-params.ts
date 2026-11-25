export type Params = { [key: string]: string | string[] | Params }

/**
 * Decode submitted form entries the way Rack does for Rails' `params`:
 * brackets nest hashes, a trailing `[]` collects an array, and a later value
 * for the same name replaces an earlier one.
 */
export function rackParams(entries: Iterable<[string, unknown]>): Params {
  const params: Params = {}
  for (const [key, value] of entries) {
    const keys = key
      .match(/^[^[]+|\[[^\]]*\]/g)!
      .map((k) => k.replace(/^\[|\]$/g, ""))
    const last = keys.pop()!
    let node: any = params
    keys.forEach((k, i) => {
      node = node[k] ??= keys[i + 1] === undefined && last === "" ? [] : {}
    })
    if (last === "") node.push(String(value))
    else node[last] = String(value)
  }
  return params
}

/** Print params the way `params.to_unsafe_h` looks in a Rails console. */
export function toRuby(value: Params | string | string[], indent = ""): string {
  if (typeof value === "string") return JSON.stringify(value)
  const inner = indent + "  "
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    return `[\n${value.map((v) => inner + toRuby(v, inner)).join(",\n")}\n${indent}]`
  }
  const keys = Object.keys(value)
  if (keys.length === 0) return "{}"
  const lines = keys.map(
    (k) => `${inner}${JSON.stringify(k)} => ${toRuby(value[k], inner)}`
  )
  return `{\n${lines.join(",\n")}\n${indent}}`
}
