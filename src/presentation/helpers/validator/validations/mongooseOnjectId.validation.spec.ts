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
  test('Should return InvalidParamError isValidObjectId returns false', () => {
    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValueOnce(false)
    const id = 'invalidid'
    const result = mongooseValidation.validate({ id })
    expect(result).toEqual(new InvalidParamError(id))
  })
})
