import { Review } from '../models/review.js'


export{
    newReview as new,
    index, 
    create,
    // show,

}

// function show(req, res){
//     Review.findById(req.params.reviewId)
//     .populate("reviewer")
// }


function create(req, res){
    req.body.reviewer = req.user.profile 
    Review.create(req.body)
    .then(taco =>{
        res.redirect('/reviews')
    })
    .catch(err =>{
        console.log(err)
        res.redirect('/reviews')
    })
}

function index(req, res){
   Review.find({})
   .then(reviews =>{
       res.render("reviews/index", {
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