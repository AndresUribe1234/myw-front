import { useRef, useState, useContext } from "react";
import styles from "../../../styles/Login.module.scss";
import { useRouter } from "next/router";
import MainInput from "@/components/UI/MainInput";
import MainBtn from "@/components/UI/MainBtn";
import AuthContext from "@/store/auth-context";

const NewPassword = (props) => {
  const router = useRouter();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const passwordResetAPICALL = async function (
    passwordBody,
    confirmBody,
    token,
    email
  ) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          verificationToken: token,
          newPassword: passwordBody,
          confirmNewPassword: confirmBody,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account/forgot-password/post-token`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        router.push("/authentication");
        setSubmitingForm(false);
        setError(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function formSubmitHandler(event) {
    event.preventDefault();
    const passwordEntered = passwordRef.current.value;
    const confirmEntered = confirmRef.current.value;

    await passwordResetAPICALL(
      passwordEntered,
      confirmEntered,
      props.token,
      props.email
    );
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <div className={styles.auth_login_container}>
      <form onSubmit={formSubmitHandler} className={styles["auth-login-form"]}>
        <h1>
          por favor haz clic en el siguiente botón para finalizar el proceso de
          restablecimiento de tu contraseña
        </h1>
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
          <label>confirmar contraseña</label>
          <MainInput
            ref={confirmRef}
            type={"password"}
            minLength="8"
            onFocus={disappearErrHandler}
          />
        </div>
        {submitingForm && (
          <p className={styles.loggingIn}>restableciendo contraseña...</p>
        )}
        {!submitingForm && error && (
          <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <MainBtn type="submit">restablecer contraseña</MainBtn>
      </form>
    </div>
  );
};

export default NewPassword;
