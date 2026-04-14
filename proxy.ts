import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'
const intlMiddleware = createMiddleware(routing)
export function proxy(request: NextRequest) { return intlMiddleware(request) }
export default proxy
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'] }
