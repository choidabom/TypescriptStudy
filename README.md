### 타입스크립트 프로젝트 초기 설정

1. `npm init`: `package.json`파일 생성
2. `npm install`: 프로젝트 구현에 필요한 패키지 설치
3. `npm i -D typescript ts-node`: 타입스크립트 프로젝트에서 필요로한 패키지 설치
4. `npm i @types/node`: Promise와 같은 타입 사용하려면 @types/node 패키지 설치 
5. `tsc --init`: 타입스크립트 컴파일러의 설정 파일 생성 (tsconfig.json 생성됨)
6. 필요 폴더와 파일 생성
    - `mkdir build`: build된 파일 넣은 build 폴더 생성
    - `mkdir src`: src 파일 넣을 src 폴더 생성
    - `src > index.ts`: index.ts 파일 생성
7. `tsconfig.json`에서 `outDir: ./build` 수정
8. `tsconfig.json`에서 `"include": "src/**/*"` 추가
9. [`tsconfig.json` 추가 수정 사항 참고](https://github.com/choidabom/TypescriptStudy/tree/main/Chapter02)
10. `package.json` 수정 - `npm run 명령`으로 사용
    ```typescript
    "scripts": {
        "dev": "ts-node src",
        "build": "tsc ",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```