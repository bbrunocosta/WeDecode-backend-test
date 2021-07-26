import { SpectatorRepository } from '../../../data/protocols/spectators/spectator.repository.protocol'
import { Spectator } from '../../../domain/spectator'

export const fakeSpectatorData: Spectator = {
  id: 'a valid id',
  name: 'a valid name',
  whatchedFilms: [],
  'created-at': 'valid timestamp'
}
export const fakeHttpRequest = {
  body: {
    name: 'a valid name'
  }
}
export const fakeStack = 'a custom stack'
export class FakeErrorStub extends Error {
  constructor () {
    super()
    this.stack = fakeStack
  }
}
export class SpectatorRepositoryStub implements SpectatorRepository {
  async addSpectator ({ name }: Omit<Spectator, 'id' | 'whatchedFilms' |'created-at'>): Promise<Spectator> {
    return fakeSpectatorData
  }

  async findOneByName (name: string): Promise<Spectator | null> {
    return null
  }

  async getAll (): Promise<Spectator[] | []> {
    return [fakeSpectatorData]
  }

  async addWatchedFilm (spectatorDd: string, filmId: string): Promise<Spectator | null> {
    return null
  }
}
