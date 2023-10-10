---
layout: post
title: Vue3 라이프 사이클과 렌더링 매커니즘
subtitle: Vue3 LifeCycle and Rendering Mechanism
categories: Study
tags: [Vue, LifeCycle, RenderingMechanism, VirtualDOM]
---

## 렌더링 (Rendering)

우리는 렌더링이란 말을 정말 많이 듣고, 사용하고 있을 것이다. 그렇다면 렌더링이란 무엇일까?
[브라우저에서 렌더링](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work)이란 화면을 그리는 과정을 의미한다.
Vue에서 렌더링도 비슷한 의미로 생각할 수 있다. Vue에서 렌더링이란 **현재 애플리케이션에서 상태를 반영하기 위해 DOM을 업데이트 하는 과정** 이다.

### 업데이트 과정

DOM을 업데이트 한다? DOM을 그리는 과정이라는 것인가 싶지만, 사실 Vue에서 렌더링이란 화면을 그리는 것 그 이상의 의미가 있다.
Vue가 수행하는 렌더링 과정은 이렇다.

1. **데이터 정의**
  Vue에서 사용할 데이터를 정의한다.

    ```Vue
    <script>
      import { ref } from 'vue';

      export default {
        setup() {
          // 데이터 정의
          const message = ref('안녕하세요, Vue 3!');

          // template으로 데이터 전달
          return {
            message
          };
        }
      };
      </script>
    ```

1. **template 작성**
  데이터를 기반으로 UI를 담당하는 template을 작성한다.

    ```Vue
    <template>
      <div id="app">
        <p>{% raw %}{{ message }}{% endraw %}</p>
      </div>
    </template>
    ```

1. **Vue 인스턴스 생성**
  Vue 인스턴스를 생성하고 이를 HTML 요소와 연결한다.

    ````Vue
    import { createApp } from 'vue';
    import App from './App.vue';

    createApp(App).mount('#app'); // App이라는 컴포넌트를 루트 컴포넌트로 사용해서 #app 이라는 HTML 요소와 연결시킨다.
    ````

1. **반응성 및 DOM 업데이트**
  데이터가 변경되면 template의 해당 부분만 효율적으로 업데이트 하고, DOM을 재렌더링한다.

Vue에서 렌더링은 **화면을 다시 그리는 것 뿐만 아니라, 데이터와 template의 반응성을 관리하여 DOM을 효율적으로 업데이트 하는 과정** 이다.
이런 과정은 DOM을 수동으로 조작하지 않아도 동적이게 만들어준다.

## Vue LifeCycle

LifeCycle이란 말 그대로 태어나서 죽기까지의 과정을 뜻한다. Vue의 삶과 죽음에 대해 알아보자.

