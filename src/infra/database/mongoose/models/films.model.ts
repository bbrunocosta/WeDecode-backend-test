import { filmSchema } from '../schemas/films.schema'
import mongoose from 'mongoose'
import { Film } from '../../../../domain/film'
export const FilmModel = mongoose.model<Film>('Films', filmSchema)
