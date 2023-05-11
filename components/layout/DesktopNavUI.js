import React, { useState, useEffect, useContext } from "react";
import SearchComponent from "../functionality/SearchComponent";
import { useRouter } from "next/router";
import NavigationLink from "../UI/NavigationLink";
import AuthContext from "@/store/auth-context";
import MenuComponent from "../functionality/MenuComponent";
import EventsContext from "@/store/events-context";

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
  { label: "perfil", link: "/profile" },
  { label: "mi cuenta", link: "/myaccount" },
  { label: "cerrar sessión", link: "" },
];

const DesktopNavUI = () => {
  const [valueSearch, setValueSearch] = useState({});
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const eventsCtx = useContext(EventsContext);
  const [fetchingData, setFetchingData] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!eventsCtx.fetchingData) {
      setFetchingData(false);
      const eventsName = eventsCtx.eventsObject.allEvents.map((ele) => {
        return { title: ele.title, id: ele._id };
      });

      setEvents(eventsName);
    }
  }, [eventsCtx.eventsObject.allEvents]);

  useEffect(() => {
    if (valueSearch) {
      router.push(`/events/${valueSearch.value}?id=${valueSearch.id}`);
    }
  }, [valueSearch]);

  const searchBarValueHandler = (valueSearchBar, id) => {
    setValueSearch({ value: valueSearchBar, id: id });
  };

  return (
    <React.Fragment>
      <div>
        <SearchComponent
          data={events}
          placeholder={"busca tu próxima carrera..."}
          onGetValue={searchBarValueHandler}
        />
      </div>
      <div>
        <NavigationLink href={"/events"}>eventos</NavigationLink>
      </div>
      <div>
        <NavigationLink href={"/events/personal"}>
          organiza tu evento
        </NavigationLink>
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
