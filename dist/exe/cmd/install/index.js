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
const prompts_1 = __importDefault(require("./prompts"));
const index_1 = __importDefault(require("./auto/index"));
const install_1 = __importDefault(require("./install"));
function install(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const auto = options.auto;
        const exec = options.exec;
        let installData;
        if (!auto) {
            installData = yield prompts_1.default();
        }
        else {
            installData = yield index_1.default();
        }
        yield install_1.default(installData, auto, exec);
    });
}
exports.default = install;
