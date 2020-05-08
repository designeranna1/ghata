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
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("../logger"));
const prompts_1 = require("../prompts");
const validation_1 = require("../prompts/validation");
function validateEnvironment() {
    return __awaiter(this, void 0, void 0, function* () {
        const variables = ['config', 'endpoint', 'bucket', 'path', 'key', 'secret'];
        let returnable = null;
        variables.forEach((variable) => {
            const varString = `GHATA_${variable.toUpperCase()}`;
            if (variable == 'secret') {
                logger_1.default.verbose(`${varString}  ${chalk_1.default.gray('[hidden]')}`);
            }
            else {
                logger_1.default.verbose(`${varString}  ${chalk_1.default.blueBright(process.env[varString])}`);
            }
            if (!process.env[varString]) {
                returnable = varString;
                return;
            }
        });
        return returnable;
    });
}
function auto() {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield validateEnvironment();
        if (exists)
            logger_1.default.error(`Required environment variable "${exists}" not set.`, 4);
        const valid = yield validation_1.vPath(process.cwd());
        if (valid != true)
            logger_1.default.error(`This isn't a Ghost installation directory. Please run this command in the directory where you have installed Ghost.`);
        return {
            installation: path_1.default.join(process.cwd(), 'current'),
            config: process.env.GHATA_CONFIG,
            data: {
                subdomain: prompts_1.makeSubdomain(process.env.GHATA_SUBDOMAIN, process.env.GHATA_ENDPOINT, process.env.GHATA_BUCKET),
                endpoint: process.env.GHATA_ENDPOINT,
                bucket: process.env.GHATA_BUCKET,
                path: process.env.GHATA_PATH,
                key: process.env.GHATA_KEY,
                secret: process.env.GHATA_SECRET,
            },
        };
    });
}
exports.default = auto;
