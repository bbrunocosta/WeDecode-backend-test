import { Request, Response } from 'express'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const adaptRoute = (controller: Controller) => {
  return (expressRequest: Request, expressResponse: Response) => {
    (async () => {
      const httpRequest: HttpRequest = {
        body: expressRequest.body,
        params: expressRequest.params
      }
      const httpResponse: HttpResponse = await controller.handle(httpRequest)
      expressResponse.status(httpResponse.status).json(httpResponse.body)
    })().catch(console.log)
  }
}
