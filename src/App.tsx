import React, {useEffect, useState} from 'react';
import {Spin} from 'antd';
import {useAuth} from "react-oidc-context";
import {BrowserRouter} from "react-router-dom";
import {Grid, Flex, Box} from "@radix-ui/themes"

import './App.css';
import {SiteHeader} from "./components/SiteHeader";
import {SiteRouter} from "./components/SiteRouter"

function App() {
  const auth = useAuth()

  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    return auth.events.addAccessTokenExpired((error) => {
      console.error("token err", error)
      auth.signoutSilent().catch(error => console.error("failed to auto-signin", error))
    })
  }, [auth])

  return (
    <BrowserRouter>
      <Grid columns={"1"} gap={"2"} width={"auto"}>
        <Flex direction={"column"}>
          <Box className={"headerStyle"}>
            <SiteHeader />
          </Box>
          <Box className={"contentStyle"} height={"90vh"}>
            {spinning && <Spin spinning={spinning} fullscreen />}
            <SiteRouter setSpinning={setSpinning} />
          </Box>
          <Box className={"footerStyle"}>
            1tn.pw ©{new Date().getFullYear()} created by <a href={"https://chewedfeed.com"}>ChewedFeed</a>
          </Box>
        </Flex>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
