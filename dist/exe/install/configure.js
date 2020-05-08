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
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../logger"));
function configureGhost(ghostPath, config, data) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.verbose('Configuring Ghost to use ghata');
        logger_1.default.verbose(`Writing to ${config}`);
        const configFile = JSON.parse((yield fs_1.default.promises.readFile(config, {
            encoding: 'UTF-8',
        })));
        configFile['storage'] = {
            active: 'ghata',
            ghata: {
                endpoint: data.endpoint,
                subdomain: data.subdomain,
                spacePath: data.path,
                bucket: data.bucket,
                key: data.key,
                secret: data.secret,
            },
        };
        yield fs_1.default.promises.writeFile(config, JSON.stringify(configFile, null, 4), {
            encoding: 'UTF-8',
        });
    });
}
exports.default = configureGhost;
