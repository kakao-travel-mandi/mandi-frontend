import { NextRequest, NextResponse } from 'next/server';

import {
  BEFORE_SIGN_PATH,
  POLICY_PATH,
  TRACKING_PATH_REGEX,
} from './constants/middeware';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const trekkingId = request.cookies.get('trekkingId')?.value;

  if (BEFORE_SIGN_PATH.includes(pathname)) {
    return handleBeforeSignPath(accessToken, origin);
  } else if (POLICY_PATH.includes(pathname)) {
    return NextResponse.next();
  } else {
    return handleTrackingPath(pathname, accessToken, trekkingId, origin);
  }
}

function handleBeforeSignPath(accessToken: string | undefined, origin: string) {
  if (accessToken) {
    return NextResponse.redirect(new URL(`/home`, origin));
  }
  return NextResponse.next();
}

function handleTrackingPath(
  pathname: string,
  accessToken: string | undefined,
  trekkingId: string | undefined,
  origin: string,
) {
  if (!accessToken) {
    return NextResponse.redirect(new URL(`/`, origin));
  }
  if (TRACKING_PATH_REGEX.test(pathname)) {
    const courseId = pathname.split('/')[2];
    if (trekkingId !== courseId) {
      return NextResponse.redirect(new URL(`/course/${courseId}`, origin));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest).*)'],
};
