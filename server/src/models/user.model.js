import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    fullName: {
        type: String,
        trim: true,
        index: true
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "SELLER", "ADMIN"],
        default: "USER"
    }
},{timestamps: true})

// pre hook provided by mongoose check every time before saving to db that password is modified or not so 
// everytime password isn't encrypted or hashed
userSchema.pre("save", async function () {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10); // password encryption
    }
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// it generates access token for each user using payload, accessToken and tokenExpiry
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id, //_id is provided by mongoose for each user
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);