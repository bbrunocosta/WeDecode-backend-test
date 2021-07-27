import FilmTitleAlreadyExistsError from '../../errors/filmTitleAlreadyExistsError'
import InternalServerError from '../../errors/internalServerError'
import MissingParamError from '../../errors/MissingParamError'
import AddFilmController from './addFilm.controller'
import { FakeErrorStub, fakeFilmData, fakeHttpRequest, fakeStack, FilmRepositoryStub, ValidationStub } from './filmMocks'

describe('AddFilm', () => {
  const filmRespoitoryStub = new FilmRepositoryStub()
  const validationStub = new ValidationStub()
  const addFilmController = new AddFilmController(filmRespoitoryStub, validationStub)
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
  test('sould call validate with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await addFilmController.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.body)
  })
  test('sould return 400 if  validate returns error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any'))
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any'))
  })
})
