class SpectatorAlreadyExistsError extends Error {
  constructor (spectator: string) {
    super()
    this.name = 'SpectatorAlreadyExistsError'
    this.message = `"${spectator}" is already registered`
  }
}
export default SpectatorAlreadyExistsError
