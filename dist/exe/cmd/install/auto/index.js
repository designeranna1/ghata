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
const logger_1 = __importDefault(require("../../../logger"));
function checkIfEnvExist() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.GHATA_CONFIG)
            return 'GHATA_CONFIG';
        if (!process.env.GHATA_ENDPOINT)
            return 'GHATA_ENDPOINT';
        if (!process.env.GHATA_BUCKET)
            return 'GHATA_BUCKET';
        if (!process.env.GHATA_SPACE_PATH)
            return 'GHATA_SPACE_PATH';
        if (!process.env.GHATA_KEY)
            return 'GHATA_KEY';
        if (!process.env.GHATA_SECRET)
            return 'GHATA_SECRET';
    });
}
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        const notExist = yield checkIfEnvExist();
        if (notExist)
            logger_1.default.error(`A required environment variable "${notExist}" was not provided.`, 4);
        const subdomain = process.env.GHATA_SUBDOMAIN
            ? process.env.GHATA_SUBDOMAIN
            : `${process.env.GHATA_BUCKET}.${process.env.GHATA_ENDPOINT}`;
        return {
            path: process.cwd(),
            config: process.env.GHATA_CONFIG,
            endpoint: process.env.GHATA_ENDPOINT,
            bucketName: process.env.GHATA_BUCKET,
            subdomain,
            spacePath: process.env.GHATA_SPACE_PATH,
            spaceKey: process.env.GHATA_KEY,
            secretKey: process.env.GHATA_SECRET,
        };
    });
}
exports.default = load;
