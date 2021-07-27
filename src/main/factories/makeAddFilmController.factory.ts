import MongooseFilmRepositoryAdapter from '../../infra/database/mongoose/adapters/filmRepository.adapter'
import AddFilmController from '../../presentation/controllers/films/addFilm.controller'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { Controller } from '../../presentation/protocols/controller.protocol'

export const makeAddFilmController = (): Controller => {
  const mongooseFilmRepositoryAdapter = new MongooseFilmRepositoryAdapter()
  const requiredParams = ['title', 'author', 'director']
  const validations: Validator[] = requiredParams.map(param => new RequiredFieldsValidation(param))
  const validationComposite = new ValidationComposite(validations)
  return new AddFilmController(mongooseFilmRepositoryAdapter, validationComposite)
}
