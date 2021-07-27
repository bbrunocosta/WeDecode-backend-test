import env from '../main/config/env'
import MongooseHelper from '../infra/database/mongoose/mongoose.Helper'

MongooseHelper.connect(env.mongoUri).then(async () => {
  console.log('db is connected')
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`server running on port ${env.port}`)
  })
}).catch(console.log)
