import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';

// 1. Specify proected and public routes
const protectedRoutes = ['/dashboard', '/product/items'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(request: NextRequest) {
  // 2. check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // 3. decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // 4. redirect to login if the route is protected and the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // 5. redirect to dashboard if the route is public and the user is authenticated
  if (isPublicRoute && session?.userId && !request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to the dashboard if the user is authenticated and trying to access a public route
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}
