import { Film } from '../../../../domain/film'
import { Spectator } from '../../../../domain/spectator'

export const mapFilm = (mongooseObj: any): Film => {
  const { _id, ...collectiontWithoutId } = mongooseObj._doc
  return Object.assign({}, collectiontWithoutId, { id: _id, __v: undefined })
}
export const mapSpectator = (mongooseObj: any): Spectator => {
  const { _id, ...collectiontWithoutId } = mongooseObj._doc
  return Object.assign({}, collectiontWithoutId, { id: _id, __v: undefined })
}
