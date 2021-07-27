import { Schema } from 'mongoose'
import { Film } from '../../../../domain/film'

export const filmSchema = new Schema<Film>({
  title: String,
  author: String,
  director: String,
  spectators: [{
    type: Schema.Types.ObjectId,
    ref: 'Spectators'
  }],
  viewersAmount: {
    type: Number,
    default: 0
  },
  'created-at': {
    type: Date,
    default: Date.now
  }
})
