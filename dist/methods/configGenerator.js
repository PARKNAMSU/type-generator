"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigGenerator = void 0;
let fs = require("fs");
// tsConfig 생성기 - 미완
class ConfigGenerator {
    static getInstance() {
        if (!this.instance)
            this.instance = new ConfigGenerator();
        return this.instance;
    }
    generateConfig(include, exclude, options) {
        let configStr = `{
 "compilerOptions": {
    "allowJs": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    `;
        let strictStr = `
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,`;
        let libStr = `["ES2015", "DOM", "DOM.Iterable"]`;
        let moduleStr = `"module": "commonjs"`;
        for (let key in options) {
            if (key === "isStrict") {
                configStr += options[key] ? `\n\t${strictStr}` : "";
                continue;
            }
            if (key === "lib" || key === "module") {
                if (key === "lib" && !options[key]) {
                    configStr += `\n\t${libStr},`;
                    continue;
                }
                if (key === "module" && !options[key]) {
                    configStr += `\n\t${moduleStr},`;
                    continue;
                }
            }
            if (key === "target" || key === "outDir") {
                let temp = `"${key}": "${options[key]}"`;
                configStr += `\n\t${temp},`;
            }
        }
        configStr += `\n },`;
        configStr += `\n "include": ${this.arrayToString(include)},`;
        configStr += `\n "exclude": ${this.arrayToString(exclude)}`;
        configStr += `\n}`;
        let exist = fs.existsSync("./tsconfig.json");
        if (exist)
            return false;
        let file = fs.openSync("./tsconfig.json", "a+");
        fs.appendFileSync("./tsconfig.json", configStr);
        fs.closeSync(file);
        return true;
    }
    arrayToString(array) {
        let a = `[`;
        array.forEach((item) => {
            a += `"${item}",`;
        });
        a += `]`;
        return a;
    }
}
exports.ConfigGenerator = ConfigGenerator;
module.exports = ConfigGenerator.getInstance();
exports.default = ConfigGenerator.getInstance();
