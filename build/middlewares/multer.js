"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination(_req, _file, callback) {
        callback(null, "public");
    },
    filename(_req, file, callback) {
        const ext = file.originalname.split(".")[1];
        callback(null, (0, uuid_1.v4)() + "." + ext);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
