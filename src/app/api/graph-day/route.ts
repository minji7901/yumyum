import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const supabase = createClient();
    const today = new Date();

    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || today.getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (today.getMonth() + 1).toString());
    const day = parseInt(searchParams.get('day') || today.getDate().toString());

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user.id) {
      throw new Error('User ID is required'); // User ID가 없을 경우 에러를 발생시킴
    }

    const { data, error } = await supabase
      .from('calendars')
      .select('total_nutritions')
      .eq('user_id', session?.user.id)
      .eq('year', year)
      .eq('month', month)
      .eq('day', day);

    // 데이터 조회 실패
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 데이터를 반환
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json( {error: `graph-day server error : ${error}`}, { status: 500 });
  }
}
