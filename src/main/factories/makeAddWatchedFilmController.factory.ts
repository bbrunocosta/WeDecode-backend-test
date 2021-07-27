import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import AddWatchedFilmController from '../../presentation/controllers/spectators/addWatchedFilm.controller'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeAddWatchedFilmController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  const bodyValidations: Validator[] = [new RequiredFieldsValidation('filmId'), new MongooseObjectIdValidation('filmId')]
  const paramsValidations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
  const bodyValidationComposite = new ValidationComposite(bodyValidations)
  const paramsValidationComposite = new ValidationComposite(paramsValidations)
  return new AddWatchedFilmController(mongoSpectatorRepositoryAdapter, mongooseFilmRepositoryAdapter, paramsValidationComposite, bodyValidationComposite)
}
