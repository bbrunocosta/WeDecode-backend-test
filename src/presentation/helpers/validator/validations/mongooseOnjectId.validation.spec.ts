import MongooseObjectIdValidation from './mongooseObjectId.validation'
import mongoose from 'mongoose'
import InvalidParamError from '../../../errors/invalidParamError'
describe('Mongoose ObjectId Validation', () => {
  const mongooseValidation = new MongooseObjectIdValidation('id')
  test('Should call validate with correct value', () => {
    const isValidSpy = jest.spyOn(mongoose, 'isValidObjectId')
    const id = 'invalidid'
    mongooseValidation.validate({ id })
    expect(isValidSpy).toHaveBeenCalledWith(id)
  })
})
