import { Router } from 'express'

const router = Router()

import * as reviewsCtrl from '..controllers/reviews.js'

export{ 
    Router
}

router.get('/new', reviewsCtrl.new)