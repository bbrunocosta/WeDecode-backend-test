import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { makeListWatchedFilmsController } from './makeListWatchedFilmsController.factory'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
jest.mock('../../presentation/helpers/validator/validation.composite')
describe('Make List Watched Films Controller Factory', () => {
  test('should call validatorComposite with all validations', () => {
    makeListWatchedFilmsController()
    const validations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
