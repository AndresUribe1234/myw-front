import { useRef, useState } from "react";
import styles from "../../../styles/Login.module.scss";
import { useRouter } from "next/router";
import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";
import NavigationLink from "@/components/UI/NavigationLink";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const loginAPICall = async function (emailBody, passwordBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody, password: passwordBody }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/login`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        console.log("Success API call");
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function formSubmitHandler(event) {
    event.preventDefault();
    const usernameEnteredValue = emailRef.current.value;
    const passwordEnteredValue = passwordRef.current.value;

    await loginAPICall(usernameEnteredValue, passwordEnteredValue);
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
