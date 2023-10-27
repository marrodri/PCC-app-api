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
  title: string;
  featured_image: string;
  organizer_name: string;
  event_excerpt: string;
  published_date: string;
  start: string;
  end: string;
  location_address: string;
  id:number;
  //   id: string;
}

interface EventsContextInterface {
  events: Array<EventInterface>;
  fetchEventData: () => Promise<any> | void;
  parseEventDataJson: (eventDataJson: any, index:number) => void | void;
  getEvents: () => any | void;
  setEvents: (events:Array<EventInterface>) => void | void;
}

const EventsContext = createContext<EventsContextInterface>({
  events: [],
  fetchEventData: () => undefined,
  setEvents: () => undefined,
  getEvents: () => undefined,
  parseEventDataJson: () => undefined,
});

const EventsProvider = ({ children }: Props): JSX.Element => {
  const [events, setEvents] = useState<Array<EventInterface>>([]);
  const fetchEventData = async () => {
    const response: any = await fetch(
      "https://apps.pasadena.edu/wp-content/uploads/all-events-feed.json?ver=32"
    );
    return response.json();
  };

  // const setNewEvents = (events: Array<EventInterface>) => {
  //set the event and push it the array.
  // setEvents(events);
  // };
  const parseEventDataJson = (eventDataJson: any, index:number) => {
    const parsedEvent: EventInterface = {
      title: eventDataJson["title"],
      featured_image: eventDataJson["featured_image"],
      organizer_name: eventDataJson["organizer_name"],
      event_excerpt: eventDataJson["event_excerpt"],
      published_date: eventDataJson["published_date"],
      start: eventDataJson["start"],
      end: eventDataJson["end"],
      location_address: eventDataJson["location_address"],
      id:index,
    };
    return parsedEvent;
  };
  const getEvents:any = () => {
    return events;
  };

  return (
    <EventsContext.Provider
      value={{
        events: events,
        fetchEventData: fetchEventData,
        setEvents: setEvents,
        parseEventDataJson:parseEventDataJson,
        getEvents: getEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

const useEvents = () => useContext(EventsContext);

export { EventsProvider, useEvents };
