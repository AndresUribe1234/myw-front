import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import styles from "../styles/PageContainer.module.scss";

const MyAccountPage = () => {
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div className={styles.page_container_column}>
      <h1>Tus configuraciones</h1>
      <section>modificar email</section>
      <section>modificar clave</section>
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default MyAccountPage;
