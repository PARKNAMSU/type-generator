"use strict";
const shellJs = require("shelljs");
class TsAuthInstall {
    static getInstance() {
        if (!this.instance)
            this.instance = new TsAuthInstall();
        return this.instance;
    }
    setTsModule() {
        shellJs.exec("npm install typescript --save");
    }
}
module.exports = { tsAuthInstall: TsAuthInstall.getInstance(), TsAuthInstall };
