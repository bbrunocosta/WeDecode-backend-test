import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { badRequest, serverError, success } from '../../helpers/httpResponse.helper'
import { Validator } from '../../helpers/validator/validator.protocol'
import { Controller } from '../../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListWatchedFilmsController implements Controller {
  constructor (
    private readonly spectatorRepository: SpectatorRepository,
    private readonly validationComposite: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const hasError = this.validationComposite.validate(httpRequest.params)
      if (hasError) return badRequest(hasError)

      const { id } = httpRequest.params

      const spectator = await this.spectatorRepository.findOneById(id)
      if (!spectator) return badRequest(new SpectatorNotFoundError(id))

      return success({
        whatchedFilmsAmount: spectator.whatchedFilms.length,
        whatchedFilms: spectator.whatchedFilms
      })
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListWatchedFilmsController
