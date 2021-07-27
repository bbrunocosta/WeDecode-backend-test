import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes.adapter'
import { makeAddSpectatorController } from '../factories/makeAddSpectatorController.factory'
import { makeAddWatchedFilmController } from '../factories/makeAddWatchedFilmController.factory'
import { makeListSpectatorsController } from '../factories/makeListSpectatorsController.factory'
import { makeListWatchedFilmsController } from '../factories/makeListWatchedFilmsController.factory'

export default (router: Router): void => {
  router.post('/spectators', adaptRoute(makeAddSpectatorController()))
  router.get('/spectators', adaptRoute(makeListSpectatorsController()))
  router.post('/spectators/films/:id', adaptRoute(makeAddWatchedFilmController()))
  router.get('/spectators/films/:id', adaptRoute(makeListWatchedFilmsController()))
}
