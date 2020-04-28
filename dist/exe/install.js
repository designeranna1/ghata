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
const loops_1 = require("../utilities/loops");
const logger_1 = __importDefault(require("./logger"));
function install(install) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolved = path_1.default.resolve(install);
        const versions = path_1.default.join(resolved, 'versions');
        const compatibleVersions = [];
        yield loops_1.forEach(yield fs_1.promises.readdir(versions), (version) => {
            if (version.startsWith('3.')) {
                const versionPath = path_1.default.join(versions, version);
                compatibleVersions.push(versionPath);
            }
        });
        const adapterPath = path_1.default.join(__dirname, '..', 'adapter');
        yield loops_1.forEach(compatibleVersions, (version) => __awaiter(this, void 0, void 0, function* () {
            const installPath = path_1.default.join(version, 'core', 'server', 'adapters', 'storage', 'ghata');
            try {
                yield fs_1.promises.symlink(adapterPath, installPath);
            }
            catch (_a) {
                logger_1.default.warning(`A version of ghata is already installed on ${path_1.default.basename(version)}`);
            }
        }));
    });
}
exports.default = install;
