import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs, query, where, GeoPoint } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const HelpButton = () => {
    const router = useRouter();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                let locationData = await Location.getCurrentPositionAsync({});
                setLocation(locationData);
            } catch (error) {
                console.error("Error getting location", error)
            }
        })();
    }, []);


    const fetchNearbyUsers = async (latitude, longitude) => {
        const usersCollection = collection(FIREBASE_DB, 'registeredUsers');
        const center = new GeoPoint(latitude, longitude)
        const radiusInKm = 5
        const lowerBound = new GeoPoint(latitude - (radiusInKm / 111.2), longitude - (radiusInKm / 88.8))
        const upperBound = new GeoPoint(latitude + (radiusInKm/ 111.2), longitude + (radiusInKm / 88.8))
        const q = query(usersCollection,
            where('location', '>=', lowerBound),
            where('location', '<=', upperBound),
        );

        try {
            const querySnapshot = await getDocs(q);
            const userLocations = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return userLocations

        } catch (error) {
            console.error("Error fetching nearby users: ", error);
            return [];
        }
    };

    const openSMSApp = (phoneNumbers, latitude, longitude) => {
        const phoneList = phoneNumbers.join(',');
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `Help is needed in your area! Here's my location: ${mapLink}`;
        const url = `sms:${phoneList}${message ? `&body=${encodeURIComponent(message)}` : ""}`;

        Linking.openURL(url).catch(error => {
            console.error('Error opening SMS app:', error);
            Alert.alert("Error Opening SMS app")
        });
    };


    const handleHelpPress = async () => {
        if(location){
            const { latitude, longitude } = location.coords;
            const nearbyUsers = await fetchNearbyUsers(latitude, longitude);
            if (nearbyUsers && nearbyUsers.length > 0) {
                const phoneNumbers = nearbyUsers.map(user => user.phoneNumber)
                openSMSApp(phoneNumbers, latitude, longitude)
            } else {
                Alert.alert("No nearby users found.");
            }

        }else{
            Alert.alert("Please allow location permissions!");
        }

    };


    return (
        <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
            <Text style={styles.helpButtonText}>Need Help?</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    helpButton: {
        backgroundColor: '#940000',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 0,
        shadowColor: '#000',
    },
    helpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HelpButton;
