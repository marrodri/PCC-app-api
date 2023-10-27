import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** import pages */
import Home from "./src/pages/home";
import EventPage from "./src/pages/event";
import { EventsProvider} from "./context/eventsContext"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EventsProvider>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="event" component={EventPage}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </EventsProvider>

    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
