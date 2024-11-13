import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  console.log(theme?.value)

}
 
// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/admin/:path*',
}