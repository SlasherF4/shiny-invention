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
exports.verifyUser = exports.loginUser = void 0;
const mongoose_1 = require("../mongoose");
const jwt_1 = require("../middlewares/jwt");
const loginUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(403);
        }
        const login = yield mongoose_1.userModel.find({ email, password });
        if (login.length > 0) {
            const token = (0, jwt_1.generateToken)({ email });
            return res.send({ token });
        }
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.loginUser = loginUser;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers.authorization;
        if (header) {
            const token = header.split(" ")[1];
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded) {
                return res.sendStatus(403);
            }
            const verify = yield mongoose_1.userModel.findOne({ email: decoded.email });
            if (verify)
                return next();
            return res.sendStatus(403);
        }
        return res.sendStatus(403);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.verifyUser = verifyUser;
