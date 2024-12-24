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

    // 회원가입 실패 처리
    if (error || !data?.user) {
      console.error('회원가입 실패:', error);
      return NextResponse.json(
        { errorMsg: '회원가입에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.' },
        { status: 400 }
      );
    }

    // 회원가입 성공 처리
    return NextResponse.json({ message: '회원가입이 완료되었습니다.', user: data?.user }, { status: 200 });
  } catch (error) {
    console.error('서버 에러:', error); 
    return NextResponse.json({ errorMsg: '서버에서 문제가 발생했습니다. 다시 시도해 주세요.' }, { status: 500 });
  }
}