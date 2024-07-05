import {useAuth} from "react-oidc-context";
import {LockClosedIcon, LockOpen2Icon} from "@radix-ui/react-icons";
import {Button} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";

export const LoginButton = () => {
  const auth = useAuth();
  const navigate = useNavigate()
  
  const signOut = () => {
    auth.signoutSilent().catch(console.error)
    navigate("/")
  }

  return (
    <>
      {auth.isAuthenticated ? (
          <Button onClick={signOut} color={"purple"}>
          <LockOpen2Icon width={16} height={16 } /> Sign Out
        </Button>
      ) : (
        <Button onClick={() => auth.signinRedirect()} color={"purple"}>
          <LockClosedIcon width={16} height={16 } /> Sign In
        </Button>
      )}
    </>
  )
}
