import { createContext, useState } from "react";

const AuthContext = createContext({
  authObject: {},
  email: "",
  token: "",
  isLogIn: "",
  name: "",
  tokenFnx: function () {},
  logInFnx: function () {},
  emailFxn: function () {},
  nameFnx: function () {},
});

export function AuthContextProvider(props) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  function logInHandler(isLogIn) {
    setIsLogIn(isLogIn);
  }
  function emailHandler(email) {
    setEmail(email);
  }
  function tokenHandler(token) {
    setToken(token);
  }
  function nameHandler(name) {
    setName(name);
  }

  const context = {
    authObject: { email, token, isLogIn, name },
    emailFxn: emailHandler,
    tokenFnx: tokenHandler,
    logInFnx: logInHandler,
    nameFnx: nameHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
