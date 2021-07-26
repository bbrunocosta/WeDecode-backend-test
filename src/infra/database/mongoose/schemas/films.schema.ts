import { Schema } from 'mongoose'

export const filmSchema = new Schema({
  title: String,
  author: String,
  director: String,
  viewersAmount: {
    type: Number,
    default: 0
  },
  'created-at': {
    type: Date,
    default: Date.now
  }
})
