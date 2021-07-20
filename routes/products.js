import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as productsCtrl from '../controllers/products.js'

export{
    router
}

const router = Router()

router.get("/new", productsCtrl.new)

router.get('/', isLoggedIn, productsCtrl.index)
router.get('/:id', isLoggedIn, productsCtrl.show)
router.post('/', isLoggedIn, productsCtrl.create)
router.delete('/:id', isLoggedIn, productsCtrl.delete)



router.get('/:productId/reviews/:reviewId/edit', isLoggedIn, productsCtrl.editReview) //whats the path for this in routing for related resources.
router.post('/:id/reviews', isLoggedIn, productsCtrl.createReview)
router.put('/:productId/reviews/:reviewId', isLoggedIn, productsCtrl.updateReview) 
router.delete('/:productId/reviews/:reviewId', isLoggedIn, productsCtrl.deleteReview)