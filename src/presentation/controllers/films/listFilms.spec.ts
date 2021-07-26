import ListFilmsController from './listFilms.controller'
import { fakeFilmData, fakeHttpRequest, FilmRepositoryStub } from './filmMocks'
describe('ListFilms', () => {
  const filmRepositoryStub = new FilmRepositoryStub()
  const listfilms = new ListFilmsController(filmRepositoryStub)
  test('Should return 200 on success', async () => {
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual([fakeFilmData])
  })
})
