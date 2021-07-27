import { ValidationComposite } from './validation.composite'
import { Validator } from './validator.protocol'
class ValidationStub implements Validator {
  validate (input: any): Error | undefined {
    return undefined
  }
}
const fakeData = {}
const fakeError = new Error('a fake error')
describe('Validation Composite', () => {
  const validationStub = new ValidationStub()
  const validations: Validator[] = [validationStub]
  const sut = new ValidationComposite(validations)
  test('should return error if validationStub returns error', () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(fakeError)
    const error = sut.validate(fakeData)
    expect(error).toEqual(fakeError)
  })
})
