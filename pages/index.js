import HeroSection from "@/components/home/HeroSection";
import Head from "next/head";
import styles from "../styles/PageContainer.module.scss";
import ImageCarousel from "@/components/functionality/ImageCarousel";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import CalendarSection from "@/components/home/CalendarSection";

const images = [
  "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyYXRob258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1528802704307-fb7d0f29ad0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  "https://images.unsplash.com/photo-1510766461678-4a8420db04d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80",
  "https://images.unsplash.com/photo-1596460658047-1826d5921c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MYW app</title>
        <meta name="description" content="MYW app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page_container_no_m}>
        <HeroSection />
        <div className={styles.sub_section}>
          <ImageCarousel images={images} />
          <MainBtn
            onClick={() => {
              router.push("/events");
            }}
          >
            explora todos nuestros eventos
          </MainBtn>
        </div>
      </div>
      <CalendarSection color={"#f4f4f4"} />
    </>
  );
}
