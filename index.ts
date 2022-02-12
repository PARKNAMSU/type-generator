import fs from "fs";
import configGenerator, { ConfigGenerator } from "./methods/configGenerator";

class TypeGenerator {
  static instance: TypeGenerator;
  configGenerator: ConfigGenerator = configGenerator;
  static getInstance(): TypeGenerator {
    if (!this.instance) this.instance = new TypeGenerator();

    return this.instance;
  }
  generator(fileName: string, data: any, typeName: string) {
    let exist: boolean = fs.existsSync("./type/" + fileName);
    let existDir: boolean = fs.existsSync("./type");
    if (!exist) {
      existDir ? null : fs.mkdirSync("./type");
      //fs.writeFileSync("./type/" + fileName, "");
    }
    let file = fs.openSync("./type/" + fileName, "a+");

    let read = fs.readFileSync("./type/" + fileName, "utf8");
    console.log(read);
    if (!read.includes("interface " + typeName))
      fs.appendFileSync("./type/" + fileName, this.makeType(data, typeName));

    fs.closeSync(file);
  }
  private generateArrayType(arr: Array<any>, key: string): string {
    let returnStr = "\t";
    let ckType = arr[0];
    return `\t${key}:Array<any>;\n`;
  }
  private makeType(data: Object | any, typeName: string): string {
    let type = `interface ${typeName}{\n`;
    for (let key in data) {
      if (["object", "function"].includes(typeof data[key])) {
        let propertyType = Object.prototype.toString
          .call(data[key])
          .slice(8, -1);
        switch (propertyType) {
          case "Array":
            type += this.generateArrayType(data[key], key);
            break;
          case "Function":
            console.log(data[key].toString());
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
