import React from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from "antd";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css'

import {ComponentPreviews, useInitial} from "./dev";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import {oidcConfig} from "./app.config";
import {AuthProvider} from "react-oidc-context";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ConfigProvider direction={"ltr"}>
            <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
              <AuthProvider {...oidcConfig}>
                <Theme accentColor="purple" grayColor="slate">
                  <App/>
                </Theme>
              </AuthProvider>
            </DevSupport>
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();
