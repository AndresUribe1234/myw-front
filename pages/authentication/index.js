import Login from "@/components/auth/create/Login";
import SignUp from "@/components/auth/create/SignUp";
import { useState } from "react";
import styles from "../../styles/Login.module.scss";

const AuthenticationPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  function switchLoginHandler() {
    setLoginForm((prev) => !prev);
  }

  return (
    <div>
      {loginForm && <Login />}
      {!loginForm && <SignUp />}
      <div className={styles.btn_container}>
        <button type="button" onClick={switchLoginHandler}>
          {loginForm ? "crea tu cuenta" : "inicia sessión"}
        </button>
      </div>
    </div>
  );
};

export default AuthenticationPage;
