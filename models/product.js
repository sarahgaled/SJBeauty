import mongoose from 'mongoose'
const Schema = mongoose.Schema

export{
    Product 
}

const reviewSchema = new Schema({ //embedding reviewSchema in my products model
    name: String,
    review: String,
    rating: Number,
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
})

const productSchema = new Schema({
    name: String,
    clean: Boolean,
    category: String,
    reviews:[reviewSchema],
    
})

const Product = mongoose.model('Product', productSchema)