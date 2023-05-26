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

  useEffect(() => {
    if (authCtx.authObject.isLogIn) {
      fetchUserInformation();
    }
  }, [authCtx]);

  const fetchUserInformation = async () => {
    try {
      const object = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data.err);
      }

      if (response.status === 200) {
        authCtx.nameFnx(data.user.name);
        authCtx.surnameFnx(data.user.surname);
        authCtx.dateOfBirthFnx(data.user.dateOfBirth);
        authCtx.phoneNumberFnx(data.user.phoneNumber);
        authCtx.countryCodeFnx(data.user.countryCode);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
