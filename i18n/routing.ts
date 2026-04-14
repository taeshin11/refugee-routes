import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'zh', 'ru', 'fr', 'de', 'es', 'uk'],
  defaultLocale: 'en',
});
