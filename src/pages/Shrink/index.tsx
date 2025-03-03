import { FC, useState } from 'react';
import {Button, Input, Result, Space, Spin} from 'antd';
import styles from "./Shrink.module.css";
import {Box, Grid, Flex} from "@radix-ui/themes";
import {SiteHeader} from "../../components/SiteHeader";

export const Shrink: FC = () => {
    const [shrinkSuccess, setShrinkSuccess] = useState(false);
    const [shrinkError, setShrinkError] = useState(false);
    const [shrinkErrorReason, setShrinkErrorReason] = useState("");
    const [showInput, setShowInput] = useState(true);
    const [shrinkResult, setShrinkResult] = useState("");
    const [invalidURL, setInvalidURL] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const copyIt = async () => {
      try {
        await navigator.clipboard.writeText(shrinkResult);
        setShrinkResult("Copied!");
      } catch (err) {
        setShrinkError(true);
        setShrinkErrorReason("Failed Client Side");
      }
    }

    const validateURL = (url: string): boolean => {
        if (url === "") {
            setShrinkError(true);
            setShrinkErrorReason("URL is empty");
            setSpinning(false);
            setInvalidURL(true);
            return false;
        }

        if (!url.includes(".")) {
            setShrinkError(true);
            setShrinkErrorReason("Invalid URL");
            setSpinning(false);
            setInvalidURL(true);
            return false;
        }
        if (url.includes("1tn.pw")) {
            setShrinkError(true);
            setShrinkErrorReason("Circular Shrinkage Detected");
            setSpinning(false);
            setInvalidURL(true);
            return false;
        }

        return true;
    }

    const shrinkIt = async () => {
        setSpinning(true);
        setShowInput(false);
        let url = (document.getElementById("shrinkInput") as HTMLInputElement).value;
        let apiURL = "https://api.1tn.pw/create";
        if (!validateURL(url)) {
            return;
        }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        const res = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url
            })
        });
        const data = await res.json();
        if (res.ok) {
            setShrinkSuccess(true);
            setShrinkResult(`https://1tn.pw/${data.short}`);
            setSpinning(false);
        } else {
            setShrinkError(true);
            setSpinning(false);
            setShrinkErrorReason("Failed Server Side");
        }
    }

    const closeButton = () => {
      setShowInput(true);
      setShrinkSuccess(false);
      setShrinkResult("");
      setShrinkError(false);
      const si = document.getElementById("shrinkInput") as HTMLInputElement;
      if (si) {
        si.value = "";
      }
    }

    if (spinning) {
      return <Spin spinning={true} fullscreen />
    }

    return (
      <Grid columns={"1"} gap={"2"} width={"auto"}>
        <Flex direction={"column"}>
          <Box className={"headerStyle"}>
            <SiteHeader />
          </Box>
          <Box className={"contentStyle"} height={"95vh"}>
            {shrinkSuccess && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"middle"}>
                <Result status="success" title={shrinkResult} className={styles.resultStyle} extra={
                  <>
                    <Button type="primary" key="copy" onClick={copyIt}>Copy</Button>
                    <Button type="primary" key="close" onClick={closeButton}>Close</Button>
                  </>
                }/>
              </Flex>
            )}
            {shrinkError && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"middle"}>
                <Result status="error" title={shrinkErrorReason} className={styles.resultStyle} extra={
                  <>
                  {invalidURL ? (
                    <Button type="primary" key="close" onClick={closeButton}>
                      Close
                    </Button>
                  ) : (
                    <Button type="primary" key="console" onClick={shrinkIt}>
                      Try Again
                    </Button>
                  )}
                  </>
                }/>
              </Flex>
            )}
            {showInput && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"middle"}>
                <Space.Compact size={"large"} style-={{width: '100%'}}>
                  <Input id={"shrinkInput"} className={styles.shrinkInput} placeholder={"https://chewedfeed.com"} onPressEnter={shrinkIt} />
                  <Button id={"shrinkButton"} className={styles.shrinkButton} type={"primary"} onClick={shrinkIt}>Shrink</Button>
                </Space.Compact>
              </Flex>
            )}
          </Box>
          <Box className={"footerStyle"}>
            1tn.pw ©{new Date().getFullYear()} created by <a href={"https://chewedfeed.com"}>ChewedFeed</a>
          </Box>
        </Flex>
      </Grid>
    )
}
