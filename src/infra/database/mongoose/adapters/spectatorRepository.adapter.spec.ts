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
})
