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
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
function version(appData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(node_emoji_1.default.emojify(`:honey_pot: ${chalk_1.default.bold.whiteBright('ghata')} v${appData.version}`));
        console.log(`${chalk_1.default.bold('Project home')} https://github.com/vasanthdeveloper/ghata`);
        console.log(`Developed, designed and maintained by ${chalk_1.default.bold.whiteBright('Vasanth Developer')}.`);
        console.log(node_emoji_1.default.emojify(`A software released in :sparkling_heart: and open source.`));
        process.exit(0);
    });
}
exports.default = version;
