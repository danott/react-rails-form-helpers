/// <reference types="vite/client" />
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { createRoot } from "react-dom/client"
import { rackParams, toRuby } from "../support/rack-params.js"
import * as BurgerOrder from "./examples/burger-order.js"
import * as Survey from "./examples/survey.js"
import * as Toppings from "./examples/toppings.js"
import * as Embedded from "./examples/embedded.js"

type ExampleModule = {
  title: string
  description: string
  rails: string
  default: () => React.ReactNode
}

const sources = import.meta.glob<string>("./examples/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})

const examples: Record<string, [ExampleModule, string]> = {
  "burger-order": [BurgerOrder, sources["./examples/burger-order.tsx"]],
  survey: [Survey, sources["./examples/survey.tsx"]],
  toppings: [Toppings, sources["./examples/toppings.tsx"]],
  embedded: [Embedded, sources["./examples/embedded.tsx"]],
}

function useHash() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange)
      return () => window.removeEventListener("hashchange", onChange)
    },
    () => window.location.hash.slice(1)
  )
}

/** Shows the params Rails would receive from the form inside, as you edit it. */
function LiveParams({ children }: { children: React.ReactNode }) {
  const demo = useRef<HTMLDivElement>(null)
  const [params, setParams] = useState("")
  const [submitter, setSubmitter] = useState<string | null>(null)

  useEffect(() => {
    const root = demo.current!
    const read = (submitter?: HTMLElement | null) => {
      const form = root.querySelector("form")
      if (!form) return
      const entries = new FormData(form, submitter) as any
      setParams(toRuby(rackParams(entries)))
    }
    const onEdit = () => {
      setSubmitter(null)
      read()
    }
    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault()
      setSubmitter((event.submitter as HTMLInputElement | null)?.value ?? "")
      read(event.submitter)
    }

    const observer = new MutationObserver(onEdit)
    observer.observe(root, { subtree: true, childList: true, attributes: true })
    root.addEventListener("input", onEdit)
    root.addEventListener("change", onEdit)
    root.addEventListener("submit", onSubmit)
    read()
    return () => {
      observer.disconnect()
      root.removeEventListener("input", onEdit)
      root.removeEventListener("change", onEdit)
      root.removeEventListener("submit", onSubmit)
    }
  }, [])

  return (
    <div className="panels">
      <div>
        <h3>Form</h3>
        <div className="demo" ref={demo}>
          {children}
        </div>
      </div>
      <div className="params" data-submitted={submitter ?? undefined}>
        <h3>
          {submitter === null
            ? "params, as you edit"
            : `params, submitted with “${submitter}”`}
        </h3>
        <pre>{params}</pre>
      </div>
    </div>
  )
}

function App() {
  const hash = useHash()
  const slug = hash in examples ? hash : "burger-order"
  const [example, source] = examples[slug]
  const Form = example.default

  return (
    <div className="layout">
      <nav>
        <h1>React Rails Form Helpers</h1>
        {Object.entries(examples).map(([key, [{ title }]]) => (
          <a
            key={key}
            href={`#${key}`}
            aria-current={key === slug ? "page" : undefined}
          >
            {title}
          </a>
        ))}
      </nav>
      <main>
        <h2>{example.title}</h2>
        <p className="lede">{example.description}</p>
        <LiveParams key={slug}>
          <Form />
        </LiveParams>
        <details open>
          <summary>Rails side</summary>
          <pre>{example.rails.trim()}</pre>
        </details>
        <details>
          <summary>React source</summary>
          <pre>{source}</pre>
        </details>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
