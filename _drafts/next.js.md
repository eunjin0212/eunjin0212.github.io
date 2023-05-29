---
title: Next Js 란?
layout: post
category:
  - Study
  - FrameWork
  - Nextjs
tags:
  - Next Js
toc: true
---

## Next js 가 뭔가요?

[next js 공식 사이트](https://nextjs.org/)

들어봤지만... 그게 뭐죠? react 같은건가요? 하시는 분들은 이제부터 저랑 같이 공부하면 된다.

Next js 이름도 미래지향적인 이 프레임워크는 홈페이지에서 소개하길 _프론트엔드로 풀스택의 힘을 가져오다_ 라고 한다. 뭔데 풀스텍을 가져온다는거야...
이 프레임워크는 React Server Component 구성요소를 기반으로 하는 앱이고, 서버 우선을 기본으로 한다. 쉽게 SSR을 구현 할 수 있게

랜더링 방식은 SSR방식이다. Next Js 애서는 SSR을 어떻게 하고 있을까? 페이지 폴더 안에 넣으면 자동으로 라우팅이 된다는데 어떻게 해주는 것일까

### SSR이 뭔가요?

#### MPA

Muilti Page Aplication은 말 그대로 멀티, 여러 페이지로 구성된 웹 애플리케이션이라는 얘기다. 사용자 이벤트가 발생하면 그에 맞는 페이지를 서버로부터 새로운 HTML을 받아와 전체 렌더링한다. SPA (Single Page Aplication)과 반대되는 방식이다. 프론트엔드의 라이브러리들은 보통 CSR, 즉 SPA 방식을 많이 사용한다. 요새 많이 쓰고 있는 라이브러리 거의 다가 SPA방식으로 동작을 한다.
![/mpa-spa](/assets/images/posts/mpa-spa.jpeg)

#### SSR

Server Side Rendering은 잘 알려진 대로 동적 랜더링이라고도 한다. SSR은 서버가 요청을 보낼때마다 페이지를 생성한다. 브라우저에 보여질 HTML을 미리 준비했다가 요청이 들어오면 보내주는 것이다. 브라우저는 그 페이지에 대한 JS를 해석하고 실행한다. 사용자는 서버에서 HTML을 그려주는 동안 기다리지만 서버에서 그려서 화면을 주기 때문에 CSR보다 랜더링 시간이 빠르다. SSR은 MPA방식으로 웹 페이지를 구성 할 수 있게 한다.

자 그래서 next js가 뭐라구요?
공식 문서에 따르면 next js는 웹 애플리케이션을 만들기 위한 기본 구성을 제공하는 react 프레임워크다.
