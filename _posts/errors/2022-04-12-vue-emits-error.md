---
layout: post
title: Vue emits 에러
subtitle: Vue warn Extraneous non-emits event listeners
categories: Errors
tags: [errors, Vue.js]
---

# 에러 내용

> [Vue warn]: Extraneous non-emits event listeners (ok, hide) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.

다이얼로그 컴포넌트를 쓰는데 이런 오류가 났다.

해결책은 `template` 안에 두개의 `element`가 있고 `emits 이벤트`를 발생 시키면 오류가 난다. 그래서 하나의 `div`로 감싸주거나 emits을 부르는 곳에서 `emits: ['...']`을 추가 해 주면 된다.
