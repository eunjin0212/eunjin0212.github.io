---
layout: post
title: 자바스크립트의 데이터 타입
subtitle: 변수에게 메모리 할딩을...
categories: Study
tags: [javascript, data type]
---

## 데이터 타입

자바스크립트의 데이터 타입에는 두가지가 있다.

### 기본형(원시형 primitive type)

기본형은 불변이다. 기본형에는 `Number`, `String`, `null`, `undefined`, `Boolean`, `Symbol` 타입이 있다.

불변이라는 말은 변하지 않는다는 것을 뜻한다. 아래의 예제를 보자.

```javascript
let a = 1;
a = 2; 
```

내가 a라는 변수 공간에 1이라는 값의 주소를 담았다. a라는 변수에 2라는 값의 주소를 재할당한다고 해도 1이 1인것은 변하지 않는다. a가 가지고 있는 데이터의 주소가 바뀌었을 뿐!

### 참조형(reference type)

참조형은 가변이다. 참조형에는 `Object`, `Array`, `Set`, `weakSet`, `Map`, `weakMap`, `RegExp`, `Date`이 있다.

```javascript
let a = { x: 10, y: 'abc' };
a.x = 20; 
```

a라는 객체의 x프로퍼티의 값을 20으로 바꿨다. x프로퍼티의 값(데이터 주소)는 변했지만 a변수의 값(데이터의 주소)은 바뀌지 않았다. 객체 안의 값이 바뀌었는데도 a객체가 왜 바뀌지 않았다고 할까? 여기서 메모리와 데이터의 지식이 아주 조금 필요하다.

모든 데이터는 생성 되는 순간 고유의 주소를 가지게 된다. 데이터를 담는 그릇인 변수에는 그 데이터의 고유 주솟값이 담긴다. 참조형은 a라는 변수가 있는 것 뿐만 아니라 x, y라는 변수도 가지고 있다. 참조형은 프로퍼티 데이터를 담는 영역과 프로퍼티 식별자(변수명)를 담는 영역이 따로 있다. 그래서 객체 a의 데이터 주솟값이 변하는 것이 아니라 그 안의 프로퍼티의 주솟값만 바뀌게 되는 것이다.

```javascript
console.log(typeof null) // object
console.log(typeof {}) // object
console.log({} instanceof Object) // true
console.log(null instanceof Object) // false
```

### 변수와 식별자

*데이터를 담는 공간*을 *변수*라고 하고 그 *변수의 이름*을 *식별자(변수명)*라고 한다. 변수에는 데이터가 직접 담기는 것이 아니라 *데이터가 있는 메모리의 주솟값*이 담긴다.

> 왜 변수에 데이터를 직접 담는 것이 아닌 주솟값을 담을까?
> 메모리 영역은 변수 영역과 데이터 영역으로 나누어져있다. 데이터는 변할 수 있다. 자유롭게 데이터를 변환하고, 메모리를 효율적으로 관리 하기 위해서 영역을 나눈 것이다. 만약에 내가 'abc'라는 데이터를 메모리 저기 어디 중간 쯤 담았다고 생각하자.
> 'abc'데이터를 'abcdef'로 바꾸고 싶은데 총 6공간이 필요하다. 하지만 기존 공간은 3공간 뿐, 3공간이 더 필요하다. 메모리 중간에 담긴 값이니 이 값을 담기 위해서 옆에 데이터를 밀고 또 밀어서 데이터를 변경할 수 있다. 이렇게 하는 것은 너무 비효율적이고 비용이 많이 들어간다.

메모리의 효율을 위해 변수 영역과 데이터 영역으로 나누어 저장을 하는데 여기서 참조형과 기본형의 차이가 발생한다. 바로 많이 들어서 알고 있는 앝은 복사와 깊은 복사이다.

## reference

- 코어 자바스크립트
