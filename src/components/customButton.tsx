import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton() {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "stretch",
       
      }}
      onPress={() => {
        console.log("redirecting user to tickets page\n");
      }}
    >
      <View style={CustomButtonLayoutStyle.body}>
        <Text style={CustomButtonLayoutStyle.text}>Get Tickets</Text>
      </View>
    </TouchableOpacity>
  );
}

const CustomButtonLayoutStyle = StyleSheet.create({
  body: {
    backgroundColor: "#2bb3d9",
    borderRadius: 10,
    alignSelf: "stretch",
    height: 70,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // drop shadow
    shadowOffset: { width: 0.5, height: 1 },
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity:1,
  },
  text: { color: "white", fontWeight: "700", fontSize: 28 },
});
