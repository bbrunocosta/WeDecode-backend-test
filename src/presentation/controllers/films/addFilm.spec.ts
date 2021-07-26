import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import { Film } from '../../../domain/film'
import FilmTitleAlreadyExistsError from '../../errors/filmTitleAlreadyExistsError'
import AddFilmController from './addFilm.controller'

const fakeFilmData: Film = {
  id: 'a valid id',
  title: 'a valid title',
  author: 'a valid author',
  director: 'a valid director',
  'created-at': 'valid timestamp'
}
const fakeHttpRequest = {
  body: {
    title: 'a valid title',
    author: 'a valid author',
    director: 'a valid director'
  }
}
class AddFilmRepositoryStub implements FilmRepository {
  async addFilm ({ title, author, director }: Omit<Film, 'id' | 'created-at'>): Promise<Film> {
    return fakeFilmData
  }

  async findOneByTitle (title: string): Promise<Film | null> {
    return null
  }
}
describe('AddFilm', () => {
  const addFilmRespoitoryStub = new AddFilmRepositoryStub()
  const addFilmController = new AddFilmController(addFilmRespoitoryStub)
  test('Sould return 409 if film title already exists', async () => {
    const findOneByTitleSpy = jest.spyOn(addFilmRespoitoryStub, 'findOneByTitle')
    findOneByTitleSpy.mockReturnValueOnce(Promise.resolve(fakeFilmData))
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(findOneByTitleSpy).toBeCalledWith(fakeHttpRequest.body.title)
    expect(httpResponse.status).toBe(409)
    expect(httpResponse.body).toEqual(new FilmTitleAlreadyExistsError(fakeHttpRequest.body.title))
  })
  test('Sould return 201 on success', async () => {
    const addFilmSpy = jest.spyOn(addFilmRespoitoryStub, 'addFilm')
    const httpResponse = await addFilmController.handle(fakeHttpRequest)
    expect(addFilmSpy).toBeCalledWith(fakeHttpRequest.body)
    expect(httpResponse.status).toBe(201)
    expect(httpResponse.body).toEqual(fakeFilmData)
  })
})
