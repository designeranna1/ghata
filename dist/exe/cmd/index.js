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
const sade_1 = __importDefault(require("sade"));
const logger_1 = __importDefault(require("../logger"));
const index_1 = __importDefault(require("./install/index"));
const app = sade_1.default('ghata');
const packageInfo = require(path_1.default.join(__dirname, '..', '..', '..', 'package.json'));
function parse() {
    return __awaiter(this, void 0, void 0, function* () {
        app.version(packageInfo.version);
        app.describe(packageInfo.description.substring(8));
        app.example('install --auto');
        app.command('install', 'Installs storage adapter on all supported versions of Ghost')
            .option('--auto', 'Use environment variables instead of interactive prompts')
            .action(index_1.default);
        app.parse(process.argv, {
            unknown: arg => logger_1.default.error(`Unknown argument "${arg}".`, 3),
        });
    });
}
exports.default = parse;
