import { View } from "react-native";




export default function HorizontalLine(){
    return <View
    style={{
        borderBottomColor:"black",
        borderBottomWidth: 1,
        marginHorizontal:5,
        marginVertical:10,
        alignSelf:"stretch",
    }}></View>
}