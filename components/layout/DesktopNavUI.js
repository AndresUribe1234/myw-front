import React, { useState, useEffect, useContext } from "react";
import SearchComponent from "../functionality/SearchComponent";
import { useRouter } from "next/router";
import NavigationLink from "../UI/NavigationLink";
import AuthContext from "@/store/auth-context";
import MenuComponent from "../functionality/MenuComponent";

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

const DUMMY_ITEMS = [
  { label: "perfil", link: "/" },
  { label: "mi cuenta", link: "/" },
  { label: "cerrar sessión", link: "" },
];

const DesktopNavUI = () => {
  const [valueSearch, setValueSearch] = useState("");
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (valueSearch) {
      router.push(`/events/${valueSearch}`);
    }
  }, [valueSearch]);

  const searchBarValueHandler = (valueSearchBar) => {
    setValueSearch(valueSearchBar);
  };

  return (
    <React.Fragment>
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
      {authCtx.authObject.isLogIn ? (
        <MenuComponent menuItems={DUMMY_ITEMS} />
      ) : (
        <div>
          <NavigationLink href={"/authentication"}>
            inicia sessión
          </NavigationLink>
        </div>
      )}
    </React.Fragment>
  );
};

export default DesktopNavUI;
