// Redirect.tsx
import {FC, useState, useEffect, Dispatch, useCallback} from 'react';

interface RedirectProps {
  shortURL: string;
  setSpinning: Dispatch<boolean>;
}

interface shortDoc {
  short?: string;
  long?: string;
  title?: string;
  description?: string;
  favicon?: string;
}

const Redirect: FC<RedirectProps> = ({ shortURL, setSpinning }) => {
  const [data, setData] = useState<shortDoc>({});

  const getLongURL = useCallback((shortURL: string) => {
    let apiURL = "https://api.1tn.pw/v1";
    if (process.env.NODE_ENV === "development") {
      apiURL = "http://localhost:8081";
    }

    fetch(`${apiURL}/${shortURL}`, {
        method: "GET",
    }).then(async (res) => {
      const data: shortDoc = await res.json();
      setData(data);
    }).catch((err) => {
      console.error("redirect error", err);
      setSpinning(false);
    })
  }, [setSpinning]);

  useEffect(() => {
    getLongURL(shortURL)
    setSpinning(true);
  }, [shortURL, getLongURL, setSpinning]);

  useEffect(() => {
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
      setSpinning(false);
      window.location.href = data.long;
    }
  }, [setSpinning, data]);

  return null;
}

export default Redirect;
