import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import { serverError, success } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListFilmsController {
  constructor (private readonly filmRepository: FilmRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const films = await this.filmRepository.getAll()
      return success(films)
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListFilmsController
