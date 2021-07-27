import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import FilmIsAlreadyOnWatchedListError from '../../errors/FilmIsAlreadyOnWatchedListError'
import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { badRequest, conflict, created, serverError } from '../../helpers/httpResponse.helper'
import { Validator } from '../../helpers/validator/validator.protocol'
import { Controller } from '../../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddWatchedFilmController implements Controller {
  constructor (
    private readonly spectatorRepository: SpectatorRepository,
    private readonly filmRepository: FilmRepository,
    private readonly paramsValidationComposite: Validator,
    private readonly bodyValidationComposite: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const hasParamsError = this.paramsValidationComposite.validate(httpRequest.params)
      if (hasParamsError) return badRequest(hasParamsError)
      const hasBodyError = this.bodyValidationComposite.validate(httpRequest.body)
      if (hasBodyError) return badRequest(hasBodyError)

      const { id: spectatorId } = httpRequest.params
      const { filmId } = httpRequest.body

      const filmExists = await this.filmRepository.findOneById(filmId)
      if (!filmExists) return badRequest(new FilmNotFoundError(filmId))

      const spectatorExists = await this.spectatorRepository.findOneById(spectatorId)
      if (!spectatorExists) return badRequest(new SpectatorNotFoundError(spectatorId))

      if (!spectatorExists.whatchedFilms.includes(filmId) && !filmExists.spectators.includes(spectatorId)) {
        const updatedSpectator = await this.spectatorRepository.addWatchedFilm(spectatorId, filmId)
        await this.filmRepository.addSpectator(filmId, spectatorId)
        return created(updatedSpectator)
      }

      return conflict(new FilmIsAlreadyOnWatchedListError())
    } catch (err) {
      if (err instanceof SpectatorNotFoundError) return badRequest(err)

      return serverError(new InternalServerError(err.stack))
    }
  }
}

export default AddWatchedFilmController
