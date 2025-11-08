import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporary simplified middleware without database access
// Full authentication is handled at page/API level
export function middleware(request: NextRequest) {
  // For now, just allow all requests
  // Authentication will be checked in individual pages using auth()
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
