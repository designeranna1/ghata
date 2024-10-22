#!/usr/bin/env node
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
const index_1 = __importDefault(require("./cli/index"));
const updates_1 = __importDefault(require("./updates"));
const index_2 = __importDefault(require("./prompts/index"));
const index_3 = __importDefault(require("./install/index"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = yield index_1.default();
        yield updates_1.default();
        const answers = yield index_2.default(args);
        yield index_3.default(answers, args);
    });
}
main();
