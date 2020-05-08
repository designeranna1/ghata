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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const loops_1 = require("../../utilities/loops");
function vPath(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolved = path_1.default.resolve(input);
        if (!fs_1.existsSync(resolved))
            return "The provided path doesn't exist or is invalid.";
        if (!(yield (yield fs_1.promises.lstat(resolved)).isDirectory()))
            return "The provided path isn't a directory";
        const containing = ['content', 'versions', 'current'];
        const error = yield loops_1.forEach(containing, file => {
            const filePath = path_1.default.join(resolved, file);
            if (!fs_1.existsSync(filePath))
                return "The provided path isn't a Ghost installation one.";
        });
        if (error)
            return error;
        return true;
    });
}
exports.vPath = vPath;
function vSpacePath(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const absolute = path_1.default.isAbsolute(input);
        if (absolute)
            return 'Absolute paths are not valid.';
        return true;
    });
}
exports.vSpacePath = vSpacePath;
