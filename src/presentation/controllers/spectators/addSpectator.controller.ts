import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import SpectatorAlreadyExistsError from '../../errors/spectatorAlreadyExists'
import { conflict, created, serverError } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddSpectatorController {
  constructor (private readonly spectatorRepository: SpectatorRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name } = httpRequest.body

      const spectatorExists = await this.spectatorRepository.findOneByName(name)

      if (spectatorExists) return conflict(new SpectatorAlreadyExistsError(name))

      const newSpectator = await this.spectatorRepository.addSpectator({ name })
      return created(newSpectator)
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default AddSpectatorController
