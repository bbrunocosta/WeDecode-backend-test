import { Schema } from 'mongoose'
import { Spectator } from '../../../../domain/spectator'

export const spectatorSchema = new Schema<Spectator>({
  name: String,
  whatchedFilms: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Films'
    }],
    default: []
  },
  'created-at': {
    type: Date,
    default: Date.now
  }
})
