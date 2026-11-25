import { act, type ReactNode } from "react"
import { createRoot } from "react-dom/client"

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

afterEach(() => {
  document.body.innerHTML = ""
  document.head.innerHTML = ""
})

export function render(ui: ReactNode) {
  const container = document.createElement("div")
  document.body.append(container)
  act(() => createRoot(container).render(ui))
  return container
}

/** What the browser would submit, in order. */
export function submittedEntries(ui: ReactNode) {
  const form = render(ui).querySelector("form")!
  return [...new FormData(form)].map(([key, value]) => [key, String(value)])
}

type Params = { [key: string]: string | string[] | Params }

/**
 * What Rails would see in `params`, decoded from the submitted form the way
 * Rack does: brackets nest hashes, a trailing `[]` collects an array, and a
 * later value for the same name replaces an earlier one.
 */
export function railsParams(ui: ReactNode): Params {
  const params: Params = {}
  for (const [key, value] of submittedEntries(ui)) {
    const keys = key
      .match(/^[^[]+|\[[^\]]*\]/g)!
      .map((k) => k.replace(/^\[|\]$/g, ""))
    const last = keys.pop()!
    let node: any = params
    keys.forEach((k, i) => {
      node = node[k] ??= keys[i + 1] === undefined && last === "" ? [] : {}
    })
    if (last === "") node.push(value)
    else node[last] = value
  }
  return params
}
