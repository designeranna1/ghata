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
const execa_1 = __importDefault(require("execa"));
const logger_1 = __importDefault(require("../logger"));
function initializeGhost(ghostPath, auto) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!auto)
            return;
        const contentPath = path_1.default.join(ghostPath, '..', 'content');
        const contentOrigPath = path_1.default.join(ghostPath, '..', 'content.orig');
        const files = yield (yield fs_1.promises.readdir(contentPath)).length;
        if (files < 1) {
            logger_1.default.verbose(`Initializing Ghost's content directory`);
            yield execa_1.default.command(`cp -r ${path_1.default.join(contentOrigPath, '*')} "${contentPath}"`);
        }
    });
}
exports.default = initializeGhost;
