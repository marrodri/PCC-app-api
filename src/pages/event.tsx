import { ScrollView, StyleSheet, Text, View,Image } from "react-native";
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
  const index = id["route"]["params"]["id"];
  let eventData = events.getEvents()[index];
  console.log("event page loaded:");
  console.log(eventData);
  return (
    <View style={EventPageStyles.body}>
      {/* event image and title */}
      <View>
        <View style={EventElementStyle.eventImage}>
        <Image
            style={ImageStyles.eventButtonImg}
            source={{ uri: `${eventData["featured_image"]}` }}
          />
          <Text style={EventTextStyles.eventTitle}>{eventData["title"]}</Text>
        </View>
      </View>
      {/* event body */}
      <ScrollView>
        <View style={EventPageStyles.eventDetails}>
          <Text style={EventTextStyles.organizersHeader}>Organized by:</Text>
          <Text style={EventTextStyles.organizersBody}>{" "+eventData["organizer_name"]}</Text>
          <HorizontalLine />
          <Text style={EventTextStyles.datesOfEventHeader}>
            Dates:
            <Text style={EventTextStyles.datesOfEventBody}> {eventData["start"]}-{eventData["end"]}</Text>
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
            {eventData["event_excerpt"]}
          </Text>
          <HorizontalLine />

          <CustomButton />
          <Text style={EventTextStyles.publishedDateHeader}>
            Date published: {eventData["published_date"]}
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
    position:"absolute",

    /**text shadow settings */
    textShadowOffset: { width: 1.0, height: 1.0 },
    textShadowColor: "black",
    textShadowRadius: 1.0,
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

const ImageStyles = StyleSheet.create({
  eventButtonImg: {
    width: 365,
    height: 225,
    objectFit: "cover",
    borderRadius: 10,
  },
});
