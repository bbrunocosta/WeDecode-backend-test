class MissingParamError extends Error {
  constructor (paramName: string) {
    super()
    this.name = 'MissingParamError'
    this.message = `The param ${paramName} is missing`
  }
}
export default MissingParamError
