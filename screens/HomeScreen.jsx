import { Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addNickname } from '../reducers/user';

export default function HomeScreen({ navigation }) {
    const [text, onChangeText] = React.useState("");

    const dispatch = useDispatch();

    const adduser = (text) => {
        dispatch(addNickname(text))
        navigation.navigate("Search", { screen: "Map" });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Image
                style={styles.image}
                source={require("../assets/home-image.png")}
            />

            <Text style={styles.title}>Welcome to Locate Me</Text>

            <TextInput
                style={styles.input}
                placeholder="Nickname"
                onChangeText={(value) => onChangeText(value)}
                value={text}
            />

            <TouchableOpacity style={styles.button} onPress={() => adduser(text)}>
                <Text style={styles.buttonText}>Go to Map</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        fontSize: 35,
    },
    image: {
        width: "100%",
        height: "60%",
    },
    input: {
        width: "80%",
        borderBottomWidth: 1,
        borderBottomColor: "#B733D0",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        width: "80%",
        backgroundColor: "#B733D0",
        borderRadius: 12,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
    },
});