import {resolveFaviconHref} from './shortLink';

describe('resolveFaviconHref', () => {
  it('returns an absolute favicon URL unchanged', () => {
    expect(resolveFaviconHref({favicon: 'https://example.com/favicon.ico'})).toBe('https://example.com/favicon.ico');
  });

  it('builds a favicon URL from the long URL for relative favicons', () => {
    expect(resolveFaviconHref({long: 'https://example.com', favicon: '/favicon.ico'})).toBe('https://example.com/favicon.ico');
  });

  it('returns undefined for relative favicons without a long URL', () => {
    expect(resolveFaviconHref({favicon: '/favicon.ico'})).toBeUndefined();
  });
});