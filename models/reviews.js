import mongoose from 'mongoose'
const Schema = mongoose.Schema

export{
    Review 
}

const reviewSchema = new Schema({
    review: String,
    rating: Number,
    profile: {objectId, ref: "Profile"}
})

const Review = mongoose.model('Review', reviewSchema)