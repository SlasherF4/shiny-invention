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
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyProduct = exports.getProductsByCategory = exports.getProductById = exports.deleteProductById = exports.getAllProducts = exports.getAllAvailableProducts = exports.addProduct = void 0;
const mongoose_1 = require("../mongoose");
const addProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const product = JSON.parse(JSON.stringify(req.body));
        const info = JSON.parse(product.product);
        info.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        delete info._id;
        const addProduct = new mongoose_1.productModel(info);
        yield addProduct.save();
        return res.send("product added");
    }
    catch (error) {
        return res.send(error);
    }
});
exports.addProduct = addProduct;
const getAllAvailableProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllProducts = yield mongoose_1.productModel.find({
            available: true,
        });
        return res.send(findAllProducts);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllAvailableProducts = getAllAvailableProducts;
const getAllProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllProducts = yield mongoose_1.productModel.find({});
        return res.send(findAllProducts);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllProducts = getAllProducts;
const deleteProductById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("hi");
        const find = yield mongoose_1.productModel.findByIdAndDelete(id);
        if (find != null)
            return res.send(find);
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteProductById = deleteProductById;
const getProductById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const find = yield mongoose_1.productModel.findById(id);
        if (find != null)
            return res.send(find);
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getProductById = getProductById;
const getProductsByCategory = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const find = yield mongoose_1.productModel.find({
            category: category,
        });
        if (find != null)
            return res.send(find);
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getProductsByCategory = getProductsByCategory;
const modifyProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const edit = yield mongoose_1.productModel.findByIdAndUpdate(product._id, product);
        if (edit != null) {
            return res.send(edit);
        }
        return res.send(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.modifyProduct = modifyProduct;
