class FilmTitleAlreadyExistsError extends Error {
  constructor (filmTitle: string) {
    super()
    this.name = 'FilmTitleAlreadyExistsError'
    this.message = `The title: "${filmTitle}" is already registered`
  }
}
export default FilmTitleAlreadyExistsError
