import InternalServerError from '../../errors/internalServerError'
import ListWatchedFilmsController from './listWatchedFilms.controller'
import { FakeErrorStub, fakeSpectatorData, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'
describe('ListWatchedFilmsController', () => {
  const fakeHttpRequest = {
    params: {
      id: 'valid id'
    }
  }
  const spectatorRepositoryStub = new SpectatorRepositoryStub()
  const listWatchedFilmsController = new ListWatchedFilmsController(spectatorRepositoryStub)
  test('Should call findOneById with correct value', async () => {
    const findOneByIdSpy = jest.spyOn(spectatorRepositoryStub, 'findOneById')
    await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(findOneByIdSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id)
  })
  test('Should return 200 on success', async () => {
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual(fakeSpectatorData.whatchedFilms)
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRepositoryStub, 'findOneById').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await listWatchedFilmsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
