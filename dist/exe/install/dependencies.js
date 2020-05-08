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
const execa_1 = __importDefault(require("execa"));
const logger_1 = __importDefault(require("../logger"));
const dependencies_1 = __importDefault(require("../../adapter/dependencies"));
function addDependencies(ghostPath) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.verbose('Installing dependencies required for ghata');
        const deps = require('../../../package.json').devDependencies;
        const depsToInstall = [];
        dependencies_1.default.forEach((dep) => {
            const version = deps[dep].replace(/[^0-9a-zA-Z.]/g, '');
            depsToInstall.push(`${dep}@${version}`);
        });
        yield execa_1.default('npm', ['install', depsToInstall.join(' ')], {
            cwd: ghostPath,
        });
    });
}
exports.default = addDependencies;
