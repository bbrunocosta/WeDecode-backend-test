import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { makeAddWatchedFilmController } from './makeAddWatchedFilmController.factory'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
jest.mock('../../presentation/helpers/validator/validation.composite')
describe('Make Add Watched Film Controller Factory', () => {
  test('should call validatorComposite with all validations', () => {
    makeAddWatchedFilmController()
    const paramsValidations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
    const bodyValidations: Validator[] = [new RequiredFieldsValidation('filmId'), new MongooseObjectIdValidation('filmId')]
    expect(ValidationComposite).toHaveBeenCalledWith(paramsValidations)
    expect(ValidationComposite).toHaveBeenCalledWith(bodyValidations)
  })
})
