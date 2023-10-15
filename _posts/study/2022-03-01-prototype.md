---
layout: post
title: 자바스크립트의 프로토타입
subtitle: 프로토타입에 대해 간단하게!
categories: Study
tags: [javascript, Prototype]
---

## 자바스크립트 언어

자바스크립트는 **명령형**, **함수형**, **프로토타입** 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어이다. 객체지향이라면 생각나는 Java처럼 `Class`가 있긴 하지만 `protected`, `private`등은 자바스크립트를 쓰면서 들어본 적이 없다. 자바스크립트로 어떻게 객체지향 프로그래밍을 할까?

> **객체지향**
> 객체(데이터[속성 혹은 상태]와 데이터를 조작하는 동작을 하나의 단위로 묶은 복합적인 자료구조)의 집합으로 프로그램을 표현하려는 패러다임이다.
> [더 알아보기](https://yozm.wishket.com/magazine/detail/1396/)

## 프로토타입

프로토타입은 자바스크립트에서 객체지향 프로그래밍의 상속을 구현할 수 있게 만들어준다. 어떻게 상속을 구현할까?

생성자 함수를 `new` 연산자랑 함께 호출하면 인스턴스가 나오는데 인스턴스에는 `__prototype__`이라는 객체가 생긴다.

```javascript
const newObj = new NewObj()
```

이 객체는 생성자 함수가 가지고 있는 `Prototype` 이라는 객체를 참조한다. 이 참조 객체는 불필요한 코드 중복을 없애주는 중요한 객체이다.

모든 객체는 `__prototype__`접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]`의 내부 슬롯에 간접적으로 접근할 수 있는데 이는 생략이 가능하다.

`[[Prototype]]`를 통해서 `set`이나 `get`메서드를 사용할 수 있다. 하지만 직접적으로 접근할 수 없고, 접근자 프로퍼티를 이용해서 접근할 수 있는다.   
이유는 서로 참조하여 오류가 나는 것을 방지하기 위함이다. 단방향 링크드 리스트로 구현해야 오류가 나지 않는다. _서로가 서로를 참조하면 아무 의미가 없지 않겠나?_ 

프로토타입에는 종점이 없다. 그래서 무한루프에 빠질 수 있으니 한 방향으로 흘러가야 하는 것을 기억하자.

`__prototype__`는 코드 내에서 직접 사용하는 것은 권장하지 않는다. 모든 객체가 `__prototype__`에 접근할 수 있는 것은 아닌데 직접상속으로 만들어진 객체가 그러하다. 그렇다면 어떻게 사용할 수 있을까? `Object.getPrototypeOf()` 메서드를 사용하면 가능하다.

```javascript
function Proto(obj) {
  this.obj = obj
}

var foo = new Proto({ a: 1 });

console.dir(Proto); // prototype 프로퍼티 O
console.dir(foo); // prototype 프로퍼티 X
```

함수 객체가 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

## reference

- 코어 자바스크립트
- [프로토타입](https://poiemaweb.com/js-prototype)
