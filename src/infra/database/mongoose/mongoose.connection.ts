import mongoose from 'mongoose'
export const connect = async (): Promise<void> => {
  await mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
