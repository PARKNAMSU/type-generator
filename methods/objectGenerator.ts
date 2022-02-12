class ObjectGenerator {
  static instance: ObjectGenerator;

  static getInstance(): ObjectGenerator {
    if (!this.instance) this.instance = new ObjectGenerator();
    return this.instance;
  }

  // 배열 타입 생성기
  generateArrayType(arr: Array<any>, key: string): string {
    let returnStr: string = `\t${key}:Array<`;

    //Object 상속받은 타입 생성
    let typeReturn = (el: any): string => {
      return ["object", "function"].includes(typeof el)
        ? Object.prototype.toString.call(el).slice(8, -1)
        : typeof el;
    };
    let typeArr: Array<string> = [typeReturn(arr[0])];
    let ckType: string = typeReturn(arr[0]);

    // 배열 타입 종류 확인
    arr.forEach((item): void => {
      let typeName: string = typeReturn(item);
      if (ckType !== typeName && !typeArr.includes(typeName)) {
        typeArr.push(typeName);
        ckType = typeName;
      }
    });

    if (typeArr.length === 1) return `\t${key}:Array<${typeArr[0]}>;\n`;

    typeArr.forEach((item: string): void => {
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
  generateFunctionType(fnToStr: string): string {
    let sliceIdx: number = fnToStr.indexOf("(");
    let returnStr: string = `\t${fnToStr.slice(0, sliceIdx)}(`;

    // 인자 찾아서 타입 지정
    while (true) {
      let commIdx: number = fnToStr.indexOf(",", sliceIdx);
      if (commIdx === -1) {
        returnStr += `${fnToStr.slice(
          sliceIdx,
          fnToStr.indexOf(")")
        )}: any): any;\n`;
        break;
      }
      returnStr += `${fnToStr.slice(sliceIdx + 1, commIdx)}: any ,`;
      sliceIdx = commIdx + 1;
      console.log(returnStr);
    }

    return returnStr;
  }
}

export default ObjectGenerator.getInstance();
export { ObjectGenerator };
