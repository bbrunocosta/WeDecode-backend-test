import { Spectator } from '../../../domain/spectator'

export interface SpectatorRepository {
  addSpectator: ({ name }: Omit<Spectator, 'id' | 'created-at'>) => Promise<Spectator>
  findOneByName: (name: string) => Promise<Spectator | null>
  getAll: () => Promise<Spectator[] | []>
}
