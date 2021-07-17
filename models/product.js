import mongoose from 'mongoose'
const Schema = mongoose.Schema

export{
    Product 
}

const productSchema = new Schema({
    name: String,
    clean: Boolean,
    category: String,
    reviews:[reviewSchema],
})

const Product = mongoose.model('Product', productSchema)