import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js' //importing our controller 
import { isLoggedIn } from '../middleware/middleware.js'

export{ 
    router
}

const router = Router()

//localhost:3000/reviews
router.get('/', reviewsCtrl.index) //creating the route to point to our controller function
router.get('/:reviewId', reviewsCtrl.show) 
router.get('/:id/edit', reviewsCtrl.edit)
router.post('/', isLoggedIn, reviewsCtrl.create)
router.post('/:id', reviewsCtrl.update)


//localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)