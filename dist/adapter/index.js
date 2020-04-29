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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const ghost_storage_base_1 = __importDefault(require("ghost-storage-base"));
const save_1 = __importDefault(require("./save"));
module.exports = class Ghata extends ghost_storage_base_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this.s3 = new aws_sdk_1.default.S3({
            endpoint: options.endpoint,
            accessKeyId: options.key,
            secretAccessKey: options.secret,
            sslEnabled: true,
        });
    }
    save(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield save_1.default(this.s3, this.options, file);
        });
    }
    serve() {
        return function (req, res, next) {
            next();
        };
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.reject('not implemented');
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            true;
        });
    }
};
