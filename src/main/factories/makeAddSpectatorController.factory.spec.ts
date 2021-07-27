import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
import { makeAddSpectatorController } from './makeAddSpectatorController.factory'
jest.mock('../../presentation/helpers/validator/validation.composite')
describe('Make Add Spectator Controller factory', () => {
  test('should call validatorComposite with all validations', () => {
    makeAddSpectatorController()
    const requiredFields = ['name']
    const validations: Validator[] = requiredFields.map(field => new RequiredFieldsValidation(field))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
