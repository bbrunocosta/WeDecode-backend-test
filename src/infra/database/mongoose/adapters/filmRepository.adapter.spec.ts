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
  test('getAll should return empty array if any film was found', async () => {
    const result = await filmRepository.getAll()
    expect(result).toEqual([])
  })
  test('findOneById should return a film if it exists', async () => {
    const fake2 = await filmRepository.addFilm(fakeFilmRequest2)
    const fake1 = await filmRepository.addFilm(fakeFilmRequest1)
    const result1 = await filmRepository.findOneById(fake1.id)
    const result2 = await filmRepository.findOneById(fake2.id)
    expect(result1).toBeTruthy()
    expect(result1?.author).toBe(fakeFilmRequest1.author)
    expect(result2).toBeTruthy()
    expect(result2?.author).toBe(fakeFilmRequest2.author)
  })
})
