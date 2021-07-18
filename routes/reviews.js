import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js' //importing our controller 

export{ 
    router
}

const router = Router()

//localhost:3000/reviews
router.get('/', reviewsCtrl.index) //creating the route to point to our controller function
router.get('/reviews/:id', reviewsCtrl.show)
router.get('/reviews/:id/edit', reviewsCtrl.edit)
//localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)
router.post('/', reviewsCtrl.create)
router.post('/reviews/:id', reviewsCtrl.update)