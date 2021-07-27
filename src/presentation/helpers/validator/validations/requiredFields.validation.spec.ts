import MissingParamError from '../../../errors/MissingParamError'
import { RequiredFieldsValidation } from './requiredFields.validation'

describe('Required Fields Validation', () => {
  test('Should return MissingParamError if the param is missing', () => {
    const sut = new RequiredFieldsValidation('email')
    const error = sut.validate({ name: 'any' })
    expect(error).toEqual(new MissingParamError('email'))
  })
})
