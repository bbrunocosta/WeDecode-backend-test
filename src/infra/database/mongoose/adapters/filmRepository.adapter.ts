import { FilmRepository } from '../../../../data/protocols/films/film.repository.protocol'
import { Film } from '../../../../domain/film'
import { mapFilm } from '../helpers/map'
import { FilmModel } from '../models/films.model'
class MongooseFilmRepositoryAdapter implements FilmRepository {
  async addFilm ({ title, author, director }: Omit<Film, 'id' | 'spectators' | 'created-at'>): Promise<Film> {
    const film = new FilmModel({ title, author, director })
    const newFilm = await film.save()
    return mapFilm(newFilm)
  }

  async getAll (): Promise<Film[] | []> {
    const films = await FilmModel.find({})
    return films.map(film => mapFilm(film))
  }

  async findOneByTitle (title: string): Promise<Film | null> {
    const film = await FilmModel.findOne({ title }).exec()
    return film ? mapFilm(film) : null
  }

  async findOneById (id: string): Promise<Film | null> {
    const film = await FilmModel.findOne({ _id: id }).exec()
    return film ? mapFilm(film) : null
  }

  async addSpectator (filmId: string, spectatorId: string): Promise<Film | null> {
    const film = await FilmModel.findOneAndUpdate({ _id: filmId }, { $push: { spectators: spectatorId } }, { new: true }).exec()
    return film ? mapFilm(film) : null
  }
}

export default MongooseFilmRepositoryAdapter
