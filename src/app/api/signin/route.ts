import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ errorMsg: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: '로그인에 성공했습니다', user: data?.user }, { status: 200 });
}
