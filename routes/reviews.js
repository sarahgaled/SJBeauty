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
router.get('/:id/edit', isLoggedIn, reviewsCtrl.edit) //do i need isloggedin here?
router.post('/', isLoggedIn, reviewsCtrl.create)
router.put('/:id', isLoggedIn, reviewsCtrl.update)
router.delete('/:id', isLoggedIn, reviewsCtrl.delete)


//localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)