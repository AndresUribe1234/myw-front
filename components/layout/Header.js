import { useState, useEffect } from "react";
import styles from "../../styles/Header.module.scss";
import NavigationLink from "../UI/NavigationLink";
import SearchComponent from "../functionality/SearchComponent";
import { useRouter } from "next/router";
import SidebarNav from "./SidebarNav";

const DUMMY_DATA = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grapes",
  "Strawberry",
  "Blueberry",
  "Mango",
  "Banana 10k",
  "Banana 5k",
];

const Header = () => {
  const [valueSearch, setValueSearch] = useState("");
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (valueSearch) {
      router.push(`/events/${valueSearch}`);
    }
  }, [valueSearch]);

  const searchBarValueHandler = (valueSearchBar) => {
    setValueSearch(valueSearchBar);
  };

  const desktopUI = (
    <>
      {" "}
      <div>
        <SearchComponent
          data={DUMMY_DATA}
          placeholder={"busca tu próxima carrera..."}
          onGetValue={searchBarValueHandler}
        />
      </div>
      <div>
        <NavigationLink href={"/events"}>eventos</NavigationLink>
      </div>
      <div>
        <NavigationLink href={"/events"}>organiza tu evento</NavigationLink>
      </div>
      <div>
        <NavigationLink href={"/authentication"}>inicia sessión</NavigationLink>
      </div>
    </>
  );
  return (
    <nav className={styles.navigation_bar}>
      <div>
        <NavigationLink href={"/"} className={styles.app_logo}>
          max your watts
        </NavigationLink>
      </div>
      {(windowSize.width <= 500 || windowSize.height <= 500) && <SidebarNav />}
      {windowSize.width > 500 && windowSize.height > 500 && desktopUI}
    </nav>
  );
};

export default Header;
