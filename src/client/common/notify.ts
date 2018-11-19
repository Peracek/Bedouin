export default {
  success: (msg: string) => {
    alert(`SUCCESS: ${msg}`)
  },
  warn: (msg: string) => {
    alert(`WARN: ${msg}`)
  },
  error: (msg: string) => {
    alert(`ERROR: ${msg}`)
  }
}