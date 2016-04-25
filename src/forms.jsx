import { createClass, PropTypes } from "react"
import { HiddenFieldTag } from "./tags"

export const FormTag = createClass({
  propTypes: {
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf([ "get", "post", "put", "patch", "delete" ]),
    children: PropTypes.node,
  },

  getDefaultProps() {
    return {
      method: "post",
    }
  },

  render() {
    let browserHTTPMethod = "post"
    let fakedHTTPMethod = null

    if (this.props.method === "get") {
      browserHTTPMethod = "get"
    } else if (this.props.method !== "post") {
      fakedHTTPMethod = this.props.method
    }

    return (
      <form accept-charset="UTF-8" action={this.props.url} method={browserHTTPMethod}>
        {fakedHTTPMethod && (
          <HiddenFieldTag name="_method" value={fakedHTTPMethod} />
        )}
        <HiddenFieldTag name="utf8" value="&#x2713;" />
        {this.props.children}
      </form>
    )
  },
})


export const FormFor = createClass({
  propTypes: {
    namespace: PropTypes.string.isRequired,
  },

  childContextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  getChildContext() {
    return {
      railsFormNamespaces: [ this.props.namespace ],
    }
  },

  render() {
    return (
      <FormTag {...this.props}>
        {this.props.children}
      </FormTag>
    )
  },
})

export const FieldsFor = createClass({
  propTypes: {
    namespace: PropTypes.string.isRequired,
    index: PropTypes.oneOf([ PropTypes.string, PropTypes.number ]),
  },

  getDefaultProps() {
    return {
      index: "",
    }
  },

  contextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  childContextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  getChildContext() {
    const { namespace, index } = this.props

    return {
      railsFormNamespaces: [ ...this.context.railsFormNamespaces, namespace, index ],
    }
  },
})
