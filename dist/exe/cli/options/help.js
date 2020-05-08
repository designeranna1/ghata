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
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const index_1 = __importDefault(require("./index"));
const sections = [
    {
        content: `:honey_pot: ${chalk_1.default.bold.whiteBright('ghata')} is a :amphora: storage :electric_plug: adapter written\n for :ghost: Ghost to store :file_folder: assets in a :ocean: Digital Ocean :milky_way: Space.`,
    },
    {
        optionList: index_1.default,
    },
    {
        content: `${chalk_1.default.bold.whiteBright('Project home')} https://github.com/vasanthdeveloper/ghata\nDeveloped, designed and maintained by ${chalk_1.default.bold.whiteBright('Vasanth Developer')}.\nA software released in :sparkling_heart: and open source.`,
    },
];
function help() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(node_emoji_1.default.emojify(command_line_usage_1.default(sections)));
        process.exit(0);
    });
}
exports.default = help;
