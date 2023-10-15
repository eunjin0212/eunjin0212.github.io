---
layout: post
title: 자바스크립트의 실행 컨텍스트
subtitle: Execution Context
categories: Study
tags: [execution context]
---

## 실행 컨텍스트

> 실행 컨텍스트란? 코드가 실행될 때 필요한 환경 정보들을 모아놓은 객체이다.
> 얘가 하는 역할에는 소스코드를 실행하는데 필요한 환경을 제공하고 코드의 실행 결과를 관리한다.

실행 컨텍스트의 종류에는 전역, 함수 실행, eval 실행, 모듈 실행 컨텍스트가 있다. 이 책에서는 전역 컨텍스트와 함수 실행 컨텍스트가 나와있다.
환경 정보에는 VariableEnvironment, LexicalEnvironment, ThisBinding 세가지 정보가 담긴다.

### VariableEnvironment

VariableEnvironment는 처음 컨텍스트를 만들때 정보들을 스냅샷으로 찍어 보관한다. EnvironmentRecord와 OuterEnvironmentReference 두가지 정보가 저장이 된다. EnvironmentRecord에는 식별자들의 정보가 담기는데 VariableEnvironment는 식별자들의 정보(EnvironmentRecord)와 상위 LexicalEnvironment를 참조하는 OuterEnvironmentReference가 초기값과 같다. (변하지 않는다. 스크린 샷 정도로 이해하는 중이다.)

### LexicalEnvironment

LexicalEnvironment는 VariableEnvironment를 처음에 복사해서 만든다. 그래서 초기 실핼시에는 둘이 같지만 후에 값을 변경했을 경우 LexicalEnvironment는 안의 EnvironmentRecord와 OuterEnvironmentReference 내용이 변한다. 식별자와 스코프를 관리한다.

#### EnvironmentRecord

LexicalEnvironment 안에 들어있는 저장 영역이다. 현재 실행컨텍스트의 식별자 정보가 순서대로 저장 된다. 이때 **식별자(매개변수, 변수, 함수선언문)**만 저장한다. 이게 무슨 소리냐 식별자에 할당되는 값은 저장하지 않고 식별자, 말 그대로 할당부 만 신경쓴다. 어떤 값이 할당되는지는 상관하지 않고 식별자를 최상단으로 끌어올려 순서대로 저장한다. EnvironmentRecord의 수집 과정을 추상화 한 개념을 **호이스팅** 이라고 한다.

#### OuterEnvironmentReference

OuterEnvironmentReference는 상위 렉시컬 환경을 참조한다 얘로 인해서 단방향 링크드 리스트인 스코프 체인이 구현된다. 얘는 상위의 LexicalEnvironment를 참조하는건데 이게 바로 내부 함수에서 부모의 변수를 불러올 수 있는 이유이다. 자식 inner 함수에서 부모 outer 에 있는 a 라는 변수를 찾는다고 가정해보자 inner 안에서 먼저 a 를 LexicalEnvironment 에서 찾아보지만 찾을 수 없다 그럼 상위 정보를 갖고 있는 OuterEnvironmentReference를 통해서 상위에서 a 를 찾는다. 변수의 유효 범위를 스코프 라고 하는데 이 스코프는 스코프 체인이라는 검색 방법으로 유효 범위를 검색한다. (예시가 바로 스코프 체인을 하는 과정이다.) 스코프 체인은 안에서 밖으로 검색을 한다.

```javascript
function outer() {
 var a = 1;
 function inner() {
  console.log(a);
 }
}
```

## reference

- 코어 자바스크립트
