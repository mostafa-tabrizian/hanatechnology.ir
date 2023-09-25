import { NextResponse, NextRequest } from 'next/server';

export { default } from 'next-auth/middleware'

export const config = {
   matcher: ['/--admin--/:path*', '/api/--admin--/:path*'],
}

export function middleware(request: NextRequest) {
   const requestHeaders = new Headers(request.headers);

   const ip = request.ip || '127.0.0.1';

   console.log('ip', ip);

   requestHeaders.set('x-forwarded-for', ip);

   return NextResponse.next({
      request: {
         headers: requestHeaders,
      },
   });
}

