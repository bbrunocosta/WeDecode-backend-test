import InternalServerError from '../../errors/internalServerError'
import ListFilmsController from './listFilms.controller'
import { FakeErrorStub, fakeFilmData, fakeHttpRequest, fakeStack, FilmRepositoryStub } from './films.stubs.fakedata'
describe('ListFilms', () => {
  const filmRepositoryStub = new FilmRepositoryStub()
  const listfilms = new ListFilmsController(filmRepositoryStub)
  test('Should return 200 on success', async () => {
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual([fakeFilmData])
  })
  test('Should return 500 if FilmRepository throws', async () => {
    jest.spyOn(filmRepositoryStub, 'getAll').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
