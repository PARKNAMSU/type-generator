"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectGenerator = void 0;
class ObjectGenerator {
    static getInstance() {
        if (!this.instance)
            this.instance = new ObjectGenerator();
        return this.instance;
    }
    /*
      배열 타입 생성기
      
      arr: 배열
      key: 프로퍼티 키
    */
    generateArrayType(arr, key) {
        let returnStr = `\t${key}:Array<`;
        //Object 상속받은 타입 생성
        let typeReturn = (el) => {
            return ["object", "function"].includes(typeof el)
                ? Object.prototype.toString.call(el).slice(8, -1)
                : typeof el;
        };
        let typeArr = [typeReturn(arr[0])];
        let ckType = typeReturn(arr[0]);
        // 배열 타입 종류 확인
        arr.forEach((item) => {
            let typeName = typeReturn(item);
            if (ckType !== typeName && !typeArr.includes(typeName)) {
                typeArr.push(typeName);
                ckType = typeName;
            }
        });
        if (typeArr.length === 1)
            return `\t${key}:Array<${typeArr[0]}>;\n`;
        typeArr.forEach((item) => {
            returnStr += ` ${item} |`;
        });
        returnStr = returnStr.slice(0, returnStr.length - 1);
        returnStr += `>;\n`;
        return returnStr;
    }
    /*
      함수 타입 생성기 - 현재 모든 인자와 리턴 타입을 any 타입으로밖에 지정 못함
  
      fnToStr = 함수의 toString
    */
    generateFunctionType(fnToStr) {
        let sliceIdx = fnToStr.indexOf("(");
        let returnStr = `\t${fnToStr.slice(0, sliceIdx)}(`;
        // 인자 찾아서 타입 지정
        while (true) {
            let commIdx = fnToStr.indexOf(",", sliceIdx);
            if (commIdx === -1) {
                returnStr += `${fnToStr.slice(sliceIdx, fnToStr.indexOf(")"))}: any): any;\n`;
                break;
            }
            returnStr += `${fnToStr.slice(sliceIdx + 1, commIdx)}: any ,`;
            sliceIdx = commIdx + 1;
            console.log(returnStr);
        }
        return returnStr;
    }
}
exports.ObjectGenerator = ObjectGenerator;
exports.default = ObjectGenerator.getInstance();
module.exports = {
    objectGenerator: ObjectGenerator.getInstance(),
    ObjectGenerator,
};
