# TypeScript Type Generator(개발중)

<br>

## 모듈 호출

### NPM Install

```
npm install type-gene
```

### Require 함수

```typescript
let typeGenerator = require("type-gene");
```

### ES6 모듈

```typescript
import typeGenerator from "type-gene";
```

<br>

## 타입 스크립트 타입 생성 메서드

```typescript
typeGenerator.generator(fileName,data,typeName);
```

* fileName : 타입 생성 파일 저장할 이름 (./type/ 경로에 생성, 이미 파일이 있을경우 이어서 작성됨) 
* data : 타입 생성할 Object (반드시 객체 형태로 전송)
* typeName : 생성할 interface 타입 이름 (이미 존재할 경우 실행 취소)

<br>

## 타입 스크립트 Config 파일 생성 메서드

```typescript
typeGenerator.configGenerator.generateConfig(include,exclude,options);
```

* include : include 옵션에 사용할 변환할 타입스크립트 파일 목륵(배열로 전달)
* exclude : exclude 옵션에 사용할 타입 스크립트 파싱 제외할 파일 목록(배열로 전달)
* options : 설정 옵션들

**옵션**

```typescript
interface ConfigOptions {
  target: string; // ECMA 자바스크립트 버전
  outDir: string; // javascript 로 파싱한 파일 저장할 폴더
  lib?: Array<string>; // 사용할 라이브러리
  module?: string; // 모듈을 위한 코드 생성 설정: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'
  isStrict: boolean; // strict 모드 설정
}
```

