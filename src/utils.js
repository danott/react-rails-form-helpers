import React, { PropTypes } from "react"


export const nameWithContext = (Lower, prop = "name") => {
  const getDisplayName = (Lower) => ((Lower.displayName || Lower.name || "Component").replace(/Tag$/, ""))

  const buildInputName = (namespaces, name = "") => (
    [ ...namespaces, name ].map((field, index) => ( index === 0 ? field : `[${field}]` )).join("")
  )

  const higher = (props, context) => {
    const replacedProp = buildInputName(context.railsFormNamespaces, props[prop])
    const replacedProps = Object.assign({}, props, { [prop]: replacedProp })
    return <Lower {...replacedProps} />
  }

  higher.displayName = getDisplayName(Lower)
  higher.contextTypes = { railsFormNamespaces: PropTypes.arrayOf(PropTypes.string) }

  return higher
}

export const whitelistProps = (props, ...omit) => {
  const alwaysOmit = [ "key", "ref", ...omit ]
  const cloned = { ...props }
  alwaysOmit.forEach((key) => delete cloned[key])
  return cloned
}
