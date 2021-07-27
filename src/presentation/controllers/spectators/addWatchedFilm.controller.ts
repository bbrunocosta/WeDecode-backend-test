import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { badRequest, created, serverError } from '../../helpers/httpResponse.helper'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddWatchedFilmController {
  constructor (
    private readonly spectatorRepository: SpectatorRepository,
    private readonly filmRepository: FilmRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id: spectatorId } = httpRequest.params
      const { filmId } = httpRequest.body

      const filmExists = await this.filmRepository.findOneById(filmId)

      if (!filmExists) return badRequest(new FilmNotFoundError(filmId))

      const updatedSpectator = await this.spectatorRepository.addWatchedFilm(spectatorId, filmId)
      await this.filmRepository.addSpectator(filmId, spectatorId)
      return created(updatedSpectator)
    } catch (err) {
      if (err instanceof SpectatorNotFoundError) return badRequest(err)

      return serverError(new InternalServerError(err.stack))
    }
  }
}

export default AddWatchedFilmController