![생명주기표](https://ko.vuejs.org/assets/lifecycle.d3fe54ca.png)

### setup

setup에서는 _인스턴스 초기화_ 를 하고, 화면에 _데이터 반응성을 주입_ 하며, _template 속성을 확인_ 하는 단계이다.
또한 실제 돔 트리 구성을 위해 _template의 내용을 render함수로 변환_ 한다. 아직 실제 DOM tree가 그려지지 않았기 때문에 DOM에 접근할 수 없다.
Vue2의 옵션 API에 있던 `beforeCreate`, `created` 두 가지 단계가 합쳐졌다.

![상세 라이프사이클](https://joshua1988.github.io/vue-camp/assets/img/lifecycle.dcbe29f6.png)

#### 렌더링 메커니즘

그러면 Vue에서 template을 어떻게 실제 DOM 노드로 변환시킬까?

> **Virtual DOM**
>
> Vue의 렌더링 원리를 알기 위해선 Virtual DOM을 알아야 한다. 리엑트와 마찬가지로 Vue에서도 Virtual DOM이라는 프로그래밍 패턴을 기반으로 하기 때문이다.
> 쉬운 이해를 위해 하나씩 뜯어보자면 Virtual이란 '가상의'라는 뜻으로 실제하지 않은 무언가를 뜻하고, DOM이란 우리가 보고있는 UI를 말한다.
> Virtual DOM이란, 실제하지 않은 UI인 것이다. Virtual DOM은 실제로 존재하지 않지만, DOM의 내용이 담겨있는 JS 객체 형태로 메모리에 존재한다.
>
> 왜 Virtual DOM이 DOM을 조작하는데 효율적인 매커니즘이라고 할까?
> 이유는 간단하다. 데이터가 변경되면 렌더링을 하는데 이 때 렌더링 후 Virtual DOM과 렌더링 이전 Virtual DOM 객체를 비교해 달라진 부분만 업데이트를 시킨다. (diffing || reconciliation || patch라고 한다.)

#### 렌더 파이프라인

이 과정은 Vue가 컴포넌트를 마운트 시킬 때 일어나는 과정이다.
![Vue render pipeline](https://ko.vuejs.org/assets/render-pipeline.879c8dc5.png)

1. template을 렌더함수(Virtual DOM tree를 반환하는 함수)로 컴파일 한다.
2. 마운트에서 런타임 렌더러는 렌더함수를 호출하여 Virtual DOM tree를 탐색하고 실제 DOM을 생성한다. 이때 반응성을 업데이트 하고, 추척하는 사이드이펙트가 실행된다.
3. 반응형 데이터가 변경되면 Vue는 다시 렌더함수를 호출해 새로운 Virtual DOM tree를 생성한다. 그리고 이전 Virtual DOM tree와 비교하여 변경점만 DOM에 업데이트 한다.

#### template이냐, 렌더 함수 h()냐

template을 사용하면 렌더함수로 변환하는 단계가 추가 되는데 왜 바로 렌더함수를 사용하지 않을까?
일단 template은 HTML과 비슷하게 사용할 수 있어 쉽다. 또한 정적으로 분석할수 있어 컴파일 시간을 최적화 시킬 수 있다.

#### [Compiler-Informed Virtual DOM](https://junikang.tistory.com/m/754)

다른 프레임워크는 데이터가 변경되면 새 Virtual DOM tree와 이전 Virtual DOM tree을 완전히 탐색하여 비교 후 변경한다. 이 과정은 정확성을 위해 진행되는데 메모리 부하를 줄 수 있다.

Vue는 이러한 부하를 줄이기 위해 컴파일러와 런타임을 모두 컨트롤한다. 이러한 구현은 밀접하게 결합된 렌더러가 가지고 있는 이점을 챙길 수 있고, 컴파일 시간을 최적화 할 수 있다.
컴파일러는 템플릿을 정적으로 분석할 수 있고, 새롭게 생성될 코드에 힌트를 남길수 있다. 그래서 런타임시에는 가능한한 간소화할 수 있다. 동시에, 특별한 상황에서 직접적으로 컨트롤할 수 있는 렌더 함수 레이어를 유저에게 제공해준다.
Vue의 이러한 하이브리드한 접근을 "정보포함-컴파일러 가상 돔(Compiler-Informed Virtual DOM)" 이라고 한다.

### beforeMount

Virtual DOM을 생성한 후 실제 DOM에 부착 전 단계다. 아직 실제 DOM이 그려지지 않았기 때문에 접근 할 수 없다.

### Mounted

> A runtime renderer can walk a virtual DOM tree and construct a real DOM tree from it. This process is called mount.
> 런타임 렌더러는 가상돔 트리를 탐색하고, 실제돔 트리를 이것으로부터 구성한다. 이러한 프로세스를 마운트라고 한다.

컴포넌트가 마운트 되었다고 간주 된 후 단계이다. 마운트 되었다고 생각하는 조건은 DOM tree에 동기식 모든 컴포넌트가 부착되었거나, #app (최상위 컴포넌트)가 Document 내에 있을 경우이다.

### beforeUpdate

데이터가 변경되었을 때, 다시 DOM tree를 업데이트 하기 직전 단계다.

### updated

데이터 변경 후 DOM tree 가 변경 되고 난 후 단계다. 이 단계에서 컴포넌트 데이터를 변경하면 무한 루프에 빠질 수 있다.

### beforeUnmount

컴포넌트 인스턴스가 마운트 해제되기 직전 단계다.

### unmounted

컴포넌트가 마운트 해제되었다고 간주된 후 단계다. 컴포넌트가 마운트 해제되었다고 간주하는 조건은 모든 자식 컴포넌트가 마운트 해제되었거나, 관련된 모든 반응형 이펙트(setup()에서 생성된 렌더 이펙트, Computed, Watcher)가 중지되었을 경우다. 이 훅을 사용하여 타이머, DOM 이벤트 리스너 또는 서버 연결처럼 수동으로 생성된 사이드 이펙트를 정리합니다.

### SSR에서 사용 불가능한 라이프 사이클

동적 업데이트가 없기 때문에 onMounted 또는 onUpdated과 같은 생명 주기 훅은 SSR 중에 호출되지 않고 클라이언트에서만 실행된다.

## 마치며

Vue와 React의 다른 점은 컴파일러와 런타임을 모두 제어하는 것이라고 한다. Vue가 React보다 러닝커브가 낮다는 장점 외에도 새로운 장점을 알게 되어서 유익한 시간이였다.
정보포함 가상 돔에 관해서는 **juniKang** 이 분 블로그보다 더 잘 설명할 자신이 없어서 글의 링크를 달았다. 공식 문서를 읽어도 잘 이해가지 않던 부분인데 한 번에 이해 시켜주는 글이였다.

## reference

- [Virtual DOM (React) 핵심정리](https://callmedevmomo.medium.com/virtual-dom-react-%ED%95%B5%EC%8B%AC%EC%A0%95%EB%A6%AC-bfbfcecc4fbb)
- [렌더링 메커니즘](https://ko.vuejs.org/guide/extras/rendering-mechanism.html)
- [생명주기 훅](https://ko.vuejs.org/guide/essentials/lifecycle.html)
- [인스턴스 라이프사이클](https://joshua1988.github.io/vue-camp/vue/life-cycle.html#%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B3-%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF)
- [[vue] Rendering Mechanism](https://junikang.tistory.com/m/754)
