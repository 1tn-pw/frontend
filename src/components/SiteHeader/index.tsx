import styles from "./SiteHeader.module.css"
import {Menu, MenuProps} from "antd";
import {LoginButton} from "../LoginButton";
import {useAuth} from "react-oidc-context";
import {Link, NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@radix-ui/react-navigation-menu";

export const SiteHeader = () => {
  const auth = useAuth();

  const menuItems: MenuProps['items'] = [
    // {key: "shrink", label: "Link Reducer", icon: <ShrinkOutlined />},
    // {key: "dashboard", label: "Dashboard", icon: <ApartmentOutlined />},
  ]

  const clickLink: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case "shrink":
        window.location.href = "/shrink";
        break;
      case "dashboard":
        window.location.href = "/";
        break;
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.title}>1tn.pw</div>

      {auth?.isAuthenticated ? (
        <div className={styles.menu}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/shrink"}>Link Reducer</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/"}>Dashboard</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Menu theme="dark" mode="horizontal" items={menuItems} onClick={clickLink} />
        </div>
      ) : (
        <div className={styles.spacer}>&nbsp;</div>
      )}
      <div className={styles.login}>
        <LoginButton />
      </div>
    </div>
  );
}
