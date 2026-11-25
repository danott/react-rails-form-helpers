import { act, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { rackParams } from "../support/rack-params.js"

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

/** What Rails would see in `params`. */
export function railsParams(ui: ReactNode) {
  return rackParams(submittedEntries(ui) as [string, string][])
}
