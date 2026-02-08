"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
/**
 * Uploads a file to Cloudinary with customizable options
 * @param localFilePath Path to the local file
 * @param folder Optional folder name in Cloudinary (defaults to "e-commerce")
 * @param options Optional Cloudinary upload options (overrides defaults)
 */
const uploadOnCloudinary = (localFilePath_1, ...args_1) => __awaiter(void 0, [localFilePath_1, ...args_1], void 0, function* (localFilePath, folder = "e-commerce", options = {}) {
    try {
        if (!localFilePath)
            return null;
        if (!(0, fs_1.existsSync)(localFilePath)) {
            console.error("File does not exist at path:", localFilePath);
            return null;
        }
        // Default options
        const defaultOptions = {
            folder: folder,
            resource_type: "auto",
            quality: "auto",
            fetch_format: "auto",
        };
        // Merge defaults with provided options
        // options taking precedence
        const uploadOptions = Object.assign(Object.assign({}, defaultOptions), options);
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, uploadOptions);
        // File has been uploaded successfully
        if ((0, fs_1.existsSync)(localFilePath)) {
            yield promises_1.default.unlink(localFilePath);
        }
        return response;
    }
    catch (error) {
        if ((0, fs_1.existsSync)(localFilePath)) {
            try {
                yield promises_1.default.unlink(localFilePath);
            }
            catch (unlinkError) {
                console.error("Critical: Failed to delete local file after upload error", unlinkError);
            }
        }
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
});
exports.uploadOnCloudinary = uploadOnCloudinary;
