"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEnvironmentVariableIsOmitted = exports.NullOutstreamStringWritable = exports.getCurrentTime = exports.giveExecutablePermissionsToFile = exports.deleteFile = exports.createScriptFile = exports.TEMP_DIRECTORY = void 0;
const stream = require("stream");
const exec = __importStar(require("@actions/exec"));
const core = __importStar(require("@actions/core"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
exports.TEMP_DIRECTORY = process.env.RUNNER_TEMP || os.tmpdir();
exports.createScriptFile = (inlineScript) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = `AZ_CLI_GITHUB_ACTION_${exports.getCurrentTime().toString()}.sh`;
    const filePath = path.join(exports.TEMP_DIRECTORY, fileName);
    fs.writeFileSync(filePath, `${inlineScript}`);
    yield exports.giveExecutablePermissionsToFile(filePath);
    return fileName;
});
exports.deleteFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
        }
        catch (err) {
            core.warning(err.toString());
        }
    }
});
exports.giveExecutablePermissionsToFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () { return yield exec.exec(`chmod +x ${filePath}`, [], { silent: true }); });
exports.getCurrentTime = () => {
    return new Date().getTime();
};
class NullOutstreamStringWritable extends stream.Writable {
    constructor(options) {
        super(options);
    }
    _write(data, encoding, callback) {
        if (callback) {
            callback();
        }
    }
}
exports.NullOutstreamStringWritable = NullOutstreamStringWritable;
;
exports.checkIfEnvironmentVariableIsOmitted = (key) => {
    const omitEnvironmentVariables = [
        'LANG',
        'HOSTNAME',
        'PWD',
        'HOME',
        'PYTHON_VERSION',
        'PYTHON_PIP_VERSION',
        'SHLVL',
        'PATH',
        'GPG_KEY',
        'CONDA',
        'AGENT_TOOLSDIRECTORY',
        'RUNNER_PERFLOG',
        'RUNNER_WORKSPACE',
        'RUNNER_TEMP',
        'RUNNER_TRACKING_ID',
        'RUNNER_TOOL_CACHE',
        'DOTNET_SKIP_FIRST_TIME_EXPERIENCE',
        'JOURNAL_STREAM',
        'DEPLOYMENT_BASEPATH',
        'VCPKG_INSTALLATION_ROOT',
        'PERFLOG_LOCATION_SETTING'
    ];
    const omitEnvironmentVariablesWithPrefix = [
        'JAVA_',
        'LEIN_',
        'M2_',
        'BOOST_',
        'GOROOT',
        'ANDROID_',
        'GRADLE_',
        'ANT_',
        'CHROME',
        'SELENIUM_',
        'INPUT_'
    ];
    for (let i = 0; i < omitEnvironmentVariables.length; i++) {
        if (omitEnvironmentVariables[i] === key.toUpperCase()) {
            return true;
        }
    }
    return omitEnvironmentVariablesWithPrefix.some((prefix) => key.toUpperCase().startsWith(prefix));
};
//# sourceMappingURL=utils.js.map