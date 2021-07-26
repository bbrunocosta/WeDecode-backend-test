import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.prototol'
import InternalServerError from '../../errors/internalServerError'
import { serverError, success } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class ListSpectatorsController {
  constructor (private readonly spectatorRepository: SpectatorRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const spectators = await this.spectatorRepository.getAll()
      return success(spectators)
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default ListSpectatorsController