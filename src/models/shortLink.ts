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

  try {
    return new URL(favicon).toString();
  } catch {
    // Fall through and resolve relative favicon URLs against the long URL.
  }

  if (!long || long === '') {
    return undefined;
  }

  try {
    return new URL(favicon, long).toString();
  } catch {
    return undefined;
  }
}
