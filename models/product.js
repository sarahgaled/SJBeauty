import mongoose from 'mongoose'
const Schema = mongoose.Schema

export{
    Product 
}

const reviewSchema = new Schema({ //embedding reviewSchema in my products model
    name: {
        type: String,
        required: true},
    review: {
        type: String,
        required: true},
    rating: { 
        type: Number,
        min:1,
        max:5 },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
})

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    clean: Boolean,
    category: {
        type: String,
        required: true,
        enum: ["Beauty", "Skincare"]
        },
    reviews:[reviewSchema],
    
})

const Product = mongoose.model('Product', productSchema)