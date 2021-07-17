import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'

export{ 
    router
}

const router = Router()

//localhost:3000/reviews
router.get('/', reviewsCtrl.index)
router.get('/reviews/:id', reviewsCtrl.show)
//localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)
router.post('/', reviewsCtrl.create)