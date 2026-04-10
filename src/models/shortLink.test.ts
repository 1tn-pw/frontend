import {resolveFaviconHref} from './shortLink';

describe('resolveFaviconHref', () => {
  it('returns an absolute favicon URL unchanged', () => {
    expect(resolveFaviconHref({favicon: 'https://example.com/favicon.ico'})).toBe('https://example.com/favicon.ico');
  });

  it('returns non-http absolute favicon URLs unchanged', () => {
    expect(resolveFaviconHref({favicon: 'data:image/x-icon;base64,AAAA'})).toBe('data:image/x-icon;base64,AAAA');
  });

  it('builds a favicon URL from the long URL for relative favicons', () => {
    expect(resolveFaviconHref({long: 'https://example.com', favicon: '/favicon.ico'})).toBe('https://example.com/favicon.ico');
  });

  it('resolves relative favicons against long URLs with paths', () => {
    expect(resolveFaviconHref({long: 'https://example.com/some/page', favicon: 'favicon.ico'})).toBe('https://example.com/some/favicon.ico');
  });

  it('returns undefined for relative favicons without a long URL', () => {
    expect(resolveFaviconHref({favicon: '/favicon.ico'})).toBeUndefined();
  });

  it('returns undefined when the long URL is invalid', () => {
    expect(resolveFaviconHref({long: 'not-a-url', favicon: '/favicon.ico'})).toBeUndefined();
  });
});
