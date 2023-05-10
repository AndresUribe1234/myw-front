import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div>
      Profile page
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default ProfilePage;
