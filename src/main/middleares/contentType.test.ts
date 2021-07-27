import request from 'supertest'
import app from '../config/app'

describe('Content-Type Middleware', () => {
  test('Sould return ContentType as json as default', async () => {
    app.get('/test_content-type-json', (req, res) => { res.send('') })
    await request(app)
      .get('/test_content-type-json')
      .expect('content-type', /json/)
  })
})
