import React, { useState, useEffect } from "react";
import SearchComponent from "../functionality/SearchComponent";
import { useRouter } from "next/router";
import NavigationLink from "../UI/NavigationLink";

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

const DesktopNavUI = () => {
  const [valueSearch, setValueSearch] = useState("");
  const router = useRouter();

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
      <div>
        <NavigationLink href={"/authentication"}>inicia sessión</NavigationLink>
      </div>
    </React.Fragment>
  );
};

export default DesktopNavUI;
