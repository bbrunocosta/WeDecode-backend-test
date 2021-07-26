class FilmNotFoundError extends Error {
  constructor (spectator: string) {
    super()
    this.name = 'FilmNotFoundError'
    this.message = `"${spectator}" was not found`
  }
}
export default FilmNotFoundError
