"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGenerator = void 0;
// import configGenerator, { ConfigGenerator } from "./methods/configGenerator";
// import objectGenerator, { ObjectGenerator } from "./methods/objectGenerator";
let { objectGenerator, ObjectGenerator } = require("./methods/objectGenerator");
let { configGenerator, ConfigGenerator } = require("./methods/configGenerator");
let fs = require("fs");
// typeScript 타입 생성기
class TypeGenerator {
    constructor() {
        this.configGenerator = configGenerator;
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new TypeGenerator();
        return this.instance;
    }
    /*
      타입 생성기
  
      fileName: 저장할 파일 이름
      data: 타입 생성할 객체
      typeName: 인터페이스 이름
    */
    generator(fileName, data, typeName) {
        let exist = fs.existsSync("./type/" + fileName);
        let existDir = fs.existsSync("./type");
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
    makeType(data, typeName) {
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
            }
            else
                type += `\t${key}:${typeof data[key]};\n`;
        }
        type += "}";
        return type;
    }
}
exports.TypeGenerator = TypeGenerator;
exports.default = TypeGenerator.getInstance();