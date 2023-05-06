import { useState, useEffect } from "react";
import styles from "../../styles/Header.module.scss";
import NavigationLink from "../UI/NavigationLink";
import SearchComponent from "../functionality/SearchComponent";
import { useRouter } from "next/router";

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

  useEffect(() => {
    if (valueSearch) {
      router.push(`/events/${valueSearch}`);
    }
  }, [valueSearch]);

  const searchBarValueHandler = (valueSearchBar) => {
    setValueSearch(valueSearchBar);
    console.log("nav bar prop exectued");
  };

  return (
    <nav className={styles.navigation_bar}>
      <div>
        <NavigationLink href={"/"} className={styles.app_logo}>
          max your watts
        </NavigationLink>
      </div>
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
    </nav>
  );
};

export default Header;
