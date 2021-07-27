import { LogErrorRepository } from '../../data/protocols/logs/logError.repository.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http.protocol'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.status === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
