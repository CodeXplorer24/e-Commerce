import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const addtoCart = asyncHandler(async(req, res) => {
    const customerId = req.user._id;
    
    const {qt} = req.body;
    const {productId} = req.params;

    if(!productId){
        throw new ApiError(400, "Product isn't available");
    }

    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(400, "Invalid ProductId");
    }

    const quantity = Number(qt);

    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new ApiError(400, "Quantity must be a positive integer");
    }

    const product = await Product.findById(productId);
    
    if(!product){
        throw new ApiError(404, "Product isn't available")
    }

    const existingCart = await Cart.findOne(
        {
            customer: customerId,
            "items.productId": productId
        },
        {
            "items.$": 1
        }
    )

    const currQuantity = existingCart?.items?.[0]?.quantity ?? 0;

    if(quantity + currQuantity > product.stock){
        throw new ApiError(400, `You can't add more than ${product.stock}`);
    }

    //if particular product already exists then just increase quantity
    let cart = await Cart.findOneAndUpdate(
        {
            customer: customerId,
            "items.productId": productId
        },
        {
            $inc: {"items.$.quantity": quantity}
        },
        {
            new: true
        }
    )

    //if cart doesn't exist or product isn't already there in existing cart
    if(!cart){
        cart = await Cart.findOneAndUpdate(
            {customer: customerId},
            {
              $push: {
                items: {productId, quantity}
              }  
            },
            {
                new: true, //return new updated document
                upsert: true, // if filter doesn't work creates a new document
                setDefaultsOnInsert: true // add additional details like createdAt etc when filter fails
            }
        )
    }
    
    await cart.populate("items.productId", "name description price");
    
    return res
            .status(200)
            .json(new ApiResponse(200, cart, "Products added to cart successfully"))
})

const getCart = asyncHandler(async(req, res) => {
    const customerId = req.user._id;
   
    const cart = await Cart.findOne({customer: customerId});

    if(!cart){
        throw new ApiError(404, "Something went wrong");
    }
    
    await cart.populate("items.productId", "name description price -_id");

    return res
            .status(200)
            .json(new ApiResponse(200, cart, "Cart fetched successfully"));

})

const removeProduct = asyncHandler(async (req, res) => {
    const customerId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Product isn't available");
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid productId");
    }

    const result = await Cart.updateOne(
        { customer: customerId },
        //$pull removes every array element matching the given condition — here, any item whose productId matches.
        { $pull: { items: { productId } } } 
    );

    if (result.matchedCount === 0) {
        throw new ApiError(404, "Cart isn't available");
    }

    if (result.modifiedCount === 0) {
        throw new ApiError(404, "Product isn't in the cart");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Product removed from the cart successfully"));
});

const reduceProductCount = asyncHandler(async (req, res) => {
    const customerId = req.user._id;
    const { productId } = req.params;
    const { qt } = req.body;

    if (!productId) {
        throw new ApiError(400, "Product isn't available");
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid productId");
    }

    const quantity = Number(qt);
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new ApiError(400, "Quantity must be a positive integer");
    }

    const existingCart = await Cart.findOne(
        { customer: customerId, "items.productId": productId },
        { "items.$": 1 }
    );
    const currQuantity = existingCart?.items?.[0]?.quantity ?? 0;

    if (currQuantity === 0) {
        throw new ApiError(404, "Product isn't in the cart");
    }
    if (quantity > currQuantity) {
        throw new ApiError(400, `You only have ${currQuantity} of this item in your cart`);
    }

    let result = await Cart.findOneAndUpdate(
        { customer: customerId, "items.productId": productId },
        { $inc: { "items.$.quantity": -quantity } },
        { new: true }
    );

    const updatedItem = result?.items?.find(
        (item) => item.productId.toString() === productId
    );
    const productQuantity = updatedItem?.quantity ?? 0;

    if (productQuantity === 0) {
        result = await Cart.findOneAndUpdate(
            { customer: customerId },
            { $pull: { items: { productId } } },
            { new: true }
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            productQuantity === 0 ? "Product removed successfully" : "Product reduced successfully"
        ));
});
export {
    getCart,
    addtoCart,
    removeProduct,
    reduceProductCount
}