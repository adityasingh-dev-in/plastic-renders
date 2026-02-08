"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
//routes imports
const app = (0, express_1.default)();
// 1. Improved CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// 2. Parsers with limits
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public")); // Useful for Multer temp files
app.use((0, cookie_parser_1.default)());
// 3. Health Check Route (Good for Load Balancers/Docker)
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});
// 4. Routes
// 5. Root Route
app.get("/", (req, res) => {
    res.send("API is running...");
});
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
