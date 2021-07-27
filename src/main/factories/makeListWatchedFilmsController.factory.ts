import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import ListWatchedFilmsController from '../../presentation/controllers/spectators/listWatchedFilms.controller'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeListWatchedFilmsController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  const validations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
  const validationComposite = new ValidationComposite(validations)
  return new ListWatchedFilmsController(mongoSpectatorRepositoryAdapter, validationComposite)
}
