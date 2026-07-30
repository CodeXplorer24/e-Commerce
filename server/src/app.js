import express,{json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'
const app = express();

app.use((req,res,next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

//configuring our express app for req and res handling
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}))

//body parsing
app.use(express.json({limit: "16kb"})); // express.json() → parses JSON body and payload limit is 16kb
app.use(express.urlencoded({limit: "16kb"})); // express.urlencoded() → parses form data 


app.use(express.static("public")); // serves static files like image
app.use(cookieParser()); // parses cookies data

import authRouter from "../src/routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);

import userRouter from "../src/routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import addressRouter from "../src/routes/address.routes.js";
app.use("/api/v1/addresses", addressRouter);

// import productRouter from "../src/routes/product.routes.js";
// app.use("/api/v1/prod")

import sellerRouter from "../src/routes/seller.routes.js";
app.use("/api/v1/seller", sellerRouter);

import { errorMiddleware } from "./middleware/error.middleware.js";
app.use(errorMiddleware);

export {app};