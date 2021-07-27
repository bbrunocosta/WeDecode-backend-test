import FilmIsAlreadyOnWatchedListError from '../../errors/FilmIsAlreadyOnWatchedListError'
import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import SpectatorNotFoundError from '../../errors/spectatorNotFoundError'
import { FilmRepositoryStub, ValidationStub } from '../films/filmMocks'
import AddWatchedFilmController from './addWatchedFilm.controller'
import { FakeErrorStub, fakeSpectatorData, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'
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
  const filmRepositoryStub = new FilmRepositoryStub()
  const bodyValidationStub = new ValidationStub()
  const paramValidationStub = new ValidationStub()
  const addWatchedFilmController = new AddWatchedFilmController(spectatorRepositoryStub, filmRepositoryStub, paramValidationStub, bodyValidationStub)
  test('Should return 400 if Spectator was not found', async () => {
    const addWatchedFilmSpy = jest.spyOn(spectatorRepositoryStub, 'addWatchedFilm')
    addWatchedFilmSpy.mockImplementationOnce(() => { throw new SpectatorNotFoundError('spectator id') })
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(addWatchedFilmSpy).toBeCalledWith(fakeHttpRequest.params.id, fakeHttpRequest.body.filmId)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new SpectatorNotFoundError('spectator id'))
  })
  test('Should return 400 if film was not found', async () => {
    jest.spyOn(filmRepositoryStub, 'findOneById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new FilmNotFoundError(fakeHttpRequest.body.filmId))
  })
  test('Should call addWatchedFilm and addSpectator with correct values', async () => {
    const addWatchedFilmSpy = jest.spyOn(spectatorRepositoryStub, 'addWatchedFilm')
    const addSpectatorSpy = jest.spyOn(filmRepositoryStub, 'addSpectator')
    await addWatchedFilmController.handle(fakeHttpRequest)
    expect(addWatchedFilmSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id, fakeHttpRequest.body.filmId)
    expect(addSpectatorSpy).toHaveBeenCalledWith(fakeHttpRequest.body.filmId, fakeHttpRequest.params.id)
  })
  test('Should return 201 on success', async () => {
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'a valid id',
      name: 'a valid name',
      whatchedFilms: [fakeHttpRequest.body.filmId],
      'created-at': 'valid timestamp'
    })
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRepositoryStub, 'addWatchedFilm').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await addWatchedFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
  test('should call validate with correct values', async () => {
    const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
    await addWatchedFilmController.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.body)
  })
})
