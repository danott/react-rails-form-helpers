import React from "react"
import PropTypes from "prop-types"

export const nameWithContext = (Lower, prop = "name") => {
  const getDisplayName = component =>
    component.displayName || component.name || "Component"

  const buildInputName = (namespaces, name = "") =>
    [...namespaces, name]
      .map((field, index) => (index === 0 ? field : `[${field}]`))
      .join("")

  const buildInputId = (namespaces, name = "", existingId = null) => {
    if(existingId) return existingId
    return [...namespaces, name].join("_")
  }

  const higher = (props, context) => {
    const replacedProp = buildInputName(
      context.railsFormNamespaces,
      props[prop]
    )
    const additionalProps = (prop === "htmlFor")
      ? {
          [prop]: buildInputId(context.railsFormNamespaces, props[prop])
        }
      : {
          [prop]: replacedProp,
          id: buildInputId(context.railsFormNamespaces, props[prop], props.id)
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
