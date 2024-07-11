import {Spin} from "antd"
import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Box, Flex, Grid} from "@radix-ui/themes";
import {SiteHeader} from "../SiteHeader";

interface LayoutProps {
  spinning: boolean;
}
export const Layout: FC<LayoutProps> = ({spinning}) => {
  return (
    <Grid columns={"1"} gap={"2"} width={"auto"}>
      <Flex direction={"column"}>
        <Box className={"headerStyle"}>
          <SiteHeader />
        </Box>
        <Box className={"contentStyle"} height={"95vh"}>
          {spinning && <Spin spinning={spinning} fullscreen />}
          <Outlet />
        </Box>
        <Box className={"footerStyle"}>
          1tn.pw ©{new Date().getFullYear()} created by <a href={"https://chewedfeed.com"}>ChewedFeed</a>
        </Box>
      </Flex>
    </Grid>
  );
}
