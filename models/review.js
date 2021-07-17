import mongoose from 'mongoose'
const Schema = mongoose.Schema

export{
    Review 
}

const reviewSchema = new Schema({
    review: String,
    rating: Number,
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
})

const Review = mongoose.model('Review', reviewSchema)