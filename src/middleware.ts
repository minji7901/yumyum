import { NextResponse, type NextRequest } from 'next/server';
//import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // const publicPaths = ['/api']; 
  // const isPublicPath =
  //   request.nextUrl.pathname === '/' || 
  //   publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // if (isPublicPath) {
    return NextResponse.next(); 
//   }

//   return await updateSession(request);
// }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
