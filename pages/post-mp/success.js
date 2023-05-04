import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();
  console.log(router);

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div>
      Success page
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default SuccessPage;
