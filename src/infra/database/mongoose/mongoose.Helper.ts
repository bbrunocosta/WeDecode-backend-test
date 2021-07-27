import mongoose from 'mongoose'
export default {
  client: mongoose,
  connect: async (uri: string): Promise<void> => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
  },
  disconnect: async (): Promise<void> => {
    await mongoose.disconnect()
  },
  dropCollection: async (collection: string): Promise<void> => {
    mongoose.connection.db.dropCollection(collection, () => {})
  }
}
