import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js"
import {Product} from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ProductImage } from "../models/productImage.model.js";
import mongoose from "mongoose";


const addProduct = asyncHandler(async(req, res) => {

    const user = req.user;
    if(user.role != "SELLER"){
        throw new ApiError(400, "Seller doesn't exist");
    }

    const {name, description, price, stock, category} = req.body;

    const requiredFields = {name, description, price, stock, category};

    for (const [key, value] of Object.entries(requiredFields)) {
        // Checks if the field is missing, null, or contains only blank spaces
        if (value === undefined || value === null || String(value).trim() === "") {
            throw new ApiError(400, `The ${key} field is required and cannot be empty`);
        }
    }

    const imageFiles = req.files; //stores and fetch images from user in a array
    if (!imageFiles || imageFiles.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    const product = await Product.create({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category: category.trim(),
        sellerId: user._id
    })

    if(!product){
        throw new ApiError(500, "Product field creation failed");
    }
    

    const imageUploadPromises = imageFiles.map(async (file) => {
        const uploadedImg = await uploadOnCloudinary(file.path); //upload image file one by one
        if (!uploadedImg?.url) {
            throw new ApiError(500, "Failed to upload image");
        }
        return ProductImage.create({
            productId: product._id,
            imageUrl: uploadedImg.url,
        });
    });

    // Fire all promises simultaneously and wait for all to complete
    const savedProductImages = await Promise.all(imageUploadPromises);

    await product.populate("sellerId", "fullName");

    return res
            .status(201)
            .json(new ApiResponse(201, {product, images: savedProductImages}, "Product added successfully"));
})

const getProductsBySeller = asyncHandler(async(req, res) => {

    const user = req.user;
    const sellerId = req.user._id;

    if(user.role != "SELLER"){
        throw new ApiError(400, "Seller doesn't exist")
    }

    const products = await Product.aggregate([
        {
            $match: {
                sellerId: new mongoose.Types.ObjectId(sellerId)
            }
        },
        {
            $lookup: {
                from: "productimages",
                localField: "_id",
                foreignField: "productId",
                as: "images"
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                category: 1,
                price: 1,
                stock: 1,
                createdAt: 1,
                images: {
                    $map: {
                        input: "$images",
                        as: "img",
                        in: "$$img.imageUrl"
                    }
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])

    return res
            .status(200)
            .json(new ApiResponse(200, products, "Products by seller fetched successfully"))


})

const getProducts = asyncHandler(async(req, res) => {
    
    const {page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "asc"} = req.query;

    const allowedSortField = [
        "createdAt",
        "price",
        "rating",
        "stock",
        "category"
    ]

    const sortField = allowedSortField.includes(sortBy) ? sortBy : "createdAt";

    const matchStage = {};

    if(query){
        
        matchStage.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: query,
                    $options: "i"
                }
            }
        ]
    }

    

    
})

export {
    addProduct,
    getProductsBySeller,
    getProducts
}