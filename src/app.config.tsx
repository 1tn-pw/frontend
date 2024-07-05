import {AuthProviderProps} from "react-oidc-context";
import {User, WebStorageStateStore} from "oidc-client-ts";


export const oidcConfig = {
  authority: "https://keys.chewedfeed.com/realms/1tn-pw",
  client_id: "dashboard",
  client_secret: "2fCEmTiQjunEJRtbjocJsuJUMygABDrJ",
  redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps;
