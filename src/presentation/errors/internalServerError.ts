class InternalServerError extends Error {
  constructor (stack: string) {
    super()
    this.name = 'InternalServerError'
    this.message = 'Oops, something went wrong, try again later.'
    this.stack = stack
  }
}
export default InternalServerError
