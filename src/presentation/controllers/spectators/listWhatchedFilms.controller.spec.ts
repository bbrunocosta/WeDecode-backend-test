import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { ValidationStub } from '../films/filmMocks'
import ListWatchedFilmsController from './listWatchedFilms.controller'
import { FakeErrorStub, fakeSpectatorData, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'
describe('ListWatchedFilmsController', () => {
  const fakeHttpRequest = {
    params: {
      id: 'valid id'
    }
  }
  const spectatorRepositoryStub = new SpectatorRepositoryStub()
  const validationStub = new ValidationStub()

  const listWatchedFilmsController = new ListWatchedFilmsController(spectatorRepositoryStub, validationStub)
  test('Should call findOneById with correct value', async () => {
    const findOneByIdSpy = jest.spyOn(spectatorRepositoryStub, 'findOneById')
    await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(findOneByIdSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id)
  })
  test('Should return 200 on success', async () => {
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual({
      whatchedFilmsAmount: fakeSpectatorData.whatchedFilms.length,
      whatchedFilms: fakeSpectatorData.whatchedFilms
    })
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRepositoryStub, 'findOneById').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
  test('should call validate with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.params)
  })
  test('should return 400 if  validate returns error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any'))
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any'))
  })
  test('should call findOneById with correct values', async () => {
    const findOneByIdSpy = jest.spyOn(spectatorRepositoryStub, 'findOneById')
    await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(findOneByIdSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id)
  })
  test('should return 400 if spectator not exists on database', async () => {
    jest.spyOn(spectatorRepositoryStub, 'findOneById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toEqual(400)
    expect(httpResponse.body).toEqual(new SpectatorNotFoundError(fakeHttpRequest.params.id))
  })
})
