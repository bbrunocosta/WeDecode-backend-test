import { filmSchema } from '../schemas/films.schema'
import mongoose from 'mongoose'
export const FilmModel = mongoose.model('Films', filmSchema)
