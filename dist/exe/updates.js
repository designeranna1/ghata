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
const update_notifier_1 = __importDefault(require("update-notifier"));
function updateCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const appData = require('../../package.json');
        const updater = update_notifier_1.default({
            pkg: appData,
            updateCheckInterval: 1,
        });
        yield updater.fetchInfo();
        updater.notify({
            isGlobal: true,
            defer: false,
            boxenOptions: {
                borderStyle: 'bold',
                borderColor: 'cyanBright',
                align: 'center',
                padding: 1,
                margin: 1,
            },
        });
    });
}
exports.default = updateCheck;
