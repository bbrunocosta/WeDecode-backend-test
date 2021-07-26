import { Film } from '../../../domain/film'

export interface FilmRepository{
  addFilm: ({ title, author, director }: Omit<Film, 'id' | 'created-at'>) => Promise<Film>
  findOneByTitle: (title: string) => Promise<Film | null>
}
