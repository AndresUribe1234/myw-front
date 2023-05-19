import CardNavigation from "@/components/UI/CardNavigation";
import styles from "../../../styles/PageContainer.module.scss";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const EventsPersonalPage = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (!authCtx.authObject) {
    return <Spinner />;
  }

  if (authCtx.authObject.isLogIn === false) {
    return (
      <div className={styles.page_container_column}>
        <p>
          Para acceder a esta función, necesitas iniciar sesión en tu cuenta.
          Por favor, inicia sesión o crea una cuenta si aún no tienes una.
        </p>
        <MainBtn
          onClick={() => {
            router.push("/authentication");
          }}
        >
          Haz clic aquí para iniciar sesión o crear una cuenta
        </MainBtn>
      </div>
    );
  }

  return (
    <div className={styles.page_container}>
      <CardNavigation
        href={"/events/personal/manage"}
        title={"mis eventos"}
        description={
          "muestra todos los eventos que has creado y te permite acceder a información detallada sobre cada evento"
        }
      />
      <CardNavigation
        href={"/events/personal/create"}
        title={"crear evento"}
        description={
          "crea un nuevo evento y personaliza su información y detalles específicos"
        }
      />
    </div>
  );
};

export default EventsPersonalPage;
