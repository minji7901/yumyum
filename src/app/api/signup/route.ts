import type { FormState } from '@/types/auth';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, nickname } = (await request.json()) as FormState;
  console.log(email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname
      }
    }
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ errorMsg: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: '회원가입이 완료되었습니다', user: data?.user }, { status: 200 });
}
