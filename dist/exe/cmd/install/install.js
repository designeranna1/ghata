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
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = __importDefault(require("execa"));
const loops_1 = require("../../../utilities/loops");
const logger_1 = __importDefault(require("../../logger"));
function install(answers, auto, execString) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default({
            hideCursor: true,
            text: 'Installing 🍯 ghata',
        });
        if (!auto) {
            spinner.start();
        }
        const resolved = path_1.default.resolve(answers.path);
        const versions = path_1.default.join(resolved, 'versions');
        const compatibleVersions = [];
        yield loops_1.forEach(yield fs_1.promises.readdir(versions), (version) => {
            if (version.startsWith('3.')) {
                const versionPath = path_1.default.join(versions, version);
                compatibleVersions.push(versionPath);
            }
        });
        let adapterPath;
        if (auto) {
            adapterPath = path_1.default.join(__dirname, '..', '..', '..', 'adapter');
        }
        else {
            adapterPath = path_1.default.join(__dirname, '..', 'adapter');
        }
        yield loops_1.forEach(compatibleVersions, (version) => __awaiter(this, void 0, void 0, function* () {
            const installPath = path_1.default.join(version, 'core', 'server', 'adapters', 'storage', 'ghata');
            try {
                yield fs_1.promises.symlink(adapterPath, installPath);
            }
            catch (_b) {
                true;
            }
        }));
        const config = JSON.parse((yield fs_1.promises.readFile(answers.config, { encoding: 'UTF-8' })));
        config['storage'] = {
            active: 'ghata',
            ghata: {
                endpoint: answers.endpoint,
                subdomain: answers.subdomain,
                spacePath: answers.spacePath,
                bucket: answers.bucketName,
                key: answers.spaceKey,
                secret: answers.secretKey,
            },
        };
        yield fs_1.promises.writeFile(answers.config, JSON.stringify(config, null, 4), {
            encoding: 'UTF-8',
        });
        if (!auto) {
            try {
                yield execa_1.default('ghost', ['restart']);
            }
            catch (_a) {
                true;
            }
        }
        if (!auto) {
            spinner.stopAndPersist({
                text: 'Finished installing 🍯 ghata',
                symbol: chalk_1.default.greenBright.bold('✓'),
            });
        }
        else {
            logger_1.default.success('Finished 💿 installing 🍯 ghata storage 🔌 adapter for 👻 Ghost');
        }
        if (auto) {
            const exe = execa_1.default.command(execString);
            exe.stdout.pipe(process.stdout);
            exe.stderr.pipe(process.stderr);
        }
    });
}
exports.default = install;
