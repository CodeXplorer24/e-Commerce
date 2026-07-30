import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Home", "Electronics", "Clothing", "Books", "Grocery", "Sports", "Beauty", "Toys", "Furniture"],
        required: true,
        index: true
    },
    description: {
        type: String,
    }
},{timestamps: true})

export const Category = mongoose.model('Category',categorySchema);