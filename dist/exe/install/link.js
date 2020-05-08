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
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../logger"));
function linkAdapter(ghostPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const adapterIsIn = path_1.default.join(ghostPath, 'node_modules', 'ghata', 'dist', 'adapter');
        const toBeInstalledIn = path_1.default.join(ghostPath, 'core', 'server', 'adapters', 'storage', 'ghata');
        logger_1.default.verbose(`Linking adapter from "${adapterIsIn}" to "${toBeInstalledIn}".`);
        try {
            yield fs_1.default.promises.symlink(adapterIsIn, toBeInstalledIn);
        }
        catch (e) {
            if (e.message.startsWith('EEXIST')) {
                yield fs_1.default.promises.unlink(toBeInstalledIn);
                yield fs_1.default.promises.symlink(adapterIsIn, toBeInstalledIn);
            }
            else {
                logger_1.default.warning(`Failed to link adapter "${e.message}"`);
            }
        }
    });
}
exports.default = linkAdapter;
