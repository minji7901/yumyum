import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const supabase = createClient();
    const today = new Date();

    const { searchParams } = new URL(request.url);
    // const year = parseInt(searchParams.get('year') || today.getFullYear().toString());
    // const month = parseInt(searchParams.get('month') || (today.getMonth() + 1).toString());
    // const day = parseInt(searchParams.get('day') || today.getDate().toString());
    const startDay = searchParams.get('startDay');
    const endDay = searchParams.get('endDay');

    console.log('startDay', startDay);
    console.log('endDay', endDay);
    
    const { data, error } = await supabase
      .from('calendars') // calendars table 조회
      .select('total_nutritions')
      // .eq('user_id', id)
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