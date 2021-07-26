import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import FilmTitleAlreadyExistsError from '../../errors/filmTitleAlreadyExistsError'
import { conflict, created } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddFilmController {
  constructor (private readonly filmRepository: FilmRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, author, director } = httpRequest.body

    const filmExists = await this.filmRepository.findOneByTitle(title)

    if (filmExists) return conflict(new FilmTitleAlreadyExistsError(title))

    const newFilm = await this.filmRepository.addFilm({ title, author, director })
    return created(newFilm)
  }
}
export default AddFilmController
