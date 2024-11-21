import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../reducers/user';

export default function MapScreens() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [newCoordinate, setNewCoordinate] = useState({});

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    let longitude = 0;
    let latitude = 0;


    const places = user.places.map((place, id) => {
        return (
            <Marker key={id}
coordinate={{
            longitude: longitude ? longitude : 0,
            latitude: latitude ? latitude : 0,
          }}
title={'owner location'}
/>
        )
    })

    const [currentPosition, setCurrentPosition] = useState({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    console.log(location);
                    setCurrentPosition({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                });
            }
        })();
    }, []);

    function openModal(e) {
        // const latitude = e.nativeEvent.coordinate.latitude
        // const longitude = e.nativeEvent.coordinate.longitude
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setNewCoordinate({ latitude, longitude });
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function addPlaceToStore() {
        const newCity = {
            name: name,
            latitude: newCoordinate.latitude.toFixed(2),
            longitude: newCoordinate.longitude.toFixed(2),
        };

        dispatch(addCity(newCity));
        setModalVisible(false);
        setName("");
        //navigation.navigate("Places");
    }

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="New place"
                            style={styles.input}
                            value={name}
                            onChangeText={(value) => setName(value)}
                        />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={addPlaceToStore}
                        >
                            <Text style={styles.textButton}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={() => closeModal()}
                        >
                            <Text style={styles.textButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <MapView mapType="hybrid" style={styles.map} onLongPress={openModal}>
                <Marker
                    title="My location"
                    coordinate={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                    }}
                    pinColor="#fecb2d"
                />
                {places}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: 150,
        borderBottomColor: "#B733D0",
        borderBottomWidth: 1,
        fontSize: 16,
    },
    button: {
        width: 150,
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "#B733D0",
        paddingVertical: 10,
        borderRadius: 10,
    },
    textButton: {
        color: "#fff",
        fontSize: 20,
    },
});