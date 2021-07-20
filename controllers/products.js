import { Product } from '../models/product.js'

export {
    index,
    create,
    newProduct as new,
    show,
    deleteProduct as delete,
    createReview,
    editReview,
    updateReview,
    deleteReview as deleteReview
}



function deleteProduct(req, res) {
    Product.findById(req.params.profile)
        .then(product => {
            product.reviews.delete({ _id: req.params.id })
            profile.save()
                .then(() => {
                    res.redirect(`/products/${req.user.profile._id}`)
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/products/${req.user.profile._id}`)
        })
}


function show(req, res) {
    // Product.findById(req.params.id)
    //     // .populate("reviewer") //huh?
    //     .then(product => {
    //         res.render('products/show', {
    //             product,
    //             title: "show products"
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.redirect('/products')
    //     })
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
        console.log(product)
        res.render('products/show', {
            product: product,
            title: 'show products'
        })
    }).catch(err=>{
        console.log(err)
        res.redirect('/products')
    })
}

function newProduct(req, res){
    res.render('products/new', {
        title: "New Product"
    })
}

function create(req, res) {
    req.body.reviewer = req.user.profile
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

function index(req, res) {
    Product.find({})
        .then(products => {
            res.render('products/index', {
                products,
                title: "productsss"
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/products")
        })
}


function deleteReview(req, res){
    Product.findById(req.params.id)
    .then(product => {
        if(review.reviewer.equals(req.user.profile._id)){
            review.delete()
            .then(() => {
                res.redirect('/products')
            })
        } else {
            throw new Error ('NOT AUTHORIZED')
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect('/products')
    })
}


function updateReview(req, res) {
    Product.findById(req.params.id)
        .then(product => {
            if (review.reviewer.equals(req.user.profile._id)) { //if the owner of the reviewer has submitted the request
                review.update(req.body, { new: true })//if no new true here
                    .then(review => { //what exists here is the old data for the review
                        console.log(review)
                        res.redirect(`/reviews/${review._id}`)
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
            const review = product.reviews.find(review => review._id === req.params.reviewId) //finding the review  by its id in this product
            console.log(review)
            res.render('products/edit', {
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
    console.log(req.params.id)
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



