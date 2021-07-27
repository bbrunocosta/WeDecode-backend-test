import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import AddFilmController from '../../presentation/controllers/films/addFilm.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeAddFilmController = (): Controller => {
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  return new AddFilmController(mongooseFilmRepositoryAdapter)
}
