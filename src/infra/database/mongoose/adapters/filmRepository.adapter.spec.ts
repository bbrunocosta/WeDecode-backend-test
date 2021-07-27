import MongooseFilmRepositoryAdapter from './filmRepository.adapter'
import MongooseHelper from '../mongoose.Helper'
import env from '../../../../main/config/env'
describe('MongooseFilmRepositoryAdapter', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongoUri)
  })
  afterAll(async () => {
    await MongooseHelper.disconnect()
  })
  beforeEach(async () => {
    await MongooseHelper.dropCollection('films')
  })
  const fakeFilmRequest1 = {
    title: 'a tile',
    author: 'an author',
    director: 'a director'
  }
  const fakeFilmRequest2 = {
    title: 'a tile2',
    author: 'an author2',
    director: 'a director2'
  }
  const filmRepository = new MongooseFilmRepositoryAdapter()
  test('addFilm should return a film on sucess', async () => {
    const result = await filmRepository.addFilm(fakeFilmRequest1)
    expect(result.title).toBe(fakeFilmRequest1.title)
    expect(result.author).toBe(fakeFilmRequest1.author)
    expect(result.director).toBe(fakeFilmRequest1.director)
  })
  test('getAll should return a list of films', async () => {
    await filmRepository.addFilm(fakeFilmRequest1)
    await filmRepository.addFilm(fakeFilmRequest2)
    const result = await filmRepository.getAll()
    expect(result.length).toBe(2)
  })
})
