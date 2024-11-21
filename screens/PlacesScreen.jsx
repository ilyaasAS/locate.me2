import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCity, removeCity } from '../reducers/user';

export default function PlacesScreen() {
    const dispatch = useDispatch();
    const [cityname, setCityname] = useState("");
    const user = useSelector((state) => state.user.value);

    const formatedNickname = user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1).toLowerCase();

    function PlacesApi() {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityname}`)
            .then(res => res.json())
            .then(data => {
                const utilsData = data.features[0];
                const newCity = {
                    name: utilsData.properties.city,
                    latitude: utilsData.geometry.coordinates[1].toFixed(2),
                    longitude: utilsData.geometry.coordinates[0].toFixed(2),
                }
                dispatch(addCity(newCity));
                setCityname("");
            })
    }

    const places = user.places.map((place, id) => {
        return (
            <View key={id} style={styles.afficheCity}>
                <View>
                    <Text>{place.name}</Text>
                    <Text>LAT : {place.latitude} LON : {place.longitude}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(removeCity(place.name))}>
                    <FontAwesomeIcon name="trash-o" size={22} style={styles.trash} />
                </TouchableOpacity>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{formatedNickname} Places</Text>
            <View style={styles.newCity}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setCityname(value)}
                    placeholder="New city"
                    value={cityname}
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => PlacesApi()}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
            </View>
            {user.places.length === 0 ? (
                <EmptyList />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {places}
                </ScrollView>
            )}
        </SafeAreaView>
    )

    function EmptyList() {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No places yet</Text>
            </View>
        );
    }
}


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#e6e6e6",
            alignItems: "center"
        },

        text: {
            fontSize: 30,
            marginTop: 150
        },

        newCity: {
            width: 350,
            display: "flex",
            flexDirection: "row",
            marginTop: 50,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 15
        },

        input: {
            width: 240,
            marginRight: 15,
            borderBottomWidth: 2,
            borderBottomColor: "purple"
        },

        button: {
            backgroundColor: "purple",
            color: "white",
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
        },

        textButton: {
            color: "white",
        },

        histo: {
            marginTop: 40
        },

        afficheCity: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
            width: 350,
            marginTop: 30
        },

        trash: {
            color: "purple"
        },

        emptyText: {
            fontSize: 30,
            marginTop: 150
        },
    });