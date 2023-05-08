# Chapter 01: 타입스크립트와 개발 환경 만들기
## 01-1 타입스크립트란 무엇인가?

- 세 종류의 자바스크립트
    - ES5를 감싸고 있는 ESNext를 감싸고 있는 Typescript

### 자바스크립트에 타입 기능이 있으면 좋은 이유

- 오늘날 소프트웨어는 상당히 복잡하므로 여러 사람이 협력해 하나의 제품을 개발한다.
- 항상 코드를 작성한 쪽과 사용하는 쪽 사이에 커뮤니케이션이 중요하다.
- A라는 개발자가 다음과 같은 코드를 만들었다.

```jsx
function makePerson(name, age){}
```

- B라는 개발자가 이 코드를 이용하려고 다음 코드를 만들어 실행했을 때 오류가 발생했다면, B 개발자는 오류의 원인이 무엇인지 찾기 어렵다.

```jsx
makePerson(32, 'JACK')
```

- 그런데 처음 코드를 다음처럼 타입스크립트의 타입 가능을 이용해 구현했다면 이러한 문제 발생하지 않았을 것이다.

```tsx
function makePerson(name: string, age: number){}
```

### 트랜스파일

- ESNext 자바스크립트 소스코드는 **바벨(Babel)**이라는 트랜스파일러(transpiler)를 거치면 ES5 자바스크립트 코드로 변환된다.
- 바벨과 유사하게 타입스크립트 소스코드는 **TSC(Typescript Complier)**라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환된다.
- 트랜스파일러: 어떤 프로그래밍 언어로 작성된 소스코드 ⇒ 또 다른 프로그래밍 언어로 된 소스코드
- 컴파일러: 텍스트로 된 소스코드 ⇒ 바이너리 코드 컴파일러

## 01-2 타입스크립트 주요 문법 살펴보기

- 타입스크립트는 ESNext 문법을 지원하기에 알아야한다.
- 타입스크립트에만 고유한 문법도 존재한다.

### 1. ESNext의 주요 문법 살펴보기

**(1) 비구조화 할당**

- ESNext는 '비구조화 할당(Destructuring Assignment)'이라고 하는 구문을 제공한다.
- 비구조화 할당은 **객체**와 **배열**에 적용할 수 있다.

```tsx
// 객체의 속성을 얻는 예제
let person = { name: 'Jane', age: 22 };
let { name, age } = person; // name : Jane, age : 23

// 배열에 비구조화 할당을 적용한 예제
let array = [1, 2, 3, 4];
let [head, ...rest] = array; // head = 1, rest = [2, 3, 4]

// 값을 서로 교환(swap)하는 예
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

**⇒ 파이썬에서는 `a, b = b, a` 이렇게가 가능하지만, 자바스크립트에서는 반드시 배열이 필요 `[a, b] = [b, a]`** 

**(2) 화살표 함수(arrow function)**

- ESNext에서는 function 키워드 외에도 **화살표(=>)**로 함수를 선언할 수 있다.

```tsx
// function 키워드 사용
function add(a, b){
    return a + b;
}
// 화살표 함수 사용
const add2 = (a, b) => a +b;
```

**(3) 클래스**

- ESNext에서는 클래스라는 기능을 제공해 C++나 Java 언어에서 보던 객체지향 프로그래밍을 지원한다.
- 객체 지향 프로그래밍은 **캡슐화(encapsulation), 상속(inheritance), 다형성(polymorphism)**을 지원한다.

```tsx
abstract class Animal{
    constructor(public name?: string, public age?: number){}
    abstract say(): string
}

class Cat extends Animal {
    say(){
        return '야옹';
    }
}

