import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  console.log(router);

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div>
      Not complete page
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default ProfilePage;
