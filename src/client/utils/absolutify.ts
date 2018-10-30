
const absolutify = (relativeURL: string, protocol?: string) => {
  const { host } = location
  protocol = protocol || location.protocol
  const url = new URL(relativeURL, `${protocol}//${host}`)
  return url.href
}

export default absolutify