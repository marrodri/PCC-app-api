import { ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Body page
 */
export default function EventPage() {
  return (
    <View style={PagesStyles.event}>
      <View>
        {/* featured image the whole screen */}
        <View style={EventElementStyle.eventImage}>
          {/* title */}
          <Text style={EventTextStyles.eventTitle}>Title Event</Text>
        </View>
      </View>
      <View style={PagesStyles.body}>
        <Text style={EventTextStyles.organizers}>Organized by:</Text>
        <Text style={EventTextStyles.datesOfEvent}>Dates:</Text>
        <Text style={EventTextStyles.locationOfEvent}>Location:</Text>
        <Text style={EventTextStyles.publishedDate}>
          published ### days ago
        </Text>

        <Text style={EventTextStyles.eventExcerpt}>event Excerpt</Text>
        
        {/* content can be transformed to jsx element. */}
        {/* button to redirect the user to pcc website */}

        {/* if external_link_button_text is "Tickets", set the button for
    "Get Tickets "  */}
      </View>
    </View>
  );
}

const PagesStyles = StyleSheet.create({
  event: {
    backgroundColor: "#ff23f2",
    flex: 1,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "green",
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
  organizers: {fontSize:22, fontWeight:"400"},
  datesOfEvent: {fontSize:22, fontWeight:"400"},
  locationOfEvent: {fontSize:22, fontWeight:"400"},
  publishedDate: {fontSize:22, fontWeight:"400"},
  eventExcerpt: {fontSize:22, fontWeight:"400"},
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
