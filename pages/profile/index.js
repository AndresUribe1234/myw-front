import ProfileForm from "@/components/user-related/ProfileForm";
import styles from "../../styles/PageContainer.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.page_container_column}>
      <h1>Tu información de registro</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
