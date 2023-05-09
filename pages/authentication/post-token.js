import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
import { useState, useContext, Fragment } from "react";
import Spinner from "@/components/UI/Spinner";
import AuthContext from "@/store/auth-context";
import NewPassword from "@/components/auth/update/NewPasswod";

const postTokenPage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  console.log(router);
  const token = router.query?.token || "";
  const email = router.query?.email || "";
  const from = router.query?.from || "";
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  console.log(email, token);

  const verificationTokenNewAccount = async function () {
    try {
      console.log(token, email);
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, verificationToken: token }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account/post-token`,
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
        authCtx.nameFnx(data.data.user.email);
        router.push("/profile?from=createAccount");
        setSubmitingForm(false);
        setError(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = async () => {
    console.log("btn clicked!");
    if (from === "signup") {
      await verificationTokenNewAccount();
    }
  };

  let postTokenContent = (
    <Fragment>
      <h1>
        para finalizar tu registro, por favor haz clic en el siguiente botón
      </h1>
      <MainBtn onClick={clickHandler}>verificar token</MainBtn>
    </Fragment>
  );

  if (from === "forgot-password") {
    postTokenContent = <NewPassword token={token} email={email} />;
  }

  return (
    <div className={styles.message}>
      {!submitingForm && !error && postTokenContent}
      {submitingForm && !error && <Spinner />}
      {!submitingForm && error && (
        <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
      )}
    </div>
  );
};

export default postTokenPage;
