import { StyleSheet, Dimensions } from "react-native";

const screen = Dimensions.get('window');

export const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        position: "absolute",
        width: screen.width * 0.25,
        height: screen.width * 0.25
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.width * 0.45
    },
});