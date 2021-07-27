import MissingParamError from '../../../errors/MissingParamError'
import { Validator } from '../validator.protocol'

export class RequiredFieldsValidation implements Validator {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
