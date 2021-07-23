import { Product } from '../models/product.js'

export {
    index,
    newProduct as new,
    create,
    show,
    deleteProduct as delete,
    createReview,
    editReview,
    updateReview,
    deleteReview as deleteReview
}



function deleteProduct(req, res) {
    Product.findById(req.params.id)
    .then(product => {
            product.delete()
            .then(() => {
                res.redirect('/products')
            })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/products')
    })
}


function show(req, res) {
    Product.findById(req.params.id).populate([
        {
            path: 'reviews',
            populate: {
                path: 'reviewer',
                model: 'Profile',
                select: 'name'
            }
        }
    ]).then(product => {
        res.render('products/show', {
            product: product,
            title: 'show products'
        })
    }).catch(err=>{
        console.log(err)
        res.redirect('/products')
    })
}


function create(req, res) {
   
    req.body.clean = !!req.body.clean //dont forget to create check box for this
    Product.create(req.body)
    .then(product => {
        res.redirect('/products')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/products')
    })
}

function newProduct(req, res){
    res.render('products/new', {
        title: "New Product"
    })
}

function index(req, res) {
    Product.find({})
        .then(products => {
            res.render('products/index', {
                products,
                title: "Products"
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/products")
        })
}


function deleteReview(req, res){
    Product.findById(req.params.productId)
    .then(product => {
        product.reviews.remove({_id:req.params.reviewId})
        product.save()
        .then(() => {
            res.redirect(`/products/${req.params.productId}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/products/${req.params.productId}`)
    })
}


function updateReview(req, res) {
    Product.findById(req.params.productId)
        .then(product => {
            const review = product.reviews.id(req.params.reviewId)
            if (review.reviewer.equals(req.user.profile._id)) { //if the owner of the reviewer has submitted the request
                review.name = req.body.name 
                review.review = req.body.review
                review.rating = req.body.rating
                product.save()
                    .then(review => { //what exists here is the old data for the review
                        res.redirect(`/products/${req.params.productId}`)
                    })
            } else { //if the owner of the taco has not submitted the request
                throw new Error("NOT AUTHORIZED")
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/products')
        })
}


function editReview(req, res) {
    Product.findById(req.params.productId)
        .then(product => {
            const review = product.reviews.id(req.params.reviewId) //finding the review  by its id in this product
            console.log(review)
            res.render('products/edit', {
                product,
                review,
                title: "edit reviews"
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/products')
        })
}


function createReview(req, res) {
    req.body.reviewer = req.user.profile
    Product.findById(req.params.id) //find the product of the user that is making this request
        .then(product => { //then with that product
            console.log(product)
            console.log(req.body)
            product.reviews.push(req.body) //pushing req.body into reviews array
            product.save() //save the product , it is the resource thats holding reviews
                .then(() => {
                    res.redirect(`/products/${req.params.id}`)
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/products/${req.params.id}`)
        })
}



