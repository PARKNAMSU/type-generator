// import configGenerator, { ConfigGenerator } from "./methods/configGenerator";
// import objectGenerator, { ObjectGenerator } from "./methods/objectGenerator";
let { objectGenerator, ObjectGenerator } = require("./methods/objectGenerator");
let { configGenerator, ConfigGenerator } = require("./methods/configGenerator");
let { tsAuthInstall, TsAuthInstall } = require("./methods/tsAuthInstall");
let fs = require("fs");
// typeScript 타입 생성기
class TypeGenerator {
  static instance: TypeGenerator;
  configGenerator = configGenerator;
  tsAuthInstall = tsAuthInstall;
  static getInstance(): TypeGenerator {
    if (!this.instance) this.instance = new TypeGenerator();

    return this.instance;
  }

  /*
    타입 생성기

    fileName: 저장할 파일 이름
    data: 타입 생성할 객체
    typeName: 인터페이스 이름
  */
  generator(fileName: string, data: any, typeName: string) {
    let exist: boolean = fs.existsSync("./type/" + fileName);
    let existDir: boolean = fs.existsSync("./type");
    if (!exist) {
      existDir ? null : fs.mkdirSync("./type");
      //fs.writeFileSync("./type/" + fileName, "");
    }
    let file = fs.openSync("./type/" + fileName, "a+");

    let read = fs.readFileSync("./type/" + fileName, "utf8");
    if (!read.includes("interface " + typeName))
      fs.appendFileSync("./type/" + fileName, this.makeType(data, typeName));

    fs.closeSync(file);
  }

  /*
    Type 생성 메서드
    
    data: 파싱할 데이터
    typeName: 인터페이스 이름
  */
  private makeType(data: Object | any, typeName: string): string {
    let type = `interface ${typeName}{\n`;
    for (let key in data) {
      if (["object", "function"].includes(typeof data[key])) {
        let propertyType = Object.prototype.toString
          .call(data[key])
          .slice(8, -1);
        switch (propertyType) {
          case "Array":
            type += objectGenerator.generateArrayType(data[key], key);
            break;
          case "Function":
            console.log("fn");
            type += objectGenerator.generateFunctionType(data[key].toString());
            break;
          default:
            type += `\t${key}:${propertyType};\n`;
            break;
        }
      } else type += `\t${key}:${typeof data[key]};\n`;
    }
    type += "}";
    return type;
  }
}

export default TypeGenerator.getInstance();

export { TypeGenerator };

module.exports = { TypeGenerator, typeGene: TypeGenerator.getInstance() };
