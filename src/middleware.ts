import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  console.log(pathname)
  // Example: Redirect all users from an old route to a new one
  if (pathname === '/' || pathname === '/admin') {
    const newUrl = new URL('/admin/splashimages', req.url);
    return NextResponse.redirect(newUrl); // Redirect to the new route
  }

  // Default: Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Match specific paths (optional)
  // matcher: ['/protected/:path*', '/old-route'],
};
