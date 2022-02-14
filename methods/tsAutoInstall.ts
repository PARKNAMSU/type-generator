const shellJs = require("shelljs");

class TsAutoInstall {
  static instance: TsAutoInstall;

  static getInstance(): TsAutoInstall {
    if (!this.instance) this.instance = new TsAutoInstall();
    return this.instance;
  }

  setTsModule(installOption: string) {
    // "D" , "G" , "N"
    let installOpt = installOption === "N" ? "--save" : "-" + installOption;
    shellJs.exec(`npm i typescript ${installOpt}`);
    shellJs.exec(`npm i @types/node ${installOpt}`);
    shellJs.exec(`npm i @types/express ${installOpt}`);
    shellJs.exec(`npm i ts-node ${installOpt}`);
  }
}

export default TsAutoInstall.getInstance();
export { TsAutoInstall };

module.exports = TsAutoInstall.getInstance();
