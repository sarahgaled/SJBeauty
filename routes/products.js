import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as productsCtrl from '../controllers/products.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, productsCtrl.index)
router.get('/:id', isLoggedIn, productsCtrl.show)
router.post('/', isLoggedIn, productsCtrl.create)
router.delete('/', isLoggedIn, productsCtrl.delete)


router.get('/:id/edit', isLoggedIn, productsCtrl.editReview) //whats the path for this in routing for related resources.
router.post('/:id/reviews', isLoggedIn, productsCtrl.createReview)
router.put('/:id', isLoggedIn, productsCtrl.updateReview)
router.delete('/reviews/:id', isLoggedIn, productsCtrl.deleteReview)