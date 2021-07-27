import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import ListViwersAmountController from '../../presentation/controllers/films/listViwersAmount.controller'
import { Controller } from '../../presentation/protocols/controller'

export const makeListViwersAmountController = (): Controller => {
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  return new ListViwersAmountController(mongooseFilmRepositoryAdapter)
}
