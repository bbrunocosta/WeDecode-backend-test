import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import { badRequest, serverError, success } from '../../helpers/httpResponse.helper'
import { Validator } from '../../helpers/validator/validator.protocol'
import { Controller } from '../../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListViwersAmountController implements Controller {
  constructor (
    private readonly filmRepository: FilmRepository,
    private readonly validationComposite: Validator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const hasError = this.validationComposite.validate(httpRequest.params)
      if (hasError) return badRequest(hasError)

      const { id } = httpRequest.params
      const film = await this.filmRepository.findOneById(id)
      if (!film) return badRequest(new FilmNotFoundError(id))
      return success({
        spectatorsAmount: film.spectators.length,
        spectators: film.spectators
      })
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListViwersAmountController
