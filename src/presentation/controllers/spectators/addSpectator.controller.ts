import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import InternalServerError from '../../errors/internalServerError'
import SpectatorAlreadyExistsError from '../../errors/spectatorAlreadyExists'
import { badRequest, conflict, created, serverError } from '../../helpers/httpResponse.helper'
import { Validator } from '../../helpers/validator/validator.protocol'
import { Controller } from '../../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddSpectatorController implements Controller {
  constructor (
    private readonly spectatorRepository: SpectatorRepository,
    private readonly validationComposite: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const hasError = this.validationComposite.validate(httpRequest.body)
      if (hasError) return badRequest(hasError)
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
