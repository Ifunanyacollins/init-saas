import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server'
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de'],
//don't show the locale in the url for example /en/about-us would be /about
  localePrefix: 'never',
  // Used when no locale matches
  defaultLocale: 'en'
});


export async function middleware(request: NextRequest) { 
    
   return intlMiddleware(request)
    
}
 
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };