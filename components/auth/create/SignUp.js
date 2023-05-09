import { useRef, useState } from "react";
import styles from "../../../styles/Login.module.scss";

import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const createAccountAPICall = async function (
    emailBody,
    passwordBody,
    confirmBody
  ) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailBody,
          password: passwordBody,
          confirm: confirmBody,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function formSubmitHandler(event) {
    event.preventDefault();
    const usernameValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const confirmValue = confirmRef.current.value;

    await createAccountAPICall(usernameValue, passwordValue, confirmValue);
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <div className={styles.auth_login_container}>
      {!emailSent && (
        <form
          onSubmit={formSubmitHandler}
          className={styles["auth-login-form"]}
        >
          <h1>crea tu cuenta</h1>
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
          <div>
            <label>confirma tu contraseña</label>
            <MainInput
              ref={confirmRef}
              type={"password"}
              minLength="8"
              onFocus={disappearErrHandler}
            />
          </div>
          {submitingForm && (
            <p className={styles.loggingIn}>creando tu cuenta...</p>
          )}
          {!submitingForm && error && (
            <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
          )}
          <MainBtn type="submit">crea tu cuenta</MainBtn>
        </form>
      )}

      {emailSent && (
        <div className={styles.message}>
          <h1>¡Gracias por registrarte en Max Your Watts!</h1>
          <p>
            Por favor, revisa tu correo electrónico y sigue las instrucciones
            para finalizar el proceso de registro. Si no recibes nuestro correo
            electrónico en los próximos minutos, asegúrate de revisar tu carpeta
            de correo no deseado o spam.
          </p>
          <p>
            Si necesitas ayuda o tienes alguna pregunta, no dudes en ponerte en
            contacto con nuestro equipo de soporte. Estamos aquí para ayudarte
            en todo lo que necesites.
          </p>
          <p>
            ¡Bienvenido a la comunidad de <span>Max Your Watts!</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
