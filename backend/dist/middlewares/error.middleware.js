"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const fs_1 = __importDefault(require("fs"));
const errorHandler = (err, req, res, next) => {
    // Cleanup local files if an error occurred during request processing
    if (req.file) {
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error("Error deleting local file in error handler:", err);
        });
    }
    if (req.files) {
        const files = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files).flat();
        files.forEach((file) => {
            fs_1.default.unlink(file.path, (err) => {
                if (err)
                    console.error("Error deleting local file in error handler:", err);
            });
        });
    }
    let error = err;
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        error = new ApiError_1.ApiError(statusCode, message, (error === null || error === void 0 ? void 0 : error.errors) || [], err.stack);
    }
    const response = Object.assign(Object.assign(Object.assign({}, error), { message: error.message }), (process.env.NODE_ENV === "development" ? { stack: error.stack } : {}));
    return res.status(error.statusCode).json(response);
};
exports.errorHandler = errorHandler;
