import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import ListSpectatorsController from '../../presentation/controllers/spectators/listSpectators.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeListSpectatorsController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  return new ListSpectatorsController(mongoSpectatorRepositoryAdapter)
}
