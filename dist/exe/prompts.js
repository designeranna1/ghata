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
const glob_1 = require("glob");
const inquirer_1 = __importDefault(require("inquirer"));
const validation_1 = require("./validation");
const loops_1 = require("../utilities/loops");
function ask() {
    return __awaiter(this, void 0, void 0, function* () {
        const installPath = yield inquirer_1.default.prompt({
            name: 'value',
            type: 'input',
            validate: validation_1.vPath,
            message: 'What is the path of Ghost installation?',
        });
        const configGlob = path_1.default.join(path_1.default.resolve(installPath.value), '*.json');
        const configFiles = [];
        yield loops_1.forEach(glob_1.sync(configGlob), (jsonFile) => {
            configFiles.push({
                name: path_1.default.basename(jsonFile),
                value: jsonFile,
            });
        });
        const configFile = yield inquirer_1.default.prompt({
            name: 'value',
            type: 'list',
            message: 'In which config file should ghata be installed?',
            choices: configFiles,
        });
        const additionalAnswers = yield inquirer_1.default.prompt([
            {
                name: 'endpoint',
                type: 'input',
                message: 'What is the endpoint of the Digital Ocean space?',
            },
            {
                name: 'bucketName',
                type: 'input',
                message: 'What is the unique name of the Space?',
            },
            {
                name: 'spacePath',
                type: 'input',
                validate: validation_1.vSpacePath,
                message: 'Where would you like to store data on the space?',
            },
            {
                name: 'hasSubdomain',
                type: 'confirm',
                message: 'Does this Space have a subdomain?',
            },
            {
                name: 'subdomain',
                type: 'input',
                when: (prev) => prev.hasSubdomain,
                message: 'What is the subdomain of this Space?',
            },
            {
                name: 'apiKey',
                type: 'input',
                message: 'What is the Spaces key from Digital Ocean?',
            },
            {
                name: 'secretKey',
                type: 'password',
                message: 'What is the secret Spaces key from Digital Ocean?',
            },
        ]);
        const returnable = {
            path: installPath.value,
            config: configFile.value,
            endpoint: additionalAnswers.endpoint,
            bucketName: additionalAnswers.bucketName,
            spacePath: additionalAnswers.spacePath,
            subdomain: additionalAnswers.hasSubdomain == true
                ? additionalAnswers.subdomain
                : `${additionalAnswers.bucketName}.${additionalAnswers.endpoint}`,
            spaceKey: additionalAnswers.apiKey,
            secretKey: additionalAnswers.secretKey,
        };
        return returnable;
    });
}
exports.default = ask;
