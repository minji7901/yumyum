# index
- [프로젝트명-냠냠로그](#프로젝트명-냠냠로그)
- [페이지 구성](#페이지-구성)
- [페이지별 레이아웃과 기능](#페이지별-레이아웃과-기능)

<br><br>

# 프로젝트명 냠냠로그

다양한 음식이 넘쳐나는 요즘, 끼니를 건강하게 구성하기 어렵다고 느끼시나요?

하루에 먹은 음식들을 관리하고, 식사 플랜을 제공해주는 비서가 있으면 좋겠다고 느끼시나요?

그런 당신의 고민을 냠냠로그가 해결해드립니다!

달력에 식사 기록을 남기면 영양 분석 그래프를 제공해드리고,
이용자님의 대답을 기반으로 밥상 추천도 해드려요.

<br><br>

# 팀원  
|                    김민지                    |                           박가나                            |                           박산하                           |                       박은영                       |                    이지원                    |
| :---------------------------------------: | :------------------------------------------------------: | :-----------------------------------------------------: | :---------------------------------------------: | :---------------------------------------: |
|                    팀장                     |                            팀원                            |                           팀원                            |                       팀원                        |                    팀원                     |
| [minji7901](https://github.com/minji7901) | [ParkGana](https://github.com/ParkGana?tab=repositories) | [heftyCornerstone](https://github.com/heftyCornerstone) |     [euncloud](https://github.com/euncloud)     | [dongeul24](https://github.com/dongeul24) |
|      로그인, <br>회원가입 페이지, <br>공통 컴포넌트       |                 메인 페이지, <br>검색 기능 구현<br>                 |               식단 달력 페이지,<br>식단 기록 캘린더 구현                | 식단 달력 페이지, <br>선택한 날짜 기준 <br>월간/일간 데이터 <br>그래프화 |        오늘의 식단 <br>페이지,<br>식단 추천 로직        |

<br><br>

# 기술 스택

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/Next.js-%2320232a.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/type script-3178c6?style=for-the-badge&logo=typescript&logoColor=white">  
<img src="https://img.shields.io/badge/Tanstack query-CA4245?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/zustand-6B46C1?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind css-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<br>

### 그 외 라이브러리

- recharts
- sweetalert2
- zod

<br>

### 사용 API

1. [전국통합식품영양성분정보 API](https://www.data.go.kr/data/15100070/standard.do#tab_layer_grid)
2. [식품영양성분DB정보 API](https://www.data.go.kr/data/15127578/openapi.do#/layer-api-guide)


<br><br>



# 페이지 구성

- 홈
- 나의 식단 달력
- 오늘의 식단
- 로그인

<br><br>

# 페이지별 레이아웃과 기능

## 내비게이션 바

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/2290b81f-74f3-4959-a7a5-602c3122e063/image.png' width='80%'></p>

-  홈, 나의 식단 달력, 오늘의 식단 페이지로 이동할 수 있습니다.
- 비로그인 사용자는 로그인 페이지로 이동, 
  로그인한 사용자는 로그아웃을 할 수 있는 토글 버튼이 있습니다.

<br>

### 마이페이지

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/2aa0eb4e-e66c-4633-8a6b-977908d8ba13/image.png' width='50%'></p>

- 사용자 정보를 변경 및 회원 탈퇴를 할 수 있는 간략한 창입니다.

<br><br>

## 홈

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/b04febf0-8c74-42f5-989f-9d1db3dd2685/image.png' width='40%'>
<img src='https://velog.velcdn.com/images/heftycornerstone/post/30b9f71a-c4bf-4442-9c51-8cf41b8f8597/image.png' width='40%'>
</p>

-  사이트 소개문구가 적혀있습니다
- 하단에서 식품 영양 정보를 검색할 수 있습니다.

### 식품 영양 정보 검색

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/5c8f0daf-ea2e-4aea-9b2f-d7fe3839a950/image.png' width='50%'>
<img src='https://velog.velcdn.com/images/heftycornerstone/post/4bfe813f-bb96-4dd0-8ae0-eec12f3b908e/image.png' width='50%'>
</p>

- 식품의 정보를 검색할 수 있습니다.
- 무한 스크롤이 적용되어 있습니다.

<br><br>

## 나의 식단 달력

### 캘린더

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/d7bdb1eb-f987-401b-b1c0-853a897c3823/image.png' width='50%'></p>

- 하루에 섭취한 칼로리의 양을 확인할 수 있습니다.
- 나의 식단을 달력에 기록할 수 있습니다.

#### 캘린더 모달창

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/12335908-c07d-4698-bc43-25a9cb5e8d0f/image.png' width='40%'></p>
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/d6b8d9f1-b0e7-416c-976b-6e90714a768d/image.png' width='40%'></p>

- 플러스 버튼을 누르면 등장하며, x버튼이나 모달창 바깥을 클릭하면 닫힙니다.
- 해당 일자에 먹은 음식들의 상세 정보를 확인할 수 있습니다
- 검색창을 이용하여 새로운 음식 정보를 저장할 수 있습니다.

<br>

### 그래프

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/5a1cd386-1867-4c08-80a3-9a483844a112/image.png' width='40%'></p>

- 캘린더에서 일을 클릭하면 일자를 선택할 수 있습니다.
- 선택한 일자를 기준으로 30일 이전,
  혹은 선택한 일자에 섭취한 영양을 분석하여 건강 정보를 제공합니다.

<br><br>

## 오늘의 식단

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/ae22ec34-5e93-47f4-8b2a-5e9ef6ffe002/image.png' width='50%'><img src='https://velog.velcdn.com/images/heftycornerstone/post/cc392e9a-19a6-43bb-9e44-e5e05611da54/image.png' width='50%'></p>

- funnel 패턴을 사용하여 식단 추천 로직을 구현하였습니다.

<br>

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/c450d7e0-fd40-41a4-9a9a-1d4858fdafeb/image.png' width='40%'></p>

- 단계별로 질문에 대답하면 마지막 화면에서 식단을 추천받을 수 있습니다.

<br><br>

## 로그인과 회원가입

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/9e8b5a98-d555-4f4f-a6c6-e51669f0544f/image.png' width='30%'><img src='https://velog.velcdn.com/images/heftycornerstone/post/448e30a4-0647-428a-8468-9ea0c3cd0d4b/image.png' width='30%'></p>

- 일반 로그인과 소셜 로그인을 할 수 있습니다

<br>
<br>
