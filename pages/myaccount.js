import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const MyAccountPage = () => {
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div>
      My account page
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default MyAccountPage;
