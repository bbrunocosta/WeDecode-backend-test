import MongooseHelper from '../mongoose.Helper'
import MongooseFilmRepositoryAdapter from './filmRepository.adapter'
import MongoSpectatorRepositoryAdapter from './spectatorRepository.adapter'
import env from '../../../../main/config/env'
describe('MongoSpectatorRepositoryAdapter', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongoUri)
  })
  afterAll(async () => {
    await MongooseHelper.disconnect()
  })
  beforeEach(async () => {
    await MongooseHelper.dropCollection('spectators')
  })
  const fakeSpectatorRequest = {
    name: 'Bruno'
  }
  const fakeSpectatorRequest2 = {
    name: 'felipe'
  }
  const filmRepository = new MongooseFilmRepositoryAdapter()
  const spectatorRepository = new MongoSpectatorRepositoryAdapter()
  test('addSpectator should return a Spectator on sucess', async () => {
    const result = await spectatorRepository.addSpectator(fakeSpectatorRequest)
    expect(result.id).toBeTruthy()
    expect(result.whatchedFilms.length).toBe(0)
  })
  test('getAll should return a list of Spectators', async () => {
    await spectatorRepository.addSpectator(fakeSpectatorRequest)
    await spectatorRepository.addSpectator(fakeSpectatorRequest2)
    const result = await spectatorRepository.getAll()
    expect(result.length).toBe(2)
  })
  test('getAll should return empty array if any Spectator was found', async () => {
    const result = await spectatorRepository.getAll()
    expect(result).toEqual([])
  })
  test('findOneById should return a Spectator if it exists', async () => {
    const fake2 = await spectatorRepository.addSpectator(fakeSpectatorRequest2)
    const fake = await spectatorRepository.addSpectator(fakeSpectatorRequest)
    const result = await spectatorRepository.findOneById(fake.id)
    const result2 = await spectatorRepository.findOneById(fake2.id)
    expect(result).toBeTruthy()
    expect(result?.name).toBe(fakeSpectatorRequest.name)
    expect(result2).toBeTruthy()
    expect(result2?.name).toBe(fakeSpectatorRequest2.name)
  })
  test('findOneById should return null if Spectator was not found', async () => {
    const result3 = await spectatorRepository.findOneById('51bb793aca2ab77a3200000d')
    expect(result3).toBeFalsy()
    expect(result3).toBe(null)
  })
  test('findOneByName should return a Spectator if it exists', async () => {
    await spectatorRepository.addSpectator(fakeSpectatorRequest2)
    await spectatorRepository.addSpectator(fakeSpectatorRequest)
    const result = await spectatorRepository.findOneByName('bruno')
    if (result) {
      expect(result.name).toBe('bruno')
    }
  })
  test('findOneByName should return null if Spectator was not found', async () => {
    await spectatorRepository.addSpectator(fakeSpectatorRequest2)
    await spectatorRepository.addSpectator(fakeSpectatorRequest)
    const result = await spectatorRepository.findOneByName('not regitered name')
    expect(result).toBe(null)
  })
  test('addWhactchedFilm  should add a filmId to whatedFilms array', async () => {
    const film = await filmRepository.addFilm({
      title: 'a title',
      author: 'an author',
      director: 'a director'
    })
    const film2 = await filmRepository.addFilm({
      title: 'a title2',
      author: 'an author2',
      director: 'a director2'
    })
    const fakeSpectator = await spectatorRepository.addSpectator(fakeSpectatorRequest2)
    const updatedSpectator = await spectatorRepository.addWatchedFilm(fakeSpectator.id, film.id)
    expect(updatedSpectator?.whatchedFilms.length).toBe(1)
    const updatedSpectator2 = await spectatorRepository.addWatchedFilm(fakeSpectator.id, film2.id)
    expect(updatedSpectator2?.whatchedFilms.length).toBe(2)
  })
  test('addWhactchedFilm  should return null if spectator is invalid', async () => {
    const film = await filmRepository.addFilm({
      title: 'a title',
      author: 'an author',
      director: 'a director'
    })
    const updatedSpectator2 = await spectatorRepository.addWatchedFilm('51bb793aca2ab77a3200000d', film.id)
    expect(updatedSpectator2).toBeFalsy()
  })
})
