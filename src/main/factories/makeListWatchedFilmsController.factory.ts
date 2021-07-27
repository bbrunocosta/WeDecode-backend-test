import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import ListWatchedFilmsController from '../../presentation/controllers/spectators/listWatchedFilms.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeListWatchedFilmsController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  return new ListWatchedFilmsController(mongoSpectatorRepositoryAdapter)
}
