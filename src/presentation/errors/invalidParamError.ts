class InvalidParamError extends Error {
  constructor (paramName: string) {
    super()
    this.name = 'InvalidParamError'
    this.message = `The param "${paramName}" is invalid`
  }
}
export default InvalidParamError
