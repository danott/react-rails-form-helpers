export const buildInputName = (namespaces, name) => {
  if (!namespaces || namespaces.length === 0) { return name }

  let allTheFields = [ ...namespaces, name ]
  let finalName = allTheFields.unshift()

  while (allTheFields.length > 0) {
    finalName = `${finalName}[${allTheFields.unshift()}]`
  }

  return finalName
}

export const nameWithContext = (Lower, prop = "name") => {
  return (props, context) => {
    const replacedProp = buildInputName(context.railsFormNamespaces, props[prop])
    const replacedProps = Object.assign({}, props, { [prop]: replacedProp })
    return <Lower {...replacedProps} />
  }
}
