
const errorMiddleware = ((err, req, res, next) => {
    // 1. Check if the error is an instance of your custom ApiError class
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || [];

    // 2. Force the response header to JSON and send the structured payload
    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

export {errorMiddleware}