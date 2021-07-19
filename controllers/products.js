import { Product } from '../models/product.js'

export{
    index,
}

function index(req, res){
    Products.find({})
    .then(profiles => {
        res.render('products/index', {
            products,
            title: "productsss"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/products/${req.user.profile}`) //.profile or review?
    })
}