import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log("Path:", localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;

    } catch (error) {
        console.error("Cloudinary Error:", error);

        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

const deleteFromCloudinary = async (cloudinaryUrl) => {
    if (!cloudinaryUrl) return null;

    try {
        const publicId = getPublicIdFromUrl(cloudinaryUrl);
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
        });

        return response; // { result: "ok" } or { result: "not found" }
    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
        return null;
    }
};

// Helper: extracts public_id (including folder path) from a Cloudinary URL
const getPublicIdFromUrl = (url) => {
    try {
        // e.g. https://res.cloudinary.com/<cloud>/image/upload/v1234567890/folder/filename.jpg
        const parts = url.split("/");
        const uploadIndex = parts.findIndex((p) => p === "upload");
        if (uploadIndex === -1) return null;

        // Skip the version segment (v1234567890) right after "upload"
        let pathParts = parts.slice(uploadIndex + 1);
        if (/^v\d+$/.test(pathParts[0])) {
            pathParts = pathParts.slice(1);
        }

        const fileWithExt = pathParts.join("/"); // folder/filename.jpg
        const publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf("."));
        return publicId; //-> folder/filename
    } catch {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };