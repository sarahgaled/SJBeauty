import { Review } from '../models/review.js' //getting our model


export{
    newReview as new,
    index, 
    create,
    show,
    edit,
    update

}


function update(req, res){
    Review.findById(req.params.id)
    .then(review =>{

    })
}

function edit(req, res){
    Review.findById(req.params.id)
    .then(review =>{
        res.render('reviews/edit', {
            review,
            title: "edit"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/reviews')
    })
}

function show(req, res){
    Review.findById(req.params.reviewId)
    .populate("reviewer")
    .then(review =>{
        res.render('reviews/show', {
            review,
            title: "show review"
        })
    })
}


function create(req, res){
    req.body.reviewer = req.user.profile 
    Review.create(req.body)
    .then(review =>{
        res.redirect('/reviews')
    })
    .catch(err =>{
        console.log(err)
        res.redirect('/reviews')
    })
}

function index(req, res){ //seeing all our reviews
   Review.find({}) //the object will return everything from our reviews 
   .then(reviews =>{
       res.render("reviews/index", { //
           reviews,
           title: "Reviews"
       })
   })
   .catch(err =>{
       console.log(err)
       res.redirect("/reviews")
   })
}

function newReview(req, res){ //whats happening w this and where do I see it and where in views?
    res.render('reviews/new')
}