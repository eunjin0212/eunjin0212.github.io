---
layout: post
title: Atomic Design Pattern이란?
subtitle: React의 근본 패턴
categories: Study
tags: [design pattern]
---

![](https://bradfrost.com/wp-content/uploads/2013/06/atomic-design.png)

이번에 회사 스터디 프로젝트를 하다가 알게된 Atomic pattern에 대해 공부할 겸, 정리할 겸 블로그에 간단히 적어보고자 한다.

Atomic pattern 에서 우리가 아는 atomic의 뜻은 분자가 맞다. 왜 "분자" 패턴인지는 Atomic pattern의 애플리케이션 구조화를 보면 바로 알 수 있다.
Atomic pattern은 다섯개의 계층으로 나눠져 있다.

![](http://bradfrost.com/wp-content/uploads/2015/12/atomic-gif-3.gif)

### 가장 작은 원자 (Atoms)

원자는 말 그대로 가장 작은 단위의 컴포넌트를 뜻한다. 많은 사람들은 디자인을 입힌 UI 컴포넌트로 사용한다. 쉽게 생각하면 집을 지을 때 쌓는 벽돌과도 같다. 같은 UI를 가진 곳이라면 어디든 껴 맞출 수 있다.

### 원자의 모임 분자 (Molecules)

분자는 원자보다 한 단계 위에 있는 계층이고, 원자가 모여 하나의 단위로 움직이는 그룹이다. 예를 들면 원자인 버튼과 원자인 인폿이 보여 검색 창을 만든다. 여기서 검색창 부분이 분자이다. 원자들이 모여 분자가 되면서 원자들은 목적을 가지게 된다. 기능을 가진 컵포넌트로 일관성 있게 재사용도 가능하다.

### 작은 동네 유기체 (Organisms)

분자가 모여 유기체가 되는데 이는 조금 복잡한 구성요소이다. 보통 인터페이스 독립된 구역을 구분하는 역할을 한다. 예를 들면 헤더, 혹은 쇼핑몰 메인 가운데에 있는 슬라이더 등이 있다.

### 페이지의 와이어프레임 템플릿 (Templates)

템플릿은 유기체들을 어디에 어떻게 배치해야 하는지 설계하고, 페이지 구조를 잡아준다. 헤더는 상단에, 슬라이더는 센터에, 로그인 버튼은 왼쪽에 등등.. 페이지의 기본 레이아웃을 담당한다.

### 마지막 페이지 (Pages)

사용자게에 최종적으로 보여지는 마지막 단계이다. 최종최최종진짜최종수정본.hwp 같은 느낌이랄까? 애플리케이션의 탐색 부분이다. 실제 데이터를 넣어 디자인 시스템에 활기를 준다. 또한 디자인 시스템을 테스트 할 수도 있고 잘 짜여졌는지 분석도 할 수 있다.

<br />
<br />
<br />

이렇게 각각의 모여있는 계층이 상호작용을 하는 모델을 Atomic Pattern 이라고 한다. 더 간단히 요약하자면
Atoms은 더 이상 세분화할 수 없는 UI 요소이며 인터페이스의 기본 빌딩 블록 역할을 한다.
Molecules는 비교적 단순한 UI 구성 요소를 형성하는 원자의 집합이다.
Organism는 인터페이스의 개별 섹션을 형성하는 비교적 복잡한 구성 요소다.
Templates은 레이아웃 내에 구성 요소를 배치하고 디자인의 기본 콘텐츠 구조를 보여준다.
Pages는 실제 콘텐츠를 템플릿에 적용하고 변화를 명확하게 표현하여 최종 UI를 보여주고 디자인 시스템의 탄력성을 테스트한다.
<br />

### Atomic Design Pattern 장점

애플리케이션과 분리하여 컴포넌트를 개발하고 테스트 할 수 있다. 그리고 반복적인 구조가 잡히면 변경되는 설계에도 빠르고 유연하게 대처할 수 있다. (기획이 맨날 바뀌어서 힘들었던 나날들이...) 또한 반복되는 컴포넌트 사용으로 일관적인 디자인으로 통일 시킬 수 있다. 세분화로 유지보수가 쉽다.

### Atomic Design Pattern 단점

작은 애플리케이션을 만들 때도 지나치게 많은 파일들이 생성된다? 정도 인듯 싶다. (실제로 사용해봤을 때, 이 페이지를 이렇게까지 나눠야 하나? 싶기도 했었다.)

### Atomic Design Pattern 폴더 구조

[리액트 공식문서](https://ko.reactjs.org/docs/faq-structure.html#avoid-too-much-nesting) 단일 프로젝트에서 많은 폴더 중첩은 피하는게 좋다고 한다.

## 참고

- <https://ui.toast.com/weekly-pick/ko_20200213>
- <https://atomicdesign.bradfrost.com/chapter-2/>
- <https://velog.io/@seob/Atomic-Design-Methodology-22>
- <https://github.com/danilowoz/react-atomic-design>
- <https://kciter.so/posts/effective-atomic-design>
