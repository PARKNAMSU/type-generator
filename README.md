# TypeScript Type Generator

<br>

## 모듈 호출

### Require 함수

```javascript
let typeGenerator = require("./type-generator/index");
```

### ES6 모듈

```javascript
import typeGenerator from "./type-generator/index";
```

<br>

## 타입 생성 메서드

```javascript
typeGenerator.generator(fileName,data,typeName);
```

* fileName : 타입 생성 파일 저장할 이름 (./type/ 경로에 생성, 이미 파일이 있을경우 이어서 작성됨) 
* data : 타입 생성할 Object (반드시 객체 형태로 전송)
* typeName : 생성할 interface 타입 이름 (이미 존재할 경우 실행 취소)
