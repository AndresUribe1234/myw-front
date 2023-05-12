import React, { useState, useEffect, useContext } from "react";
import SearchComponent from "../functionality/SearchComponent";
import NavigationLink from "../UI/NavigationLink";
import AuthContext from "@/store/auth-context";
import MenuComponent from "../functionality/MenuComponent";
import EventsContext from "@/store/events-context";

const DUMMY_ITEMS = [
  { label: "perfil", link: "/profile" },
  { label: "mi cuenta", link: "/myaccount" },
  { label: "cerrar sessión", link: "" },
];

const DesktopNavUI = () => {
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

  return (
    <React.Fragment>
      <div>
        <SearchComponent
          data={events}
          placeholder={"busca tu próxima momento..."}
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
