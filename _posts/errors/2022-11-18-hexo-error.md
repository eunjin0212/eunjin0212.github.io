---
layout: post
title: Hexo 태그 Icarus 적용 시 에러
subtitle: Error change Hexo logo
categories: Errors
tags: [errors, hexo]
---
와 진짜 역대로 어렵다

집에서 하니까 왜 아무것도 안나오는걸까

```
No layout: index.html
```

이유는 내가 클론을 받았을 때 테마 폴더 안에 있는 애들은 같이 안올라갔기 때문에 아무것도 뜨지 않았다 다시 클론을 받고 재실행하니까 잘 보인다

로고를 바꿔보자

로고는 테마 > 소스 > 이미지 폴더 안에 넣고 `hexo d -g` 하고 `hexo s` 하면 바뀐다
config 파일을 건들면 다시 빌드와 배포 과정을 해줘야 한다
글은 바로 바뀜!

이제 겨우 사이드 바꿨는데 앞으로 네비랑... 거지같은 사이드 css... 바꿔줘야겠다 왜이렇게 갈 길이 머냐~ 그래도 하다보면 되겠지!
