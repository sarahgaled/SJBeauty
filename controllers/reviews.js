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
        if(review.reviewer.equals(req.user.profile._id)){ //if the owner of the reviewer has submitted the request
            review.update(req.body, {new: true})//if no new true here
             .then(review =>{ //what exists here is the old data for the review
                 console.log(review)
                 res.redirect(`/reviews/${review._id}`)
            })
        } else{ //if the owner of the taco has not submitted the request
            throw new Error("NOT AUTHORIZED")
        }    
    })
    .catch(err => {
        console.log(err)
        res.redirect('/reviews')
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
    Review.findById(req.params.reviewId) //find the review by its id, gonna use what its passing in on its parameters
    .populate("reviewer") //populate the reviewer field w actual data. turns the ob id turns into the entire doc of the owner and will hold all the data it needs to. populate all that data to the owner
    .then(review =>{
        res.render('reviews/show', {
            review,
            title: "show review"
        })
    })
}


function create(req, res){
    req.body.reviewer = req.user.profile //setting that logged in users profile to the reviewer
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