import { createContext, useState, useEffect } from "react";

const RegistrationCartContext = createContext({
  eventInformation: {},
  setEventFxn: function () {},
});

export function RegistrationCartContextProvider(props) {
  const [eventInformation, setEventInformation] = useState({});

  function eventInformationHandler(event) {
    setEventInformation({ ...event });
  }

  const context = {
    eventInformation,
    setEventFxn: eventInformationHandler,
  };

  return (
    <RegistrationCartContext.Provider value={context}>
      {props.children}
    </RegistrationCartContext.Provider>
  );
}

export default RegistrationCartContext;
