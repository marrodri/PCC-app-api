import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { EventInterface, useEvents } from "../../context/eventsContext";
import { useEffect, useState } from "react";

export default function Home({ navigation }: { navigation: any }) {
  const events = useEvents();
  const [isLoading, setLoading] = useState(true);

  const setEventData = async () => {
    const eventData = await events.fetchEventData();
    const parsedEvents: Array<EventInterface> = [];
    console.log("=======printing first 20 elements=======");
    for (var i = 0; i < 20; i++) {
      const newParsedEvent: any = events.parseEventDataJson(eventData[i]);
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
            // console.log(item["item"]["title"]);
            // return <Text>data</Text>;
            return (
              <EventButton
                navigation={navigation}
                imgUrl={item["item"]["featured_image"]}
                title={item["item"]["title"]}
                organizer={item["item"]["organizer_name"]}
                datePublished={item["item"]["published_date"]}
                startDate={item["item"]["start"]}
                endDate={item["item"]["end"]}
                id={0}
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
        console.log("redirecting to event\n");
        navigation.push("event");
      }}
    >
      <View style={EventButtonStyle.mainBody}>
        <View style={EventButtonStyle.eventImage}>
          <Text>{imgUrl === "" ? "Image" : imgUrl}</Text>
        </View>
        {/* quick view of event details. */}
        <View style={EventButtonStyle.descriptionBody}>
          <Text style={EventButtonStyle.title}>{title}</Text>
          <Text style={EventButtonStyle.eventDates}>
            Dates:{" "}
            {startDate === "" || endDate === ""
              ? "Start Date - End Date"
              : `${startDate} - ${endDate}`}
          </Text>
          <Text style={EventButtonStyle.organizers}>
            Organizers:{" "}
            {organizer === "" ? "First Organizer - Person's Name" : organizer}
          </Text>
          {/* last part, in small letters bottom of the button */}
          <Text style={EventButtonStyle.publishedDate}>
            published at {datePublished === "" ? "no date" : datePublished}.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
    backgroundColor: "#4287f5",
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    gap: 5,
    marginVertical: 5,
    shadowColor: "black",
    borderRadius: 8,
    /**add a text padding. */
  },
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
    backgroundColor: "#cbf542",
  },
  eventDates: { backgroundColor: "#cbf542", fontSize: 20, fontWeight: "600" },
  organizers: { fontSize: 18, fontWeight: "400", backgroundColor: "#cbf542" },
  publishedDate: { backgroundColor: "#cbf542" },
});
