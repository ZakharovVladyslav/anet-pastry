import createMiddleware from 'next-intl/middleware';
import { locales } from '@/const';

export default createMiddleware({
  locales,
  defaultLocale: 'ua',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
