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
    Product.findById(req.params.id).populate([ //populating a sub document
        {
            path: 'reviews',
            populate: {
                path: 'reviewer',
                model: 'Profile', //populating the path of reviewer with the model: profile -its to contain all the user data taht we need to display the name of a review card
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
    Product.findById(req.params.productId)//find the product that the reviews live in
        .then(product => {
            const review = product.reviews.id(req.params.reviewId) //finding the review  by its id in this product, looking at the array of reviews inside the product and find a review where the id matches the req.params.review.id that i just sent back
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
    req.body.reviewer = req.user.profile //setting the profile to the user. tie the person that submitted that review to the reviewer. profile of whoever is logged in and attaching it to the actual review thats being created. this person that is submitting the request, they r the reviewer.
    Product.findById(req.params.id) //find the product of the user that is making this request. the req.params.id is accessible through the route i built
        .then(product => { //then with that product
            product.reviews.push(req.body) //pushing req.body-form data that you sent into reviews (property) array
            product.save() //save the product , it is the resource thats holding reviews, which saves this newly pushed review
                .then(() => {
                    res.redirect(`/products/${req.params.id}`) //sends me back to the page that displays the details of that product, this route is directing the user to that specific product
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/products/${req.params.id}`)
        })
}



