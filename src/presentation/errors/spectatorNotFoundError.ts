class SpectatorNotFoundError extends Error {
  constructor (spectator: string) {
    super()
    this.name = 'SpectatorNotFoundError'
    this.message = `"${spectator}" was not found`
  }
}
export default SpectatorNotFoundError
