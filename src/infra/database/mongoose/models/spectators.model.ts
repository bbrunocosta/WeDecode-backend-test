import mongoose from 'mongoose'
import { Spectator } from '../../../../domain/spectator'
import { spectatorSchema } from '../schemas/spectators.schema'
export const SpectatorModel = mongoose.model<Spectator>('Spectators', spectatorSchema)
