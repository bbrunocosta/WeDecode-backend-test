import FilmNotFoundError from '../../errors/filmNotFoundError'
import InternalServerError from '../../errors/internalServerError'
import { FakeErrorStub, fakeFilmData, fakeStack, FilmRepositoryStub, ValidationStub } from './filmMocks'
import ListViwersAmountController from './listViwersAmount.controller'
describe('ListFilms', () => {
  const fakeHttpRequest = {
    params: {
      id: 'valid id'
    }
  }
  const filmRepositoryStub = new FilmRepositoryStub()
  const validationStub = new ValidationStub()
  const listfilms = new ListViwersAmountController(filmRepositoryStub, validationStub)
  test('Should return 200 on success', async () => {
    const findOneByIdSpy = jest.spyOn(filmRepositoryStub, 'findOneById')
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(findOneByIdSpy).toHaveBeenCalledWith(fakeHttpRequest.params.id)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual({ spectatorsAmount: fakeFilmData.viewersAmount, spectators: fakeFilmData.spectators })
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
  test('sould call validate with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await listfilms.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.params)
  })
  test('sould return 400 if  validate returns error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any'))
    const httpResponse = await listfilms.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any'))
  })
})
