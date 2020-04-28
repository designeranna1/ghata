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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
function upload(params, s3) {
    return new Promise((resolve, reject) => {
        s3.upload(params, {}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
function save(s3, options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(options.spacePath, moment_1.default().format('YYYY'), moment_1.default().format('MMMM'), moment_1.default().format('Do'), file.originalname);
        const fileData = fs_1.default.readFileSync(file.path);
        yield upload({
            Body: fileData,
            Bucket: options.bucket,
            Key: filePath,
            ContentType: file.mimetype,
            ACL: 'public-read',
        }, s3);
        return `https://${options.subdomain}/${filePath}`;
    });
}
exports.default = save;
