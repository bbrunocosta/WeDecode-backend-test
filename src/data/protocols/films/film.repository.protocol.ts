import { Film } from '../../../domain/film'

export interface FilmRepository{
  addFilm: ({ title, author, director }: Omit<Film, 'id' | 'spectators' |'created-at'>) => Promise<Film>
  getAll: () => Promise<Film[] | []>
  findOneByTitle: (title: string) => Promise<Film | null>
  findOneById: (id: string) => Promise<Film | null>
  addSpectator: (filmId: string, spectatorId: string) => Promise<Film | null>
}
