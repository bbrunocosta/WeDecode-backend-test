import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import ListViwersAmountController from '../../presentation/controllers/films/listViwersAmount.controller'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeListViwersAmountController = (): Controller => {
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  const validations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
  const validationComposite = new ValidationComposite(validations)
  return new ListViwersAmountController(mongooseFilmRepositoryAdapter, validationComposite)
}
