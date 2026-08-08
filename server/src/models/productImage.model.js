import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productImageSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},{timestamps: true})
productImageSchema.plugin(mongooseAggregatePaginate)
export const ProductImage = mongoose.model("ProductImage", productImageSchema);