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
exports.modifyProduct = exports.getProductsByCategory = exports.getProductById = exports.deleteProductById = exports.getAllProducts = exports.getAllAvailableProducts = exports.addProduct = exports.verifyStock = exports.getManyById = void 0;
const mongoose_1 = require("../mongoose");
const getManyById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idList = req.body;
        const productsList = yield mongoose_1.productModel.find({ $or: idList });
        if (productsList.length)
            return res.send(productsList);
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getManyById = getManyById;
const verifyStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.body;
        const idList = products.map(({ _id }) => {
            return { _id };
        });
        const productsList = yield mongoose_1.productModel.find({ $or: idList });
        const insufficientStock = productsList.map((product) => {
            const current = products.find(e => e._id == product._id);
            const model = product.inventary.find(e => e.model == current.model);
            const size = model === null || model === void 0 ? void 0 : model.sizes.find(e => e.size == current.size);
            return (size === null || size === void 0 ? void 0 : size.stock) >= (current === null || current === void 0 ? void 0 : current.quantity);
        }).includes(false);
        if (insufficientStock)
            return res.status(404).send(productsList);
        return next();
    }
    catch (error) {
        return res.send(error);
    }
});
exports.verifyStock = verifyStock;
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
        if (find)
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
        if (find)
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
        if (find)
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
        if (edit)
            return res.send(edit);
        return res.send(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.modifyProduct = modifyProduct;
