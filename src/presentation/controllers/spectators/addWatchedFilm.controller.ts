import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { badRequest, noContent, serverError } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddWatchedFilmController {
  constructor (private readonly spectatorRepository: SpectatorRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { filmId } = httpRequest.body

      await this.spectatorRepository.addWatchedFilm(id, filmId)

      return noContent({})
    } catch (err) {
      if (err instanceof SpectatorNotFoundError) return badRequest(err)

      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default AddWatchedFilmController
