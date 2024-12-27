import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const supabase = createClient();
   
    const { searchParams } = new URL(request.url);
    const startDay = searchParams.get('startDay');
    const endDay = searchParams.get('endDay');
    const userId = searchParams.get('userId');

    const { data, error } = await supabase
      .from('calendars') 
      .select('total_nutritions')
      .eq('user_id', userId)
      .gte('date', endDay)
      .lte('date', startDay);

    // 데이터 조회 실패
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 데이터를 반환
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
