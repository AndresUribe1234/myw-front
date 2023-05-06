import { useRef, useState } from "react";
import styles from "../../../styles/Login.module.scss";
import { useRouter } from "next/router";
import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const loginAPICall = async function (emailBody, passwordBody, confirmBody) {
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
    const usernameValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const confirmedValue = confirmRef.current.value;

    await loginAPICall(usernameValue, passwordValue, confirmedValue);
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <div className={styles.auth_login_container}>
      <form onSubmit={formSubmitHandler} className={styles["auth-login-form"]}>
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
        {submitingForm && <p className={styles.loggingIn}>Logging in...</p>}
        {!submitingForm && error && (
          <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <MainBtn type="submit">crea tu cuenta</MainBtn>
      </form>
    </div>
  );
};

export default SignUp;
