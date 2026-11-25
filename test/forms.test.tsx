import { createRef } from "react"
import { FormFor, FormTag } from "../src/index.js"
import { railsParams, render } from "./helpers.js"

function csrfMeta(token: string) {
  document.head.innerHTML = `<meta name="csrf-param" content="authenticity_token"><meta name="csrf-token" content="${token}">`
}

describe("FormTag", () => {
  test("POSTs with the CSRF token from the document head", () => {
    csrfMeta("from-head")
    const form = render(<FormTag url="/orders" />).querySelector("form")!

    expect(form.getAttribute("action")).toBe("/orders")
    expect(form.getAttribute("method")).toBe("post")
    expect(railsParams(<FormTag url="/orders" />)).toEqual({
      authenticity_token: "from-head",
    })
  })

  test("fakes PATCH, PUT, and DELETE with _method", () => {
    expect(
      railsParams(<FormTag url="/orders/1" method="patch" csrfToken="t" />)
    ).toEqual({
      _method: "patch",
      authenticity_token: "t",
    })
  })

  test("GET sends no _method and no token", () => {
    csrfMeta("from-head")
    expect(railsParams(<FormTag url="/orders" method="get" />)).toEqual({})
  })

  test("sends utf8 only when asked", () => {
    expect(
      railsParams(<FormTag url="/" csrfToken={null} enforceUtf8 />)
    ).toEqual({
      utf8: "✓",
    })
  })

  test("forwards refs to the <form>", () => {
    const ref = createRef<HTMLFormElement>()
    render(<FormFor url="/" name="order" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLFormElement)
  })
})
