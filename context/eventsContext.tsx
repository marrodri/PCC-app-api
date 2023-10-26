import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Props {
  children?: ReactNode;
}

export interface EventInterface {
  eventTitle: string;
  eventOrganizer: string;
  datesOfEvent: string;
  imgUrl: string;
  eventLocation: string;
  eventExcerpt: string;
  publishedDate: string;
  //   id: string;
}

interface EventsContextInterface {
  events: Array<EventInterface>;
  fetchEventData: () => Promise<any> | void;
  setEventData: (eventDataJson:any) => void | void;
  getEvents: () => void | void;
}

const EventsContext = createContext<EventsContextInterface>({
  events: [],
  fetchEventData: () => undefined,
  setEventData: () => undefined,
  getEvents: () => undefined,
});

const EventsProvider = ({ children }: Props): JSX.Element => {
  const [events, setEvents] = useState<Array<EventInterface>>([]);
  const fetchEventData = async () => {
    const response: any = await fetch(
      "https://apps.pasadena.edu/wp-content/uploads/all-events-feed.json?ver=32"
    );
    return response.json();
  };

  const setEventData = (eventDataJson:any) => {
    //set the event and push it the array.
  };

  const getEvents = () => {
    return events;
  };

  return (
    <EventsContext.Provider
      value={{
        events: events,
        fetchEventData: fetchEventData,
        setEventData: setEventData,
        getEvents: getEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

const useEvents = () => useContext(EventsContext);

export { EventsProvider, useEvents };
