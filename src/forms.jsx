import React from "react"
import PropTypes from "prop-types"
import { HiddenFieldTag } from "./tags"
import { whitelistProps } from "./utils"

export class FormTag extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf(["get", "post", "put", "patch", "delete"]),
    csrfToken: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    method: "post",
  }

  render() {
    let browserHTTPMethod = "post"
    let fakedHTTPMethod = null

    if (this.props.method === "get") {
      browserHTTPMethod = "get"
    } else if (this.props.method !== "post") {
      fakedHTTPMethod = this.props.method
    }

    const csrfToken =
      this.props.csrfToken ||
      document.querySelector("head meta[name='csrf-token']").content

    return (
      <form
        {...whitelistProps(this.props, "url", "children", "csrfToken")}
        acceptCharset="UTF-8"
        action={this.props.url}
        method={browserHTTPMethod}
      >
        {fakedHTTPMethod && (
          <HiddenFieldTag name="_method" value={fakedHTTPMethod} />
        )}
        {csrfToken && (
          <HiddenFieldTag name="authenticity_token" value={csrfToken} />
        )}
        <HiddenFieldTag name="utf8" value="&#x2713;" />
        {this.props.children}
      </form>
    )
  }
}

export class FormFor extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    name: null,
  }

  static childContextTypes = {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  }

  getChildContext() {
    return {
      railsFormNamespaces: this.props.name ? [this.props.name] : [],
    }
  }

  render() {
    return <FormTag {...this.props}>{this.props.children}</FormTag>
  }
}

export class FieldsFor extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static contextTypes = {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  }

  static childContextTypes = {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    name: "",
  }

  getChildContext() {
    return {
      railsFormNamespaces: [
        ...(this.context.railsFormNamespaces || []),
        this.props.name,
      ],
    }
  }

  render() {
    return <span>{this.props.children}</span>
  }
}

export const ArrayFields = FieldsFor
export const HashFields = FieldsFor
