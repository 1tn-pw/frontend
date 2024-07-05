import { Dispatch, SetStateAction, FC } from "react";
import {useRoutes} from "react-router-dom";

import {Shrink} from '../../pages/Shrink';
import {Redirect} from '../../pages/Redirector';
import {Dashboard} from '../../pages/Dashboard';

interface SiteRouterProps {
  setSpinning: Dispatch<SetStateAction<boolean>>;
}

export const SiteRouter: FC<SiteRouterProps> = ({setSpinning}) => {
  const currentURL = window.location.href;
  const shortURL = currentURL.split("/")[1];

  const routes = [
    {
      path: "/",
      element: <Shrink setSpinning={setSpinning} />,
      children: [
        
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "*",
          element: <Redirect shortURL={shortURL} setSpinning={setSpinning} />
        },
      ]
    },
  ]
  
  return useRoutes(routes)
}
