import React, {useEffect} from 'react';
import {useAuth} from "react-oidc-context";
import {BrowserRouter} from "react-router-dom";
import {FlagsProvider} from "@flags-gg/react-library"

import './App.css';
import {SiteRouter} from "./components/SiteRouter"

function App() {
  const auth = useAuth()

  useEffect(() => {
    return auth.events.addAccessTokenExpired((error) => {
      console.error("token err", error)
      auth.signoutSilent().catch(error => console.error("failed to auto-signin", error))
    })
  }, [auth])

  return (
    <BrowserRouter>
      <FlagsProvider
        options={{
          projectId: "7b517e7a-4fd1-4172-8cca-ef2b91ee8a84",
          agentId: "469f41e5-22bf-4696-b037-d3c3c04266b0",
          environmentId: "72bd9b4b-458f-4c45-a3c1-d13fb9097eb2"
        }}>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
