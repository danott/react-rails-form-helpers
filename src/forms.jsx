import React, { PropTypes } from "react"
import { HiddenFieldTag } from "./tags"
import { whitelistProps } from "./utils"

export const FormTag = React.createClass({
  propTypes: {
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf([ "get", "post", "put", "patch", "delete" ]),
    csrfToken: PropTypes.string,
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

    const csrfToken = this.props.csrfToken ||
      document.querySelector("head meta[name='csrf-token']")

    return (
      <form
        {...whitelistProps(this.props, "url", "children", "csrfToken")}
        acceptCharset="UTF-8"
        action={this.props.url}
        method={browserHTTPMethod}
        >
        {fakedHTTPMethod && (
          <HiddenFieldTag
            name="_method"
            value={fakedHTTPMethod}
            />
        )}
        {csrfToken && (
          <HiddenFieldTag
            name="authenticity_token"
            value={csrfToken.content}
            />
        )}
        <HiddenFieldTag
          name="utf8"
          value="&#x2713;"
          />
        {this.props.children}
      </form>
    )
  },
})


export const FormFor = React.createClass({
  propTypes: {
    name: PropTypes.string,
  },

  getDefaultProps() {
    return {
      name: null,
    }
  },

  childContextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  getChildContext() {
    return {
      railsFormNamespaces: this.props.name ? [ this.props.name ] : [],
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

export const FieldsFor = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
  },

  contextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  childContextTypes: {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  },

  getDefaultProps() {
    return {
      name: "",
    }
  },

  getChildContext() {
    return {
      railsFormNamespaces: [
        ...this.context.railsFormNamespaces,
        this.props.name,
      ],
    }
  },

  render() {
    return <span>{this.props.children}</span>
  },
})

export const ArrayFields = FieldsFor
export const HashFields = FieldsFor
