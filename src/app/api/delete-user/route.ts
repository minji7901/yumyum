import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function DELETE(request: Request) {
  const supabase = createClient();

  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: '사용자 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.error('사용자 삭제 오류:', error);
      return NextResponse.json({ error: '사용자 삭제 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '사용자 삭제 성공' }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
