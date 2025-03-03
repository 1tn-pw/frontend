import {FC, useState, useEffect, useCallback} from 'react';
import {Spin} from "antd";

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

  const getLongURL = useCallback((shortURL: string) => {
    let apiURL = "https://api.1tn.pw";

    fetch(`${apiURL}/${shortURL}`, {
        method: "GET",
    }).then(async (res) => {
      const data: shortDoc = await res.json();
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
