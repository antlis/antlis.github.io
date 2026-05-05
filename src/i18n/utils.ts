import { translations, type Locale } from './translations';

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment === 'ru') return 'ru';
  return 'en';
}

export function t(locale: Locale) {
  return translations[locale];
}

export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return clean;
  return `/ru${clean}`;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const isRu = currentPath.startsWith('/ru');
  const basePath = isRu ? currentPath.replace(/^\/ru/, '') || '/' : currentPath;

  if (targetLocale === 'en') return basePath;
  return `/ru${basePath === '/' ? '' : basePath}` || '/ru';
}
