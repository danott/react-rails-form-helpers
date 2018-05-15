import React from "react"
import PropTypes from "prop-types"

export const nameWithContext = (Lower, prop = "name", isInput = true) => {
  const getDisplayName = component =>
    component.displayName || component.name || "Component"

  const buildInputName = (namespaces, name = "") =>
    [...namespaces, name]
      .map((field, index) => (index === 0 ? field : `[${field}]`))
      .join("")

  const buildInputId = (namespaces, name = "") =>
    [...namespaces, name].join("_")

  const higher = (props, context) => {
    const replacedProp = buildInputName(
      context.railsFormNamespaces,
      props[prop]
    )
    const inputId = buildInputId(context.railsFormNamespaces, props[prop])
    const additionalProps = isInput
      ? {
          [prop]: replacedProp,
          id: buildInputId(context.railsFormNamespaces, props[prop])
        }
      : {
          [prop]: buildInputId(context.railsFormNamespaces, props[prop])
        }
    const replacedProps = Object.assign({}, props, additionalProps)
    return <Lower {...replacedProps} />
  }

  higher.displayName = getDisplayName(Lower).replace(/Tag$/, "")
  higher.contextTypes = {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  }

  return higher
}

export const whitelistProps = (props, ...omit) => {
  const alwaysOmit = ["key", "ref", ...omit]
  const cloned = { ...props }
  alwaysOmit.forEach(key => delete cloned[key])
  return cloned
}
