import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import { FakeErrorStub, fakeFilmData, fakeStack, FilmRepositoryStub } from './filmMocks'
import ListViwersAmountController from './listViwersAmount.controller'
describe('ListFilms', () => {
  const fakeHttpRequest = {
    params: {
      id: 'valid id'
    }
  }
  const filmRepositoryStub = new FilmRepositoryStub()
  const listfilms = new ListViwersAmountController(filmRepositoryStub)
  test('Should return 200 on success', async () => {
    const findOneByIdSpy = jest.spyOn(filmRepositoryStub, 'findOneById')
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(findOneByIdSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual({ viewersAmount: fakeFilmData.viewersAmount })
  })
  test('Should return 400 if film was not found', async () => {
    jest.spyOn(filmRepositoryStub, 'findOneById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new FilmNotFoundError(fakeHttpRequest.params.id))
  })
  test('Should return 500 if FilmRepository throws', async () => {
    jest.spyOn(filmRepositoryStub, 'findOneById').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
