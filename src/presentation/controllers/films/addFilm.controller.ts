import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import FilmTitleAlreadyExistsError from '../../errors/filmTitleAlreadyExistsError'
import InternalServerError from '../../errors/internalServerError'
import { badRequest, conflict, created, serverError } from '../../helpers/httpResponse.helper'
import { Validator } from '../../helpers/validator/validator.protocol'
import { Controller } from '../../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http.protocol'

class AddFilmController implements Controller {
  constructor (
    private readonly filmRepository: FilmRepository,
    private readonly validationComposite: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validationComposite.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { title, author, director } = httpRequest.body

      const filmExists = await this.filmRepository.findOneByTitle(title)

      if (filmExists) return conflict(new FilmTitleAlreadyExistsError(title))

      const newFilm = await this.filmRepository.addFilm({ title, author, director })
      return created(newFilm)
    } catch (err) {
      return serverError(new InternalServerError(err.stack))
    }
  }
}
export default AddFilmController
