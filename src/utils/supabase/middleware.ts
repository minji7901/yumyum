import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  // // Supabase 사용자 정보 가져오기
  // const {
  //   data: { user }
  // } = await supabase.auth.getUser();

  // // 로그인된 사용자가 로그인/회원가입 페이지에 접근하면 홈으로 리디렉션
  // if (user) {
  //   // 로그인된 상태에서 회원가입 페이지에 접근하면 홈으로 리디렉션
  //   if (request.nextUrl.pathname.startsWith('/signup')) {
  //     return NextResponse.redirect(new URL('/', request.url)); // 홈 페이지로 리디렉션
  //   }
  // } else {
  //   // 로그인되지 않은 상태에서 로그인/회원가입 페이지 외에 접근하면 로그인 페이지로 리디렉션
  //   if (!request.nextUrl.pathname.startsWith('/signin') && !request.nextUrl.pathname.startsWith('/signup')) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = '/signin';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return supabaseResponse;
}
