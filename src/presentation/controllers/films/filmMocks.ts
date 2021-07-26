import { FilmRepository } from '../../../data/protocols/films/film.repository.protocol'
import { Film } from '../../../domain/film'

export const fakeFilmData: Film = {
  id: 'a valid id',
  title: 'a valid title',
  author: 'a valid author',
  viewersAmount: 0,
  director: 'a valid director',
  'created-at': 'valid timestamp'
}
export const fakeHttpRequest = {
  body: {
    title: 'a valid title',
    author: 'a valid author',
    director: 'a valid director'
  }
}
export const fakeStack = 'a custom stack'
export class FakeErrorStub extends Error {
  constructor () {
    super()
    this.stack = fakeStack
  }
}
export class FilmRepositoryStub implements FilmRepository {
  async addFilm ({ title, author, director }: Omit<Film, 'id' | 'created-at'>): Promise<Film> {
    return fakeFilmData
  }

  async findOneByTitle (title: string): Promise<Film | null> {
    return null
  }

  async getAll (): Promise<Film[] | []> {
    return [fakeFilmData]
  }

  async findOneById (): Promise<Film | null> {
    return fakeFilmData
  }
}
