import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import { badRequest, serverError, success } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListViwersAmountController {
  constructor (private readonly filmRepository: FilmRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const film = await this.filmRepository.findOneById(id)
      if (!film) return badRequest(new FilmNotFoundError(id))
      return success({ viewersAmount: film.viewersAmount })
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListViwersAmountController
