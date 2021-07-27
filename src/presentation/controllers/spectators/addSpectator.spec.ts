import InternalServerError from '../../errors/internalServerError'
import SpectatorAlreadyExistsError from '../../errors/spectatorAlreadyExists'
import { ValidationStub } from '../films/filmMocks'
import AddSpectatorController from './addSpectator.controller'
import { FakeErrorStub, fakeSpectatorData, fakeHttpRequest, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'

describe('AddSpectator', () => {
  const spectatorRespoitoryStub = new SpectatorRepositoryStub()
  const validationStub = new ValidationStub()
  const addSpectatorController = new AddSpectatorController(spectatorRespoitoryStub, validationStub)
  test('Should return 409 if Spectator already exists', async () => {
    const findOneByNameSpy = jest.spyOn(spectatorRespoitoryStub, 'findOneByName')
    findOneByNameSpy.mockReturnValueOnce(Promise.resolve(fakeSpectatorData))
    const httpResponse = await addSpectatorController.handle(fakeHttpRequest)
    expect(findOneByNameSpy).toBeCalledWith(fakeHttpRequest.body.name)
    expect(httpResponse.status).toBe(409)
    expect(httpResponse.body).toEqual(new SpectatorAlreadyExistsError(fakeHttpRequest.body.name))
  })
  test('Should return 201 on success', async () => {
    const addSpectatorSpy = jest.spyOn(spectatorRespoitoryStub, 'addSpectator')
    const httpResponse = await addSpectatorController.handle(fakeHttpRequest)
    expect(addSpectatorSpy).toBeCalledWith(fakeHttpRequest.body)
    expect(httpResponse.status).toBe(201)
    expect(httpResponse.body).toEqual(fakeSpectatorData)
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRespoitoryStub, 'addSpectator').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await addSpectatorController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
  test('sould call validate with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await addSpectatorController.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.body)
  })
  test('sould return 400 if  validate returns error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any'))
    const httpResponse = await addSpectatorController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any'))
  })
})
