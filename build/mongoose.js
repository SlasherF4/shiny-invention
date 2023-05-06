"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = exports.categoryModel = exports.userModel = exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//mongoose and Database
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    brand: String,
    available: Boolean,
    category: String,
    inventary: [{
            model: String,
            sizes: [{
                    size: String,
                    stock: Number
                }]
        }]
});
exports.productModel = (0, mongoose_1.model)("Products", productSchema);
// user
const userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    role: String
});
exports.userModel = (0, mongoose_1.model)("Users", userSchema);
//categories
const categorySchema = new mongoose_1.Schema({
    name: String,
    available: Boolean
});
exports.categoryModel = (0, mongoose_1.model)("Categories", categorySchema);
//database connect
const uri = process.env.DATABASE_URI;
const DbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.DATABASE_AUTH);
    yield (0, mongoose_1.connect)(uri, {
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASS,
        authSource: process.env.DATABASE_AUTH
    });
    console.log("connected with database");
});
exports.DbConnect = DbConnect;
