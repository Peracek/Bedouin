const re = /\[\[ (\S*?) ]]/g

export const parseTemplate = template => {
  const map = new Map()
  let match
  while(!!(match = re.exec(template))) {
    // TODO: check for keywords (not starting with '.' and mark them somehow)
    const lastIndex = re.lastIndex
    const startIndex = lastIndex - (match[0].length)
    const variable = match[1]
    const prevVals = map.get(variable) || []
    map.set(variable, [...prevVals, startIndex])
  }

  const arr = Array.from(map.entries())
  const res = arr.reduce((acc, [key, startIndices]) => {
    acc[key] = {
      length: key.length + 6,
      startIndices
    }
    return acc
  }, {})

  return res
}