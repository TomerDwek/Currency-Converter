import { StyleSheet, Dimensions } from "react-native";

import colors from "../constants/colors";

const screen = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        paddingTop: screen.height * 0.2
    },
    textHeader: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
        textAlign: "center"
    },
    text: {
        color: colors.white,
        fontSize: 13,
        textAlign: "center"
    },
    inputContainer: {
        marginBottom: 10,
    },
        header: {
        alignItems: 'flex-end',
        marginHorizontal: 20,
    },
});