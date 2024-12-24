import { SearchType } from '@/types/Search';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const res = await fetch(
    `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${process.env.API_KEY}&type=json&pageNo=1&numOfRows=20`
  );

  const data = await res.json();
  const searchData: SearchType = data.body;

  return NextResponse.json(searchData);
}
