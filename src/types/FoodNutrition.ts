// .items에 있음음

export default interface FoodNutrition {
  foodCd: string; // 식품 코드
  foodNm: string; // 식품명
  dataCd: string; // 데이터 구분 코드
  typeNm: string; // 데이터 구분 명
  foodOriginCd: string; // 식품 기원 코드
  foodOriginNm: string; // 식품 기원 명
  foodLv3Cd: string; // 식품 대분류 코드
  foodLv3Nm: string; // 식품 대분류 명
  foodLv4Cd: string; // 대표 식품 코드
  foodLv4Nm: string; // 대표 식품 명
  foodLv5Cd: string; // 식품 중분류 코드
  foodLv5Nm: string; // 식품 중분류 명
  foodLv6Cd: string; // 식품 소분류 코드
  foodLv6Nm: string; // 식품 소분류 명
  foodLv7Cd: string; // 식품 세분류 코드
  foodLv7Nm: string; // 식품 세분류 명
  nutConSrtrQua: string; // 영양 성분 함량 기준량
  enerc: string; // 에너지 (kcal)
  water: string; // 수분 (g)
  prot: string; // 단백질 (g)
  fatce: string; // 지방 (g)
  ash: string; // 회분 (g)
  chocdf: string; // 탄수화물 (g)
  sugar: string; // 당류 (g)
  fibtg: string; // 식이섬유 (g)
  ca: string; // 칼슘 (mg)
  fe: string; // 철 (mg)
  p: string; // 인 (mg)
  k: string; // 칼륨 (mg)
  nat: string; // 나트륨 (mg)
  vitaRae: string; // 비타민 A (μg RAE)
  retol: string; // 레티놀 (μg)
  cartb: string; // 베타카로틴 (μg)
  thia: string; // 티아민 (mg)
  ribf: string; // 리보플라빈 (mg)
  nia: string; // 니아신 (mg)
  vitc: string; // 비타민 C (mg)
  vitd: string; // 비타민 D (μg)
  chole: string; // 콜레스테롤 (mg)
  fasat: string; // 포화지방산 (g)
  fatrn: string; // 트랜스지방산 (g)
  srcCd: string; // 출처 코드
  srcNm: string; // 출처 명
  foodSize: string; // 식품 중량
  restNm: string;
  dataProdCd: string;
  dataProdNm: string;
  crtYmd: string;
  crtrYmd: string;
  insttCode: string;
}

/*
 foodLv3Cd
음식을 조리법에 따라 분류한 대분류 코드
01 밥류           16 젓갈류
02 빵 및 과자류   17 장아찌절임류· 
03 면 및 만두류   18 장류 양념류, 
04 죽 및 스프류   19 유제품류 및 빙과류
05 국 및 탕류     20 음료 및 차류
06 찌개 및 전골류 21 주류
07 찜류           22 과일류
08 구이류         23 당류
09 전적 및 부침류· 24 곡류 서류 제품 
10 볶음류          25 두류 견과 및 , 종실류
11 조림류          26 채소 해조류, 
12 튀김류          27 수조어육류· · · 
13 나물숙채류·      28 유지류
14 생채무침류·     29 기타
15 김치류


4. foodLv3Nm
밥류 빵 및 /
과자류 면 및 /
만두류 죽 및 /
스프류 국 및 /
탕류 찌개 및 /
전골류 찜류 구이/ /
류 전적 및 / ·
부침류/
볶음류 조림류 튀/ /
김류 나물숙채류/ · /
생채무침류 김치· /
류 젓갈류 장아찌/ / ·
절임류 장류/ ,
양념류 유제품류 /
및 빙과류 음료 /
및
차류 주류 과일류/ / /
당류 곡류 서류 / ,
제품 두류 견과 / ,
및 종실류 채소/ ,
해조류 수조어육/ · · ·
류 유지류 기타
*/
