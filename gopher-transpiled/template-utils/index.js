const gopherUtils = require('./gopherUtils')

exports.parseConfig = (raw) => {
  const [ parsed, error ] = gopherUtils.parseConfig(raw)
  if(error) {
    throw new Error('Error while parsing config file')
  }
  return parsed.Variables
}

exports.renderTemplate = (templateSpec, params) => {
  try {
    const [rendered, err] = gopherUtils.renderTemplate(templateSpec, params)
    if(err) {
      throw err
    }
    return rendered
  } catch(error) {
    throw new Error('Error while rendering template')
  }
}