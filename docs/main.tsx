/// <reference types="vite/client" />
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import { rackParams, toRuby } from "../support/rack-params.js"
import { examples, type Example } from "./examples/index.js"

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

/**
 * Renders the HTML Rails would have rendered, then mounts the component into
 * its `[data-react-class]` element with its `data-react-props`, as react-rails does.
 */
function RailsRendered({
  html,
  Component,
}: Required<Pick<Example, "Component">> & { html: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [mount, setMount] = useState<{ el: Element; props: object } | null>(
    null
  )

  useLayoutEffect(() => {
    const el = host.current!.querySelector("[data-react-class]")!
    setMount({
      el,
      props: JSON.parse(el.getAttribute("data-react-props") ?? "{}"),
    })
  }, [])

  return (
    <>
      <div ref={host} dangerouslySetInnerHTML={{ __html: html }} />
      {mount && createPortal(<Component {...mount.props} />, mount.el)}
    </>
  )
}

function App() {
  const hash = useHash()
  const slug = hash in examples ? hash : "burger-order"
  const { title, description, Component, railsHtml, files } = examples[slug]

  return (
    <div className="layout">
      <nav>
        <h1>React Rails Form Helpers</h1>
        {Object.entries(examples).map(([key, example]) => (
          <a
            key={key}
            href={`#${key}`}
            aria-current={key === slug ? "page" : undefined}
          >
            {example.title}
          </a>
        ))}
      </nav>
      <main>
        <h2>{title}</h2>
        <p className="lede">{description}</p>
        <LiveParams key={slug}>
          {railsHtml ? (
            <RailsRendered html={railsHtml} Component={Component} />
          ) : (
            <Component />
          )}
        </LiveParams>
        <h3 className="files-heading">Code</h3>
        {files.map((file) => (
          <figure className="file" key={file.path}>
            <figcaption>{file.path}</figcaption>
            <pre>{file.source.trim()}</pre>
          </figure>
        ))}
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
