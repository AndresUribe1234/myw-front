import { useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";

import Header from "./Header";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authInfo = localStorage.getItem("authObject");
    const authInfoJson = JSON.parse(authInfo);

    if (authInfoJson && authInfoJson.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authInfoJson.token);
      authCtx.emailFxn(authInfoJson.email);
    }
  }, []);

  console.log("auth context", authCtx);
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
