import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalLine from "../components/horizontalLine";
import CustomButton from "../components/customButton";
import { useEvents } from "../../context/eventsContext";
import { useEffect } from "react";

/**
 * event page interface
 */
interface EventPageInterface {
  imgUrl: string | null;
  eventTitle: string | null;
  eventDates: string | null;
  organizer: string | null;
  location: string | null;
  excerpt: string | null;
  publishedDate: string | null;
}

// {
//   imgUrl = null,
//   eventTitle = null,
//   eventDates = null,
//   organizer = null,
//   location = null,
//   excerpt = null,
//   publishedDate = null,
// }

/**
 * Body page
 */
export default function EventPage(id: any) {
  const events = useEvents();
  let eventData = events.getEvents()[id];
  console.log("event page loaded:");
  console.log(eventData);
  return (
    <View style={EventPageStyles.body}>
      {/* event image and title */}
      <View>
        <View style={EventElementStyle.eventImage}>
          <Text style={EventTextStyles.eventTitle}>Title Event</Text>
        </View>
      </View>
      {/* event body */}
      <ScrollView>
        <View style={EventPageStyles.eventDetails}>
          <Text style={EventTextStyles.organizersHeader}>Organized by:</Text>
          <Text style={EventTextStyles.organizersBody}>Organizer</Text>
          <HorizontalLine />
          <Text style={EventTextStyles.datesOfEventHeader}>
            Dates:
            <Text style={EventTextStyles.datesOfEventBody}> 12/23/2000</Text>
          </Text>

          <HorizontalLine />
          <Text style={EventTextStyles.locationOfEventHeader}>Location:</Text>
          <Text style={EventTextStyles.locationOfEventBody}>
            1570 E. Colorado Blvd. Pasadena, CA 91106
          </Text>
          <HorizontalLine />
          <Text style={EventTextStyles.eventExcerptHeader}>
            About the event:
          </Text>
          <Text style={EventTextStyles.eventExcerptBody}>
            voluptate reprehenderit voluptate cillum commodo proident in laboris
            veniam irure veniam minim ut cupidatat consequat duis mollit commodo
            incididunt id.
          </Text>
          <HorizontalLine />

          <CustomButton />
          <Text style={EventTextStyles.publishedDateHeader}>
            published ### days ago
          </Text>

          {/* content can be transformed to jsx element. */}
          {/* button to redirect the user to pcc website */}

          {/* if external_link_button_text is "Tickets", set the button for
    "Get Tickets "  */}
        </View>
      </ScrollView>
    </View>
  );
}

const EventPageStyles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 5,
  },
  eventDetails: {
    flex: 1,
    paddingVertical: 5,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const EventTextStyles = StyleSheet.create({
  eventTitle: {
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 28,
    color: "white",

    /**text shadow settings */
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowColor: "black",
    textShadowRadius: 0.5,
  },

  /**
   * Text headers
   */
  organizersHeader: { fontSize: 22, fontWeight: "500" },
  datesOfEventHeader: { fontSize: 22, fontWeight: "500" },
  locationOfEventHeader: { fontSize: 22, fontWeight: "500" },
  publishedDateHeader: { fontSize: 22, fontWeight: "500" },
  eventExcerptHeader: { fontSize: 22, fontWeight: "500" },
  /**
   * Text bodies
   */
  eventExcerptBody: { fontSize: 22, fontWeight: "400" },
  organizersBody: { fontSize: 22 },
  datesOfEventBody: { fontWeight: "400" },
  locationOfEventBody: { fontSize: 22 },
});

/**
 * styles for the event page and elements
 */
const EventElementStyle = StyleSheet.create({
  eventImage: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 225,
    backgroundColor: "#e3e3e3",
    justifyContent: "flex-end",
  },
});
