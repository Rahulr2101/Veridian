import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles3';
import {useData} from "@/components/trackerContext";
import { router } from 'expo-router';

export default function Yes3({ navigation }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(tabs)/home');
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [router]);
    return (
        <View style={styles.finalContainer}>

    <Text style={styles.motiv}>
        Progress, Not Perfection
    </Text>

    <Text style={styles.motiv2}>
        recovery isn’t about never making mistakes-   it’s about learning, growing, and choosing to try again. We don’t count your relapses for a reason. What matters most is that you’re still fighting for a better tomorrow.
    </Text>
        </View>
);
}

