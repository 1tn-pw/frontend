import React from 'react';
import './App.css';
import {Button, Flex, Space, Input, Layout, Spin, Result} from "antd";
import {Header} from "antd/es/layout/layout";

function App() {
  const [spinning, setSpinning] = React.useState(false);
  const [shrinkSuccess, setShrinkSuccess] = React.useState(false);
  const [shrinkError, setShrinkError] = React.useState(false);
  const [shrinkErrorReason, setShrinkErrorReason] = React.useState("");
  const [showInput, setShowInput] = React.useState(true);
  const [shrinkResult, setShrinkResult] = React.useState("");
  const [invalidURL, setInvalidURL] = React.useState(false);

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
    let apiURL = "https://api.1tn.pw/v1/create";
    apiURL = "http://localhost:8081/create";
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

  const copyIt = async () => {
    try {
      await navigator.clipboard.writeText(shrinkResult);
      setShrinkResult("Copied!");
    } catch (err) {
      setShrinkError(true);
      setShrinkErrorReason("Failed Client Side");
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

  return (
    <Flex gap={"middle"} vertical align={"start"}>
      <Layout className={"layoutStyle"}>
        <Header className={"headerStyle"}>1tn.pw</Header>
      </Layout>
      {shrinkSuccess && (
        <Flex className={"boxStyle"} justify={'center'} align={'center'} gap={"middle"}>
          <Result status="success" title={shrinkResult} className={"resultStyle"} extra={
            <>
              <Button type="primary" key="copy" onClick={copyIt}>Copy</Button>
              <Button type="primary" key="close" onClick={closeButton}>Close</Button>
            </>
          }/>
        </Flex>
      )}
      {shrinkError && (
        <Flex className={"boxStyle"} justify={'center'} align={'center'} gap={"middle"}>
          <Result status="error" title={shrinkErrorReason} className={"resultStyle"} extra={
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
        <Flex className={"boxStyle"} justify={'center'} align={'center'} gap={"middle"}>
          <Space.Compact size={"large"} style-={{width: '100%'}}>
            <Input id={"shrinkInput"} placeholder={"https://chewedfeed.com"} onPressEnter={shrinkIt} />
            <Button id={"shrinkButton"} type={"primary"} onClick={shrinkIt}>Shrink</Button>
          </Space.Compact>
        </Flex>
      )}
      {spinning && <Spin spinning={spinning} fullscreen />}
    </Flex>
  );
}

export default App;