class Dog extends Animal {
    say(){
        return '멍멍';
    }
}
let animals: Animals[] = [new Cat('야옹이', 2), new Dog('멍멍이', 3)];
let sounds = animals.map((a) => a.say()); // ['야옹', '멍멍']
```

**(4) 모듈**

- 모듈을 사용하면 코드를 여러 개 파일로 분할해서 작성할 수 있다.
- 변수나 함수, 클래스 등에 `export` 키워드를 사용해 모듈로 만들면 다른 파일에서도 사용할 수 있다.
- 이렇게 만든 모듈을 가져오고 싶을 때는 `import` 키워드를 사용한다.

```
import * as fs from 'fs';
export function writeFile(filepath: string, content: any) {}
```

**(5) 생성기**

- yield문은 반복자를 의미하는 반복기(iterator)를 생성할 때 사용한다.
- 그런데 반복기는 독립적으로 존재하지 않고 반복기 제공자(iterable)를 통해 얻는다.
- 이처럼 yield문을 이용해 반복기를 만들어 내는 반복기 제공자를 생성기(generator)라고 부른다.
- 생성기는 function 키워드에 별표(*)를 결합한 function*과 yield 키워드를 이용해 만든다.
- 타입스크립트에서 yield는 반드시 function*으로 만들어진 함수 내붕에서만 사용할 수 있다.

```tsx
function* gen() {
  yield* [1, 2];
}
for(let value of gen()) {
  console.log(value); // 1, 2
}
```

- 위의 코드에서 function*을 생성기라고 한다.
- yield가 호출되면 프로그램 실행이 일시정지 한 후 점프해서 for문을 실행한다.
- for문을 마치면 다시 yield로 돌아가고 배열의 모든 요소를 순회할 때까지 반복한다.

**(6) Promise와 async/await 구문**

- ES5로 비동기 콜백 함수(asynchronous callback function)를 구현하려면 코드가 상당히 복잡해지고 번거로워진다. (aka. callback hell)
- `Promise`는 웹 브라우저와 Node.js에서 모두 제공하는 기본타입으로 비동기 콜백 함수를 상대적으로 쉽게 구현할 목적으로 만들어졌다.
- ESNext에서는 async/await 구문을 빌려서 여러 개의 `Promise` 호출을 결합한 좀 더 복잡한 형태의 코드를 간결하게 구현할 수 있다.

```tsx
async function get(){
    let values = []
    values.push(await Promise.resolve(1)) // await는 Promise를 해소(resolve)
    values.push(await Promise.resolve(2))
    values.push(await Promise.resolve(3))
    return values; // get 함수가 리턴하는 것은 *Promise 형태의 배열!*
}
console.log(get()); // Promise { <pending> }
get().then(values => console.log(values)) // [1, 2, 3]
```

### 2. 타입스크립트 고유의 문법 살펴보기

**(1) 타입 주석과 타입 추론**

- 변수 `n` 뒤에는 콜론(`:`)과 타입 이름이 있다. 이것을 **'타입 주석(type annotation)'**이라고 한다.
- 타입 부분을 생략할 수도 있다. 타입스크립트는 변수의 타입 부분이 생략되면 대입 연산자의 오른쪽 값을 분석해 왼쪽 변수의 타입을 결정한다. 이를 타입 추론(type inference)이라고 한다.

```tsx
let n: number = 1;
let m = 2;
```

**(2) 인터페이스**

- 3장에서 다룰 것.

```tsx
interface Person {
    name: string;
    age?: number;
}
let person: Person = { name : "Jane" }
```

**(3) 튜플**

- 튜플은 물리적으로는 배열과 같다.
- 다만, **배열에 저장되는 아이템의 데이터 타입이 모두 같으면 배열, 다르면 튜플**이다.

```tsx
let numberArray: number[] = [1, 2, 3]; // 배열
let tuple: [boolean, number, string] = [true, 1, 'OK'] // 튜플
```

**(4) 제네릭 타입**

- 제네릭 타입은 **다양한 타입을 한꺼번에 취급**할 수 있게 해준다.
- 다음 코드에서 `Container` 클래스는 `value` 속성을 포함한다.
- `Container<number>`, `Container<string>`, `Container<number[]>`, `Container<bolean>`처럼 여러 가지 타입을 대상으로 동작할 수 있는데 이를 **제네릭 타입(generic type)**이라고 한다.

```tsx
class Container<T>{
    constructor(public value: T){}
}
```

**(5) 대수 타입**

- ADT란, 데이터 타입(abstract data type)을 의미하기도 하지만 대수 타입(algebraic data type)이라는 의미로도 사용된다.
- 대수 타입이란, 다른 자료형의 값을 가지는 자료형을 의미한다.
- 대수 타입은 크게 합집합 타입(union), 교집합 타입(intersection) 두 가지가 있다.
- 합집합 타입은 | 기호를, 교집합 타입은 & 기호를 사용해 다음 코드처럼 여러 타입을 결합해서 만들 수 있다.

```tsx
type NumberOrString = number | string;
type AnimalAndPerson = Animal & Person;
```

## 01-3 타입스크립트 개발 환경 만들기

- 타입스크립트 개발 환경은 Node.js 개발 환경과 같다.
- 즉, Node.js를 설치하고 비주얼 스튜디오 코드와 크롬을 설치하면 바로 개발가능하다.
- VSCode & Chrome & Node.js 설치 설명은 건너뜀.

### 1. 타입스크립트 컴파일러 설치

- VSCode를 실행하고 터미널에 다음 명령어를 입력해 typescript 패키지를 설치한다.

```bash
npm i -g typescript
tsc -v
```

1. typescript 패키지를 설치한다.
    - 타입스크립트는 Node.js 환경에서만 동작한다.
    - **npm**: Node.js 패키지 관리자 / **i**: install / **-g**: global, 전역공간
    - typescript 패키지는 서버와 클라이언트로 동작하는 두 개의 프로그램 포함한다.
        - tsc ⇒  타입스크립트 컴파일러(typescript compiler) & 클라이언트(client) 두 가지 의미를 가지고 있다.
2. `tsc -v`를 통해 버전을 확인하여 설치여부를 알 수 있다.

### 2. 타입스크립트 컴파일과 실행

```tsx
// hello.ts
console.log('Hello world!')
```

- 다음처럼 터미널에서 명령을 실행하면 `hello.js` 파일이 생기는 것을 확인할 수 있다.

```bash
tsc hello.ts
```

- 즉, 앞에서 설명했던 것처럼 타입스크립트 소스가 TSC에 의해 트랜스파일되어 hello.js 파일이 생성되었다.
- Node.js로 hello.js를 실행해본다.

```bash
> node hello.js
Hello world!
```

### 3. ts-node 설치

- **tsc는 타입스크립트 코드를 ES5 형식의 자바스크립트 코드로 변환만 할 뿐 실행하지 않는다.**
- 타입스크립트 코드를 ES5로 변환하고 실행까지 동시에 하려면 ts-node를 설치해야한다.

```bash
npm i -g ts-node
```

- 설치 후, --version으로 프로그램 버전을 확인한다.

```bash
ts-node --version
```

- **ts-node로 컴파일과 실행을 동시에 진행 !**

```bash
> ts-node hello.ts
Hello world!
```
