import {FC, useState, useEffect, useCallback, useRef} from 'react';
import {Spinner} from "@radix-ui/themes";

interface RedirectProps {
  shortURL: string;
}

interface shortDoc {
  short?: string;
  long?: string;
  title?: string;
  description?: string;
  favicon?: string;
}

export const Redirect: FC<RedirectProps> = ({ shortURL }) => {
  const [data, setData] = useState<shortDoc>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const getLongURL = useCallback((shortURL: string) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    let apiURL = "https://api.1tn.pw";
    //apiURL = "http://localhost:8081";

    fetch(`${apiURL}/${shortURL}`, {
        method: "GET",
        signal: abortControllerRef.current.signal
    }).then(async (res) => {
      const data: shortDoc = await res.json();
      setData(data);
    }).catch((err) => {
      if (err.name !== 'AbortError') {
        console.error("redirect error", err);
      }
    })
  }, []);

  useEffect(() => {
    getLongURL(shortURL)
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [shortURL, getLongURL]);

  useEffect(() => {
    // Store original values for cleanup
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const originalFavicon = document.querySelector('link[rel="icon"]')?.getAttribute('href') || '';
    
    const metaTags = document.getElementsByName("meta") as NodeListOf<HTMLMetaElement>
    metaTags.forEach((metaTag: HTMLMetaElement) => {
      if (metaTag.getAttribute("name") === "description") {
        if (data.description && data.description !== "") {
          metaTag.setAttribute("content", data.description);
        }
      }
    });

    const linkTags = document.getElementsByName("link") as NodeListOf<HTMLLinkElement>
    linkTags.forEach((linkTag: HTMLLinkElement) => {
      if (linkTag.getAttribute("rel") === "icon") {
        if (data.favicon && data.favicon !== "") {
          if (data.favicon.startsWith("http")) {
            linkTag.setAttribute("href", data.favicon);
          } else {
            linkTag.setAttribute("href", data.long + data.favicon);
          }
        }
      }
    });

    if (data.long && data.long !== "") {
      window.location.href = data.long;
    }
    
    // Cleanup function to restore original values
    return () => {
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc && originalDescription) {
        metaDesc.setAttribute('content', originalDescription);
      }
      
      const linkIcon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (linkIcon && originalFavicon) {
        linkIcon.setAttribute('href', originalFavicon);
      }
    };
  }, [data]);

  return <Spinner 
    size="3" 
    style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
    }} />;
}
