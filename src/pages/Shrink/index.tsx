import { FC, useState } from 'react';
// Replace heavy Ant Design components with lighter alternatives
import {Button, Flex, Spinner} from "@radix-ui/themes";
import styles from "./Shrink.module.css";
import {Box, Grid} from "@radix-ui/themes";
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
      return <Spinner size="3" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999}} />
    }

    return (
      <Grid columns={"1"} gap={"2"} width={"auto"}>
        <Flex direction={"column"}>
          <Box className={"headerStyle"}>
            <SiteHeader />
          </Box>
          <Box className={"contentStyle"} height={"95vh"}>
            {shrinkSuccess && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"3"}>
                <Box style={{textAlign: 'center', padding: '2rem'}}>
                  <h2 style={{color: 'green', marginBottom: '1rem'}}>Success!</h2>
                  <p style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>{shrinkResult}</p>
                  <Button onClick={copyIt} style={{marginRight: '1rem'}}>Copy</Button>
                  <Button onClick={closeButton}>Close</Button>
                </Box>
              </Flex>
            )}
            {shrinkError && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"3"}>
                <Box style={{textAlign: 'center', padding: '2rem'}}>
                  <h2 style={{color: 'red', marginBottom: '1rem'}}>Error</h2>
                  <p style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>{shrinkErrorReason}</p>
                  {invalidURL ? (
                    <Button onClick={closeButton}>Close</Button>
                  ) : (
                    <Button onClick={shrinkIt}>Try Again</Button>
                  )}
                </Box>
              </Flex>
            )}
            {showInput && (
              <Flex className={styles.boxStyle} justify={'center'} align={'center'} gap={"3"}>
                <Box style={{display: 'flex', width: '100%', maxWidth: '500px'}}>
                  <input 
                    id={"shrinkInput"} 
                    className={styles.shrinkInput} 
                    placeholder={"https://chewedfeed.com"} 
                    onKeyDown={(e) => e.key === 'Enter' && shrinkIt()}
                    style={{flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
                  />
                  <Button id={"shrinkButton"} className={styles.shrinkButton} onClick={shrinkIt} style={{marginLeft: '0.5rem'}}>Shrink</Button>
                </Box>
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
