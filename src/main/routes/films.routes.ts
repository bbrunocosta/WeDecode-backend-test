import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes.adapter'
import { makeAddFilmController } from '../factories/makeAddFilmController.factory'
import { makeListFilmsController } from '../factories/makeListFilmsController.factory'
import { makeListViwersAmountController } from '../factories/makeListViwersAmountController.factory'

export default (router: Router): void => {
  router.post('/films', adaptRoute(makeAddFilmController()))
  router.get('/films', adaptRoute(makeListFilmsController()))
  router.get('/films/audience/:id', adaptRoute(makeListViwersAmountController()))
}
