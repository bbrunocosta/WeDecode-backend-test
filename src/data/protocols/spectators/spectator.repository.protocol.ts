import { Spectator } from '../../../domain/spectator'

export interface SpectatorRepository {
  addSpectator: ({ name }: Omit<Spectator, 'id' | 'whatchedFilms' | 'created-at'>) => Promise<Spectator>
  findOneByName: (name: string) => Promise<Spectator | null>
  findOneById: (id: string) => Promise<Spectator | null>
  addWatchedFilm: (spectatorDd: string, filmId: string) => Promise<Spectator | null>
  getAll: () => Promise<Spectator[] | []>
}
