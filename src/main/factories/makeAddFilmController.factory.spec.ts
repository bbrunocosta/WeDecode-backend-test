import { RequiredFieldsValidation } from '../../presentation/helpers/validator/validations/requiredFields.validation'
import { Validator } from '../../presentation/helpers/validator/validator.protocol'
import { makeAddFilmController } from './makeAddFilmController.factory'
import { ValidationComposite } from '../../presentation/helpers/validator/validation.composite'
jest.mock('../../presentation/helpers/validator/validation.composite')
describe('Make Add Film Controller Factory', () => {
  test('should call validatorComposite with all validations', () => {
    makeAddFilmController()
    const requiredFields = ['title', 'author', 'director']
    const validations: Validator[] = requiredFields.map(field => new RequiredFieldsValidation(field))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
