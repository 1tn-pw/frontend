export interface RedirectProps {
  shortURL: string;
}

export interface ShortDocument {
  short?: string;
  long?: string;
  title?: string;
  description?: string;
  favicon?: string;
}

export interface CreateShortLinkRequest {
  url: string;
}

export interface CreateShortLinkResponse {
  short: string;
}

export const resolveFaviconHref = ({favicon, long}: ShortDocument): string | undefined => {
  if (!favicon || favicon === '') {
    return undefined;
  }

  if (favicon.startsWith('http')) {
    return favicon;
  }

  if (!long || long === '') {
    return undefined;
  }

  return `${long}${favicon}`;
}