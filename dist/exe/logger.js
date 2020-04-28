"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const itivrutaha_1 = __importDefault(require("itivrutaha"));
exports.default = itivrutaha_1.default.createNewLogger({
    theme: ':type :message',
});
exports.logger = itivrutaha_1.default.createNewLogger({
    theme: `[:time] ${chalk_1.default.yellowBright.bold('GHATA')} :type :message`,
});
