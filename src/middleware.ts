import { NextRequest, NextResponse } from 'next/server';

const BEFORE_LOGIN_PATHS = ['/', '/sign-up'];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('accessToken', accessToken);
  if (BEFORE_LOGIN_PATHS.includes(request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/home`));
    }
  } else {
    if (!accessToken) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/`));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest).*)'],
};
