import { Film } from '../../../domain/film'

export interface FilmRepository{
  addFilm: ({ title, author, director }: Omit<Film, 'id' | 'viewersAmount' | 'created-at'>) => Promise<Film>
  getAll: () => Promise<Film[] | []>
  findOneByTitle: (title: string) => Promise<Film | null>
  findOneById: (id: string) => Promise<Film | null>
}
