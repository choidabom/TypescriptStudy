# Chapter 02: 타입스크립트 프로젝트 생성과 관리
## 02-1 타입스크립트 프로젝트 만들기
- 타입스크립트 개발은 Node.js 프로젝트를 만든 다음, 개발 언어를 타입스크립트로 설정하는 방식으로 진행한다.
- 디렉터리를 하나 만들고 여기에 `package.json` 파일을 만드는 것으로 시작한다.
- 터미널에서 `npm init` 명령으로 `package.json` 파일을 생성한다.
```bash
npm init --y
```
```json
// package.json
{
  "name": "chapter02",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
- **package.json**
    - Node.js가 관리하는 패키지 관리 파일로 **프로젝트 정보와 관련 패키지가 기록된다.**
    - 이 파일을 이용해 프로젝트를 개발하고 실행하는 데 필요한 패키지를 관리할 수 있다. 


### 1. 프로젝트 생성자 관점에서 패키지 설치하기
- 프로젝트 구현에 필요한 다양한 오픈소스 패키지를 `npm install` 혹은 `npm i` 명령으로 설치한다.
- 이 옵션으로 설치하면 해당 패키지 정보가 `package.json` 파일에 자동으로 기록된다. 
- `-S`: 실행 시 필요 패키지
- `-D`: 개발 시 필요 패키지
```bash
# dependencies 항목에 등록 (프로젝트 실행할 때 필요한 패키지로 설치)
npm i --save 
npm i -S

# devDependencies 항목에 등록 (프로젝트 개발할 때만 필요한 패키지로 설치)
npm i --save-dev
npm i -D
```
- 타입스크립트 프로젝트는 보통 `typescript`와 `ts-node` 패키지를 설치한다. 
```bash
npm i -D typescript ts-node
```
- 타입스크립트는 기본적으로 ESNext 자바스크립트 문법을 포함하고 있지만, 자바스크립트와는 완전히 다른 언어이다.
- 즉, 자바스크립트 컴파일러는 `a => a + 1`과 같은 코드를 동작시킬 수는 있지만, 타입스크립트 컴파일러는 `(a: number): number => a + 1`처럼 타입이 명시적으로 설정되어 있어야만 코드가 문법에 맞게 작성되었는지를 검증해 코드를 동작시킨다.
- @types/가 앞에 붙는 타입 라이브러리들은 항상 `index.d.ts`라는 이름의 파일을 가지고 있으며, 타입스크립트 컴파일러는 이 파일의 내용을 바탕으로 chance, ramda와 같은 라이브러라가 제공하는 함수들을 올바르게 사용했는지 검증한다.
- 타입스크립트는 또한 웹 브라우저나 Node.js가 기본적으로 제공하는 타입들의 존재도 그냥은 알지 못한다.
- 예를 들어, Promise와 같은 타입을 사용하려면 `@types/node`라는 패키지를 설치해야 한다.
```bash
npm i -D @types/node
```

### 2. 프로젝트 이용자 관점에서 패키지 설치하기
- 프로젝트 만드는 과정에서 패키지 설치 시, 프로젝트 디렉터리 아래에 `node_modules` 디렉터리가 생기고, 여기에 해당 패키지가 설치된다.
- 보통 프로젝트 구현하면 `node_modules` 디렉터리의 크기가 매우 커지기 때문에, 다른 사람에게 프로젝트를 전달할 때는 `node_modules` 디렉터리를 모두 지운다. (git에 올릴 때는 `.gitignore` 처리를 해줘야한다. )
- 따라서 다른 사람이 작성한 프로젝트를 전달받아 이용할 때는 `package.json` 파일이 있는 디렉터리에서 다음 명령을 실행해야 한다. 
```bash
npm i
```

### 3. tsconfig.json 파일 만들기
- 타입스크립트 프로젝트는 타입스크립트 컴파일러의 설정 파일인 `tsconfig.json` 파일이 있어야 한다.
- 이 파일은 `tsc --init` 명령으로 만들 수 있다.
```bash
tsc --init
```
- 기본 tsconfig.json 파일은 실제 개발을 진행하는 데 필요한 많은 옵션이 비활성화되어 있다.
- 따라서 보통은 프로젝트에 필요한 옵션만 설정해서 간략하게 한다.
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "ES5",
    "moduleResolution": "node",
    "outDir": "dist",
    "baseUrl": ".",
    "sourceMap": true,
    "downlevelIteration": true,
    "noImplicitAny": false,
    "paths": { "*": ["node_modules/*"] }
  },
  "include": ["src/**/*"]
}
```
- 위와 같은 내용으로 작성된 `tsconfig.json` 파일을 기본 설정 파일로 적용한다. 

### 4. src 디렉터리와 소스 파일 만들기

### 5. package.json 수정
- 타입스크립트 프로젝트를 개발할 때는 `ts-node`를 사용하지만, 막상 개발이 완료되면 타입스크립트 소스코드를 ES5 자바스크립트 코드로 변환해 `node`로 실행해야 한다.
- 그렇기 때문에 다음처럼 `package.json`의 `script` 항목에 `dev`와 `build` 명령을 추가한다. 

```json
{
    "name": "chapter02",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "src/index.js",
        "build": "tsc && node dist",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
  /* 생략 */

}
```
## 02-2 모듈 이해하기


## 02-3 tsconfig.json 파일 살펴보기


