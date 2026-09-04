export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

export const locales = ['en', 'es'];
export const defaultLocale = 'en';

// Prefixes a path with the locale, except for the default locale (unprefixed).
// withLocale('/#about', 'es') -> '/es/#about'
// withLocale('/archive/', 'en') -> '/archive/'
export const withLocale = (path, locale) => {
  if (!locale || locale === defaultLocale) {
    return path;
  }
  return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}${path}`;
};

// Pages that exist in both locales. Anything else (blog posts, tag pages, 404...)
// falls back to the other locale's homepage instead of linking to a page that doesn't exist.
const LOCALIZED_ROOTS = ['/', '/archive/'];

// Given the current pathname and locale, returns the equivalent path in the other locale.
export const otherLocalePath = (pathname, locale) => {
  const otherLocale = locale === defaultLocale ? locales.find(l => l !== defaultLocale) : defaultLocale;
  const stripped = pathname.replace(/^\/es\//, '/').replace(/^\/es$/, '/');
  const target = LOCALIZED_ROOTS.includes(stripped) ? stripped : '/';
  return { locale: otherLocale, path: withLocale(target, otherLocale) };
};

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};
