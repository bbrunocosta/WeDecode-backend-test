import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import AddWatchedFilmController from './addWatchedFilm.controller'
import { FakeErrorStub, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'
const fakeHttpRequest = {
  params: {
    id: 'valid Spectator ID'
  },
  body: {
    filmId: 'valid Film ID'
  }
}
describe('AddWatchedFilmController', () => {
  const spectatorRepositoryStub = new SpectatorRepositoryStub()
  const addWatchedFilmController = new AddWatchedFilmController(spectatorRepositoryStub)
  test('Should return 400 if Spectator was not found', async () => {
    const addWatchedFilmSpy = jest.spyOn(spectatorRepositoryStub, 'addWatchedFilm')
    addWatchedFilmSpy.mockImplementationOnce(() => { throw new SpectatorNotFoundError('spectator id') })
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(addWatchedFilmSpy).toBeCalledWith(fakeHttpRequest.params.id, fakeHttpRequest.body.filmId)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new SpectatorNotFoundError('spectator id'))
  })
  test('Should return 204 on success', async () => {
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(204)
    expect(httpResponse.body).toEqual({})
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRepositoryStub, 'addWatchedFilm').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
