import MongoSpectatorRepositoryAdapter from '../../infra/database/mongoose/adapters/spectatorRepository.adapter'
import AddSpectatorController from '../../presentation/controllers/spectators/addSpectator.controller'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeAddSpectatorController = (): Controller => {
  const mongoSpectatorRepositoryAdapter = new MongoSpectatorRepositoryAdapter()
  const validations: Validator[] = [new RequiredFieldsValidation('name')]
  const validationComposite = new ValidationComposite(validations)
  return new AddSpectatorController(mongoSpectatorRepositoryAdapter, validationComposite)
}
