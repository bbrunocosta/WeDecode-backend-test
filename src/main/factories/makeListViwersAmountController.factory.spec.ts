import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { makeListViwersAmountController } from './makeListViwersAmountController.factory'
import MongooseObjectIdValidation from '../../presentation/helpers/validator/validations/mongooseObjectId.validation'
jest.mock('../../presentation/helpers/validator/validation.composite')
describe('Make List Viwers Amount Controller', () => {
  test('should call validatorComposite with all validations', () => {
    makeListViwersAmountController()
    const validations: Validator[] = [new RequiredFieldsValidation('id'), new MongooseObjectIdValidation('id')]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
