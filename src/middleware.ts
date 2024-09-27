import { NextRequest, NextResponse } from 'next/server';

const BEFORE_LOGIN_PATHS = ['/', '/sign-up'];
const TRACKING_PATH_REGEX = /^\/course\/[^/]+\/trekking$/;

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const trekkingId = request.cookies.get('trekkingId')?.value;

  if (BEFORE_LOGIN_PATHS.includes(request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/home`));
    }
  } else {
    if (!accessToken) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/`));
    }
    if (TRACKING_PATH_REGEX.test(request.nextUrl.pathname)) {
      const courseId = request.nextUrl.pathname.split('/')[2];
      if (trekkingId !== courseId) {
        return NextResponse.redirect(
          new URL(`/course/${courseId}`, request.nextUrl.origin),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest).*)'],
};
