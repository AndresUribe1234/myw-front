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
  surnameFnx: function () {},
  phoneNumberFnx: function () {},
  countryCodeFnx: function () {},
  dateOfBirthFnx: function () {},
  refreshUserFnx: function () {},
});

export function AuthContextProvider(props) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

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
  function surnameHandler(name) {
    setSurname(name);
  }
  function phoneNumberHandler(name) {
    setPhoneNumber(name);
  }
  function countryCodeHandler(name) {
    setCountryCode(name);
  }
  function dateOfBirthHandler(name) {
    setDateOfBirth(name);
  }

  const refreshUserHandler = async () => {
    try {
      const object = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
        setName(data.user.name);
        setSurname(data.user.surname);
        setDateOfBirth(data.user.dateOfBirth);
        setPhoneNumber(data.user.phoneNumber);
        setCountryCode(data.user.countryCode);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const context = {
    authObject: { email, token, isLogIn },
    user: { name, surname, dateOfBirth, phoneNumber, countryCode },
    emailFxn: emailHandler,
    tokenFnx: tokenHandler,
    logInFnx: logInHandler,
    nameFnx: nameHandler,
    surnameFnx: surnameHandler,
    phoneNumberFnx: phoneNumberHandler,
    countryCodeFnx: countryCodeHandler,
    dateOfBirthFnx: dateOfBirthHandler,
    refreshUserFnx: refreshUserHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
