import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as productsCtrl from '../controllers/products.js'

export{
    router
}

const router = Router()

//localhost:3000/products
router.get('/', isLoggedIn, productsCtrl.index)
//localhost:3000/products/new
router.get("/new", productsCtrl.new)
//localhost:3000/products/idOfProduct
router.get('/:id', isLoggedIn, productsCtrl.show)
//localhost:3000/products POST new product
router.post('/', isLoggedIn, productsCtrl.create)
//localhost:3000/products/:id DELETE
router.delete('/:id', isLoggedIn, productsCtrl.delete)



router.get('/:productId/reviews/:reviewId/edit', isLoggedIn, productsCtrl.editReview) //whats the path for this in routing for related resources.
router.post('/:id/reviews', isLoggedIn, productsCtrl.createReview)
router.put('/:productId/reviews/:reviewId', isLoggedIn, productsCtrl.updateReview) 
router.delete('/:productId/reviews/:reviewId', isLoggedIn, productsCtrl.deleteReview)