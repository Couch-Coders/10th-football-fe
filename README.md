# 미니프로젝트, 풋살 매칭 등록 플랫폼

> 온라인 풋살 매칭 플랫폼

### :newspaper: 프로젝트 소개

사용자가 온라인으로 원하는 장소와 원하는 시간에 풋살을 즐길 수 있도록 매칭시켜주는 플랫폼입니다.

### 📷: 시연영상
[Users](https://www.youtube.com/watch?v=r7vF04ja6pk) / [Admin](https://www.youtube.com/watch?v=pojtbqQeAlA)

개발 기간: 2022-08-09 ~ 2022-09-14

### [페이지 바로가기](https://football-3b39f.web.app/)

<hr/>

### :raising_hand: 팀원

Frontend

- 최한솔

Backend

- 강민혁, 김민보, 노경민

### :floppy_disk: 기술 스택

- React, Redux-toolkit, styled-components, antd

### :house: 설치 방법

```
yarn install
yarn start
```

### 배포하기

```
yarn global add firebase-tools
```

```
firebase init
yarn build
firebase deploy
```

`firebase init`을 통해 `firebase.json`파일을 생성한 후 `firebase-deploy`을 통해 배포합니다.

### 주요 기능

google oAuth을 통한 로그인/회원가입 이 가능합니다.

관리자는 마이페이지에서 사용자가 신청할 수 있는 매치와 경기장을 등록할 수 있습니다.

사용자는 메인 페이지에서 매치 정보를 조회하고 원하는 매치를 신청할 수 있습니다.

### 주요 개발

google oAuth와 firebase을 이용해 로그인/회원가입 구현

`Redux-toolkit`과 `Context API`을 통해 상태 관리

`typescript`을 통해 타입 지정 및 런타임 에러 방지

`eslint`와 `prettier`을 통해 코드 문법, 스타일 통일

`axios`을 통해 서버와 데이터 통신

### :video_camera:

### :whale:

[기능명세서](https://www.notion.so/70d6139f94bd411397d275fc8d1648fc)

[UI 기획 Figma](https://www.figma.com/file/KDqU3tdX6ASRIYdVr3cthD/Football?node-id=7%3A29)

[Backend github repo](https://github.com/Couch-Coders/10th-football-be)

[블로그](https://velog.io/@soll/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A4%80%EB%B9%84)
