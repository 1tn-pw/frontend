import React, { useState } from 'react';
import './App.css';
import Shrink from './components/shrink';
import Redirect from './components/redirector';
import { Layout, Spin, Flex } from 'antd';
const { Header } = Layout;

function App() {
  const [spinning, setSpinning] = useState(false);

  const currentURL = window.location.href;
  let shortURL = '';
  if (currentURL.includes("/r/")) {
    shortURL = currentURL.split("/r/")[1];
  }

  return (
    <Flex gap={"middle"} vertical align={"start"}>
      <Layout className={"layoutStyle"}>
        <Header className={"headerStyle"}>1tn.pw</Header>
      </Layout>
      {shortURL ? <Redirect shortURL={shortURL} setSpinning={setSpinning} /> : <Shrink setSpinning={setSpinning} /> }
      {spinning && <Spin spinning={spinning} fullscreen />}
    </Flex>
  );
}

export default App;
