import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // unique: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
},{timestamps: true})

productSchema.plugin(mongooseAggregatePaginate)
export const Product = mongoose.model('Product', productSchema);