class Queue<T> {
    protected data: Array<T> = [];
    push(item: T) {
        this.data.push(item);
    }
    pop(): T | undefined {
        return this.data.shift();
    }
}

// number 전용 Queue
const numberQueue = new Queue<number>();
numberQueue.push(0);
// numberQueue.push('1');   // 의도하지 않은 실수를 사전에 알 수 있다.
numberQueue.push(+'1');     // + string => number
console.log(numberQueue);   // Queue { data: [ 0, 1 ] }

console.log(numberQueue.pop()?.toFixed()); // 0
console.log(numberQueue.pop()?.toFixed()); // 1
console.log(numberQueue.pop()?.toFixed()); // undefined

// 커스텀 객체 전용 Queue
const myQueue = new Queue<{ name: string, age: number; }>();
myQueue.push({ name: 'Lee', age: 10 });
myQueue.push({ name: 'Kim', age: 20 });

console.log(myQueue.pop()); // { name: 'Lee', age: 10 }
console.log(myQueue.pop()); // { name: 'Kim', age: 20 }
console.log(myQueue.pop()); // undefined

/*
제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.
한 번의 선언으로 다양한 타입에 재사용이 가능하다는 장점이 있다.
T는 제네릭을 선언할 때 관용적으로 사용되는 식별자로 타입 파라미터(Type parameter)라고 한다.
T는 Type의 약자로 반드시 T를 사용해야하는 것은 아니다.
https://poiemaweb.com/typescript-generic
*/


function reverse<T>(items: T[]): T[] {
    return items.reverse();
}
const arg1 = [1, 2, 3, 4, 5];
// 인수에 의해 타입 매개변수가 결정된다.
const reversed1 = reverse(arg1);
console.log(reversed1); // [ 5, 4, 3, 2, 1 ]

const arg2 = [{ name: 'Lee' }, { name: 'Kim' }];
// 인수에 의해 타입 매개변수가 결정된다.
const reversed2 = reverse(arg2);
console.log(reversed2); // [ { name: 'Kim' }, { name: 'Lee' } ]