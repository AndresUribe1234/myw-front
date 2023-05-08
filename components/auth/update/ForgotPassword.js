import { useRef, useState } from "react";
import styles from "../../../styles/Login.module.scss";
import { useRouter } from "next/router";
import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";
import NavigationLink from "@/components/UI/NavigationLink";

const ForgotPassword = () => {
  const router = useRouter();
  const emailRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const loginAPICall = async function (emailBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody }),
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
    const emailEntered = emailRef.current.value;

    await loginAPICall(emailEntered);
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <div className={styles.auth_login_container}>
      <form onSubmit={formSubmitHandler} className={styles["auth-login-form"]}>
        <h1>olvidaste tu contraseña</h1>
        <p>
          Para restablecer tu contraseña, ingresa la dirección de correo
          electrónico asociada con tu cuenta a continuación. Enviaremos un token
          de verificación a esta dirección de correo electrónico que puedes
          utilizar para restablecer tu contraseña.
        </p>
        <div>
          <label>correo</label>
          <MainInput
            ref={emailRef}
            type={"email"}
            onFocus={disappearErrHandler}
          />
        </div>
        {submitingForm && (
          <p className={styles.loggingIn}>enviando correo...</p>
        )}
        {!submitingForm && error && (
          <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <MainBtn type="submit">enviar</MainBtn>
      </form>
      <NavigationLink href={"/authentication"} className={styles.nav_link}>
        inicia sesión
      </NavigationLink>
    </div>
  );
};

export default ForgotPassword;
