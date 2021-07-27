import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import AddWatchedFilmController from '../../presentation/controllers/spectators/addWatchedFilm.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeAddWatchedFilmController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  return new AddWatchedFilmController(mongoSpectatorRepositoryAdapter, mongooseFilmRepositoryAdapter)
}
