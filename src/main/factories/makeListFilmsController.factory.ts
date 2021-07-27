import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import ListFilmsController from '../../presentation/controllers/films/listFilms.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeListFilmsController = (): Controller => {
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  return new ListFilmsController(mongooseFilmRepositoryAdapter)
}
