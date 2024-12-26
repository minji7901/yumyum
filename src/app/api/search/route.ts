import { SearchType } from '@/types/Search';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const keyword = searchParams.get('keyword');

  const res = await fetch(
    `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${process.env.API_KEY}&type=json&pageNo=${page}&numOfRows=10&FOOD_NM_KR=${keyword}`
  );

  const data = await res.json();
  const searchData: SearchType = data.body;

  return NextResponse.json({
    data: searchData.items,
    nextPage: searchData.pageNo + 1,
    hasMore: searchData.pageNo * searchData.numOfRows < searchData.totalCount
  });
}
