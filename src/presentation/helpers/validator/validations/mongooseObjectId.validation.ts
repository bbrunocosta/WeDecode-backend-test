import { isValidObjectId } from 'mongoose'
import InvalidParamError from '../../../errors/invalidParamError'
import { Validator } from '../validator.protocol'
class MongooseObjectIdValidation implements Validator {
  constructor (private readonly paramName: string) {}
  validate (input: any): Error | undefined {
    if (!isValidObjectId(input[this.paramName])) return new InvalidParamError(input[this.paramName])
  }
}
export default MongooseObjectIdValidation
