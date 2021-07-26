import FilmTitleAlreadyExistsError from '../../errors/filmTitleAlreadyExistsError'
import InternalServerError from '../../errors/internalServerError'
import AddFilmController from './addFilm.controller'
import { FakeErrorStub, fakeFilmData, fakeHttpRequest, fakeStack, FilmRepositoryStub } from './filmMocks'

describe('AddFilm', () => {
  const filmRespoitoryStub = new FilmRepositoryStub()
  const addFilmController = new AddFilmController(filmRespoitoryStub)
  test('Should return 409 if film title already exists', async () => {
    const findOneByTitleSpy = jest.spyOn(filmRespoitoryStub, 'findOneByTitle')
    findOneByTitleSpy.mockReturnValueOnce(Promise.resolve(fakeFilmData))
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(findOneByTitleSpy).toBeCalledWith(fakeHttpRequest.body.title)
    expect(httpResponse.status).toBe(409)
    expect(httpResponse.body).toEqual(new FilmTitleAlreadyExistsError(fakeHttpRequest.body.title))
  })
  test('Should return 201 on success', async () => {
    const addFilmSpy = jest.spyOn(filmRespoitoryStub, 'addFilm')
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(addFilmSpy).toBeCalledWith(fakeHttpRequest.body)
    expect(httpResponse.status).toBe(201)
    expect(httpResponse.body).toEqual(fakeFilmData)
  })
  test('Should return 500 if FilmRepository throws', async () => {
    jest.spyOn(filmRespoitoryStub, 'addFilm').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
