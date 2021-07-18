import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'

export{ 
    router
}

const router = Router()

//localhost:3000/reviews
router.get('/', reviewsCtrl.index)
router.get('/reviews/:id', reviewsCtrl.show)
router.get('/reviews/:id/edit', reviewsCtrl.edit)
//localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)
router.post('/', reviewsCtrl.create)
router.post('/reviews/:id', reviewsCtrl.update)