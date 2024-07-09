import { FC } from "react";
import {useRoutes} from "react-router-dom";

import {Shrink} from '../../pages/Shrink';
import {Redirect} from '../../pages/Redirector';


export const SiteRouter: FC = () => {
  const currentURL = window.location.href;
  const shortURL = currentURL.split("/")[3];

  const routes = [
    {
      path: "/",
      element: <Shrink />,
      index: true,
    },
    {
      path: "*",
      element: <Redirect shortURL={shortURL} />
    }
  ]

  return useRoutes(routes)
}
