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
})
