import { useRef, useState, useContext } from "react";
import styles from "../../../styles/Login.module.scss";
import { useRouter } from "next/router";
import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";
import NavigationLink from "@/components/UI/NavigationLink";
import AuthContext from "@/store/auth-context";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const loginAPICall = async function (emailBody, passwordBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody, password: passwordBody }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account/login`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        localStorage.setItem(
          "authObject",
          JSON.stringify({
            loggedIn: true,
            token: data.token,
            email: data.data.user.email,
          })
        );
        authCtx.logInFnx(true);
        authCtx.tokenFnx(data.token);
        authCtx.emailFxn(data.data.user.email);
        router.push("/?from=createAccount");
        setSubmitingForm(false);
        setError(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function formSubmitHandler(event) {
    event.preventDefault();
    const usernameEntered = emailRef.current.value;
    const passwordEntered = passwordRef.current.value;

    await loginAPICall(usernameEntered, passwordEntered);
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <div className={styles.auth_login_container}>
      <form onSubmit={formSubmitHandler} className={styles["auth-login-form"]}>
        <h1>inicia sesión</h1>
        <div>
          <label>correo</label>
          <MainInput
            ref={emailRef}
            type={"email"}
            onFocus={disappearErrHandler}
          />
        </div>
        <div>
          <label>contraseña</label>
          <MainInput
            ref={passwordRef}
            type={"password"}
            minLength="8"
            onFocus={disappearErrHandler}
          />
        </div>
        {submitingForm && (
          <p className={styles.loggingIn}>iniciando sesión...</p>
        )}
        {!submitingForm && error && (
          <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <MainBtn type="submit">inicia sesión</MainBtn>
      </form>
      <NavigationLink
        href={"/authentication/forgotpassword"}
        className={styles.nav_link}
      >
        olvidaste tu contraseña
      </NavigationLink>
    </div>
  );
};

export default Login;
