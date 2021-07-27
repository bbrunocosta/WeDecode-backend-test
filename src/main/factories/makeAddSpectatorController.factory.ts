import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import AddSpectatorController from '../../presentation/controllers/spectators/addSpectator.controller'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeAddSpectatorController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  return new AddSpectatorController(mongoSpectatorRepositoryAdapter)
}
