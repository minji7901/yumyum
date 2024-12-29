import { NextResponse } from 'next/server';
import FoodNutrition from '@/types/FoodNutrition';

// export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const foodLv3Cd = searchParams.get('foodLv3Cd') || '01'; // 기본값: 01 (밥류)
  const pageNo = searchParams.get('pageNo') || '1'; // 기본값: 1

  try {
    const API_URL = `http://api.data.go.kr/openapi/tn_pubr_public_nutri_food_info_api`;
    const SERVICE_KEY = process.env.NUTRITION_API_KEY;

    const url = `${API_URL}?serviceKey=${SERVICE_KEY}&pageNo=${pageNo}&numOfRows=20&type=json&foodLv3Cd=${foodLv3Cd}`;

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'API 요청 실패' }, { status: response.status });
    }

    const data = await response.json();
    const FoodNutritionData: FoodNutrition[] = data.response.body.items;

    if (!FoodNutritionData) {
      return NextResponse.json({ error: '결과가 없습니다.' }, { status: 404 });
    }

    // console.log(FoodNutritionData);

    return NextResponse.json(FoodNutritionData);
  } catch (error) {
    console.log('서버쪽 에러', error);
    return NextResponse.json({ error: '서버쪽 오류' }, { status: 500 });
  }
}
