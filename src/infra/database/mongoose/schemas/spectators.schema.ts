import { Schema } from 'mongoose'

export const spectatorSchema = new Schema({
  name: String,
  whatchedFilms: {
    type: [String],
    default: []
  },
  'created-at': {
    type: Date,
    default: Date.now
  }
})
