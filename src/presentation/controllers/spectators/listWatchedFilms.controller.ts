import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { badRequest, serverError, success } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListWatchedFilmsController {
  constructor (private readonly spectatorRepository: SpectatorRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const spectator = await this.spectatorRepository.findOneById(id)
      if (!spectator) return badRequest(new SpectatorNotFoundError(id))
      return success(spectator.whatchedFilms)
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListWatchedFilmsController
