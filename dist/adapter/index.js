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
const ghost_storage_base_1 = __importDefault(require("ghost-storage-base"));
module.exports = class Ghata extends ghost_storage_base_1.default {
    constructor(options) {
        console.log(options);
        super(options);
    }
    save(image, targetDir) {
        return __awaiter(this, void 0, void 0, function* () {
            return 'https://static.vasanthdeveloper.com/image.png';
        });
    }
    serve() {
        return function (req, res, next) {
            next();
        };
    }
    exists(fileName, targetDir) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.reject('not implemented');
        });
    }
    read(options) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
