import mongoose from 'mongoose'
import { spectatorSchema } from '../schemas/spectators.schema'
export const SpectatorModel = mongoose.model('Spectators', spectatorSchema)
