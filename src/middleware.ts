import {NextResponse} from 'next/server';

import {getUser} from '@/utils/auth';

import {PATHNAME, VALID_PATHS} from './constants/pathname';

import type {NextRequest} from 'next/server';

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const user = getUser();

  if (!user) {
    return NextResponse.redirect(new URL(`${request.nextUrl.origin}/login`));
  }

  if (
    !VALID_PATHS.includes(pathname as (typeof PATHNAME)[keyof typeof PATHNAME])
  ) {
    return NextResponse.redirect(new URL(`${request.nextUrl.origin}/home`));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
