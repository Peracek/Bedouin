const composeAsync = (...functions: ((value: any) => any)[]) => (initialValue?: any) => {
  return functions.reduce(
    (acc, fn) => Promise.resolve(acc).then(fn),
    initialValue
  )
}

export default composeAsync