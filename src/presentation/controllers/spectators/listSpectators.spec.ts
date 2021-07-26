import InternalServerError from '../../errors/internalServerError'
import ListSpectatorsController from './listSpectators.controller'
import { FakeErrorStub, fakeSpectatorData, fakeHttpRequest, fakeStack, SpectatorRepositoryStub } from './spectatorMocks'
describe('ListSpectators', () => {
  const spectatorRepositoryStub = new SpectatorRepositoryStub()
  const listSpectatorsController = new ListSpectatorsController(spectatorRepositoryStub)
  test('Should return 200 on success', async () => {
    const httpResponse = await listSpectatorsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual([fakeSpectatorData])
  })
  test('Should return 500 if SpectatorRepository throws', async () => {
    jest.spyOn(spectatorRepositoryStub, 'getAll').mockImplementationOnce(() => { throw new FakeErrorStub() })
    const httpResponse = await listSpectatorsController.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError(fakeStack))
  })
})
