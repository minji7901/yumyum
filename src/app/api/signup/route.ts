import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, nickname } = await request.json();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });

    if (!data?.user) {
      return NextResponse.json({ errorMsg: '이미 가입된 이메일입니다' }, { status: 400 });
    }

    if (error) {
      console.error('회원가입 실패:', error);
      return NextResponse.json(
        { errorMsg: '회원가입에 실패했습니다' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: '회원가입이 완료되었습니다', user: data?.user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ errorMsg: '서버에서 문제가 발생했습니다' }, { status: 500 });
  }
}
