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
const command_line_args_1 = __importDefault(require("command-line-args"));
const options_1 = __importDefault(require("./options"));
const help_1 = __importDefault(require("./options/help"));
const version_1 = __importDefault(require("./options/version"));
const appData = require(path_1.default.join(__dirname, '..', '..', '..', 'package.json'));
function parse() {
    return __awaiter(this, void 0, void 0, function* () {
        const parsed = command_line_args_1.default(options_1.default);
        if (parsed['help']) {
            yield help_1.default();
        }
        if (parsed['version']) {
            yield version_1.default(appData);
        }
        return parsed;
    });
}
exports.default = parse;
