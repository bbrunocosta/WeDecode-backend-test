class FilmIsAlreadyOnWatchedListError extends Error {
  constructor () {
    super()
    this.name = 'FilmIsAlreadyOnWatchedListError'
    this.message = 'This film is already marked as watched'
  }
}
export default FilmIsAlreadyOnWatchedListError
