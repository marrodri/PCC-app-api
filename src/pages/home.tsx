import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { EventInterface, useEvents } from "../../context/eventsContext";
import { useEffect, useState } from "react";
import HorizontalLine from "../components/horizontalLine";

export default function Home({ navigation }: { navigation: any }) {
  const events = useEvents();
  const [isLoading, setLoading] = useState(true);

  const setEventData = async () => {
    const eventData = await events.fetchEventData();
    const parsedEvents: Array<EventInterface> = [];
    console.log("=======printing first 20 elements=======");
    for (var i = 0; i < 20; i++) {
      const newParsedEvent: any = events.parseEventDataJson(eventData[i], i);
      parsedEvents.push(newParsedEvent);
    }
    events.setEvents(parsedEvents);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      setEventData();
    }
  }, []);

  return (
    <View style={PagesStyles.home}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={events.getEvents()}
          renderItem={(item: any) => {
            console.trace("----flatlist element: " + JSON.stringify(item));
            return (
              <EventButton
                navigation={navigation}
                imgUrl={item["item"]["featured_image"]}
                title={item["item"]["title"]}
                organizer={item["item"]["organizer_name"]}
                datePublished={item["item"]["published_date"]}
                startDate={item["item"]["start"]}
                endDate={item["item"]["end"]}
                id={item["item"]["id"]}
              />
            );
          }}
        />
      )}
    </View>
  );
}

function EventButton({
  navigation = "",
  imgUrl = "",
  title = "",
  organizer = "",
  datePublished = "",
  startDate = "",
  endDate = "",
  id = -1,
}: {
  navigation: any;
  imgUrl: string;
  title: string;
  organizer: string;
  datePublished: string;
  startDate: string;
  endDate: string;
  id: number;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("redirecting to event id:" + id + "\n");
        //TODO: add a parameter to pass the id, that which
        //points to the current index.
        navigation.navigate("event", { id });
      }}
    >
      <View
        style={[
          EventButtonStyle.mainBody,
          id % 2 === 0
            ? EventButtonStyle.yellowBackground
            : EventButtonStyle.redBackground,
        ]}
      >
        <View style={EventButtonStyle.eventImage}>
          <Image
            style={ImageStyles.eventButtonImg}
            source={{ uri: `${imgUrl}` }}
          />
        </View>
        {/* quick view of event details. */}
        <View style={EventButtonStyle.descriptionBody}>
          <Text style={EventButtonStyle.title}>{title}</Text>
          <HorizontalLine />
          <Text style={EventButtonStyle.eventDates}>
            Dates:{" "}
            {startDate === "" || endDate === ""
              ? "Start Date - End Date"
              : `${startDate} - ${endDate}`}
          </Text>
          <HorizontalLine />
          <Text style={EventButtonStyle.organizers}>
            Organizers:{" "}
            {organizer === "" ? "First Organizer - Person's Name" : organizer}
          </Text>
          <HorizontalLine />
          {/* last part, in small letters bottom of the button */}
          <Text>
            published at {datePublished === "" ? "no date" : datePublished}.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const ImageStyles = StyleSheet.create({
  eventButtonImg: {
    width: 330,
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
  },
});

const PagesStyles = StyleSheet.create({
  home: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
});

const EventButtonStyle = StyleSheet.create({
  mainBody: {
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    gap: 5,
    marginVertical: 5,
    borderRadius: 8,
    /**add drop shadow. */
    shadowOffset: { width: 0.5, height: 1 },
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  redBackground: { backgroundColor: "#f2655c" },
  yellowBackground: { backgroundColor: "#faf8b9" },
  eventImage: {
    width: 330,
    borderRadius: 8,
    height: 150,
    backgroundColor: "#e3e3e3",
  },
  descriptionBody: {
    flex: 0,
    width: 330,
    gap: 2,
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  eventDates: { fontSize: 20, fontWeight: "600" },
  organizers: { fontSize: 18, fontWeight: "400" },
});
