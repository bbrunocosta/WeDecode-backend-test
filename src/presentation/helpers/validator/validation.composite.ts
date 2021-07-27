import { Validator } from './validator.protocol'

export class ValidationComposite implements Validator {
  constructor (private readonly validations: Validator[]) {}
  validate (input: any): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) return error
    }
  }
}
