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
exports.addCategory = exports.getAllCategories = void 0;
const mongoose_1 = require("../mongoose");
const getAllCategories = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield mongoose_1.categoryModel.find({});
        return res.send(list);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllCategories = getAllCategories;
const addCategory = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        const newCategory = new mongoose_1.categoryModel(category);
        yield newCategory.save();
        return res.send("category added");
    }
    catch (error) {
        return res.send(error);
    }
});
exports.addCategory = addCategory;
