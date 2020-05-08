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
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("../logger"));
const dependencies_1 = __importDefault(require("./dependencies"));
const install_1 = __importDefault(require("./install"));
const link_1 = __importDefault(require("./link"));
const configure_1 = __importDefault(require("./configure"));
const restore_1 = __importDefault(require("./restore"));
function startInstallation(answers, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default({
            hideCursor: true,
            text: 'Installing 🍯 ghata',
        });
        if (!options.auto && !options.verbose) {
            spinner.start();
        }
        spinner.text = 'Adding dependencies to 👻 Ghost';
        yield dependencies_1.default(answers.installation);
        spinner.text = 'Installing 🍯 ghata to 👻 Ghost';
        yield install_1.default(answers.installation);
        spinner.text = 'Linking the 🔌 adapter';
        yield link_1.default(answers.installation);
        spinner.text = 'Configuring 👻 Ghost to use 🍯 ghata';
        yield configure_1.default(answers.installation, answers.config, answers.data);
        spinner.text = `Reinstalling 👻 Ghost's dependencies`;
        yield restore_1.default(answers.installation);
        if (!options.auto && !options.verbose) {
            spinner.stopAndPersist({
                text: 'Finished installing 🍯 ghata',
                symbol: chalk_1.default.greenBright.bold('✓'),
            });
        }
        else {
            logger_1.default.success('Finished 💿 installing 🍯 ghata storage 🔌 adapter for 👻 Ghost');
        }
    });
}
exports.default = startInstallation;
