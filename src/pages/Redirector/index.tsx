import {FC, useState, useEffect, useCallback} from 'react';
import {Spin} from "antd";
import {RedirectProps, resolveFaviconHref, ShortDocument} from '../../models/shortLink';

export const Redirect: FC<RedirectProps> = ({ shortURL }) => {
  const [data, setData] = useState<ShortDocument>({});

  const getLongURL = useCallback((shortURL: string) => {
    let apiURL = "https://api.1tn.pw";

    fetch(`${apiURL}/${shortURL}`, {
        method: "GET",
    }).then(async (res) => {
      const data: ShortDocument = await res.json();
      setData(data);
    }).catch((err) => {
      console.error("redirect error", err);
    })
  }, []);

  useEffect(() => {
    getLongURL(shortURL)
  }, [shortURL, getLongURL]);

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
        const faviconHref = resolveFaviconHref(data);
        if (faviconHref) {
          linkTag.setAttribute("href", faviconHref);
        }
      }
    });

    if (data.long && data.long !== "") {
      window.location.href = data.long;
    }
  }, [data]);

  return <Spin
    fullscreen
    size={"large"}
    spinning={true}
    style={{
      color: "#1890ff",
      zIndex: 9999,
    }} />;
}
