---
layout: post
title: 비동기와 동기 (자바스크립트는 어떻게 돌아가는가?)
subtitle: 파도 끝이 없는 JS
categories: Study
tags: [javascript, synchronouse, asynchronouse]
---

> 자바스크림트 엔진은 각각 한 개씩 호출 스택이 쌓이는 **콜스택** 과 메모리를 할당하는 **메모리 힙** 을 갖는다. 이유는 **싱글스레드** 방식으로 동작하기 때문이다. 이 의미는 동시에 두 개 이상의 함수를 동시에 실행 할 수 없다는 것이다. 그래서 처리 시간이 걸리는 task를 실행 할 경우 **블로킹 (작업 중단)** 이 발생한다.

자바스크립트의 런타임에는 (특정 언어를 실행할 수 있는 환경) 커널(node js는 리버브, 브라우저는 Wep API)과 이벤트 루프, 콜백 큐가 있다.
![](https://beomy.github.io/assets/assets/images/posts/posts/javascript/javascript_runtime.png)
Event loop는 처리할 task가 없으면 잠자고 있다가 처리할 task가 생기면 이를 콜스택에 올려주는 역할을 한다. 콜스택이 비어있는지 계속 확인하고 다음 task를 가지고 온다.

# 비동기

비동기란? 현재 실행중인 코드가 완료하지 않아도 다음 코드로 넘어간다. 실행 task가 완료하지 않아도 다음 task로 넘어가기 때문에 블로킹이 발생하지 않는다. 하지만 실행 순서가 보장되지는 않는다.
여기서 말하는 현재 실행중인 코드는 네트워크 I/O나 하드디스크를 쓰는 I/O를 말한다. (혹은 그 뒤에 오는 코드들) 일반 함수 코드는 순차적으로 실행 시킨 뒤 콜스택을 빠져나간다. 네트워크 I/O나 하드디스크를 쓰는 I/O처리는 자바스크립트 런타임 환경 (브라우저, Node.js)에서 대신 처리해준다. 정확히는 스택이 커널에 위임해준다. 위임받은 커널은 동작을 수행 한 후 Task Queue에 담는데 호출에 따라 담기는 Queue가 다르다.
**Microtask Queue** 에 담기는 애들은 비동기 호출을 넘겨받는다 (`promise`, `asnyc await`, `nextTick`, `queueMicrotask`) 우선순위가 가장 높다.
**Macrotask Queue** 에 담기는 애들은 `setTimeout`, `setInterval`, `setImmediate가` 있다.
커널이 코드를 수행하는 동안 콜스택 내 코드들이 할 일을 다 하고 콜스택에서 제거 되어 콜스택이 비었다. 그러면 이벤트루프는 Queue에서 우선순위대로 코드를 꺼내와 콜스택에 담긴다.

> setTimeout이 정확하지 않은 이유는 이 플로우 때문이다. setTimeout 메서드는 커널에서 처리하는 비동기 메서드 인데 커널에서 제 시간에 처리 후 Macrotask Queue에 담겨도 콜스택에 코드가 아직 있으면 콜스택이 모두 비워질 때 까지 기다려야 하므로 정확하지 않다고 하는 것이다. 또한 실행 순서가 보장 되지 않는 이유도 이 것이다.

# 동기

동기란? 현재 실행중인 코드를 모두 완료 해야 다음 코드로 넘어간다. 대부분의 자바스크립트 코드는 동기로 실행된다. 이유는 싱글스레드 방식으로 동작하기 때문이다.

자바스크립트가 비동기를 처리하는 과정을 보자!
![](/assets/images/posts/js_queue.gif)

1. 코드를 읽는다.
2. 일반 함수라면(task1)? 그냥 콜스택에 쌓이고 순서대로 실행하고 살행이 끝나면 콜스택에서 제거한다. (LIFO 구조)
3. 여기에 비동기로 처리 해야할 코드(task2)가 있다면? 커널(Web API)에 위임한다.
4. 다음 함수를 실행시킨다. 이때 우선순위는 Microtask Queue가 먼저이고 Macrotask Queue는 그 다음이다.
5. Microtask Queue 가 끝나면 Macrotask Queue에 있는 task 들이 실행된다

왜 자바스크립트는 이렇게 돌아갈까? 자바스크립트가 선택한 모델이 싱글 스레드이기 때문에 스택에서 코드를 기다리게 하면 그 코드가 끝날 때 까지 아무것도 동작하지 않는다. 그래서 자바스크립트는 블록킹 코드 즉, 동기로 코드를 짜는 것이 매우 위험하다.

```Javascript
// 콘솔에 나올 순서를 예측해보자 
function A() {
  return new Promise((res, rej) => {
    console.log("A'") // 3번 콘솔에 찍힌다
    res("A")
  })
}

function B() {
  setTimeout(() => {
    console.log("B")
  }, 0)
}

function C() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("C'")
      res("C")
    }, 0)
  })
}

async function main() { // 메인 함수도 비동기로 실행됨.
  console.log("START") // 2번 메인 함수가 호출되고 실행하면서 콘솔에 찍한다.
  console.log('console', await A()) // await 는 promise가 이행될 때 까지 기다린다. 콜스택에 있는 작업들이 끝나면 차레대로 실행된다 5번
  B() // B가 실행이 되지만 setTimeout 메소드로 Macro queue에 담겨서 콜스택과 Micro queue가 실행이 다 끝나면 나온다.
  C() // C도 B와 마찬가지.
  await A() // promise가 이행되면 찍힌다.
  console.log("END") // 메인 함수는 비동기 이므로 기다린다.
}

console.log("SCRIPT START") // 1번 파일이 열리면 가장 먼저 콜스택에서 실행된다.
main()
console.log("SCRIPT END") // main을 끝내고 4번 호출 된다.
// 실행 순서 SCRIPT START > START > A' > SCRIPT END > console A > A' > END > B > C'
```

_[참고 Task Queue말고 다른 큐가 더 있다고?](https://velog.io/@titu/JavaScript-Task-Queue%EB%A7%90%EA%B3%A0-%EB%8B%A4%EB%A5%B8-%ED%81%90%EA%B0%80-%EB%8D%94-%EC%9E%88%EB%8B%A4%EA%B3%A0-MicroTask-Queue-Animation-Frames-Render-Queue)_
_[참고 자바스크립트 동작 원리와 비동기 처리의 원리 (Event Loop, Task Queue)](https://velog.io/@chojs28/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC%EC%9D%98-%EC%9B%90%EB%A6%AC-Event-Loop-Task-Queue)_
_[참고 자바스크립트 런타임](https://beomy.github.io/tech/javascript/javascript-runtime/)_
_[참고 자바스크립트 INFO](https://ko.javascript.info/event-loop)_
_[참고 Node.js 이벤트 루프(Event Loop) 샅샅이 분석하기](https://www.korecmblog.com/node-js-event-loop/)_
