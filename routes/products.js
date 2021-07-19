import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as productsCtrl from '../controllers/products.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, productsCtrl.index)