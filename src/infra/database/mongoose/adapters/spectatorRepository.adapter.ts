import { SpectatorRepository } from '../../../../data/protocols/spectators/spectator.repository.protocol'
import { Spectator } from '../../../../domain/spectator'
import { mapSpectator } from '../helpers/map'
import { SpectatorModel } from '../models/spectators.model'

class MongoSpectatorRepositoryAdapter implements SpectatorRepository {
  async addSpectator ({ name }: Omit<Spectator, 'id' | 'whatchedFilms' | 'created-at'>): Promise<Spectator> {
    const spectator = new SpectatorModel({ name })
    const newSpectator = await spectator.save()
    return mapSpectator(newSpectator)
  }

  async getAll (): Promise<Spectator[] | []> {
    const spectators = await SpectatorModel.find({})
    return spectators.map(spectator => mapSpectator(spectator))
  }

  async findOneByName (name: string): Promise<Spectator | null> {
    const spectator = await SpectatorModel.findOne({ name })
    console.log(name)
    console.log(spectator)
    return spectator ? mapSpectator(spectator) : null
  }

  async findOneById (id: string): Promise<Spectator | null> {
    const spectator = await SpectatorModel.findOne({ _id: id })
    return spectator ? mapSpectator(spectator) : null
  }

  async addWatchedFilm (spectatorid: string, filmId: string): Promise<Spectator | null> {
    const spectator = await SpectatorModel.findOneAndUpdate({ _id: spectatorid }, { $push: { whatchedFilms: filmId } }, { new: true })
    return spectator ? mapSpectator(spectator) : null
  }
}

export default MongoSpectatorRepositoryAdapter
