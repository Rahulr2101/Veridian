import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles3';
import {useData} from "@/components/trackerContext";
import { router } from 'expo-router';

export default function Yes1({ navigation }) {
    const { formData, setFormData } = useData();

    const handleAnswer = (when: string) => {
        console.log('Time:', when);
        setFormData((prevData: any) => ({ ...prevData, when }));

        if(when){router.replace('./yes2')}
    };
    // useEffect(() => {
    //     console.log('Updated formData:', formData);
    // }, [formData]);
    //
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {navigation.goBack();}}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.progress}>
                <View style={styles.progress2}></View>
            </View>

            <Text style={styles.question}>
                What time(s) did you use?
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {handleAnswer('Morning')}}
            >
                <Text style={styles.buttonText}>Morning</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Afternoon')}
            >
                <Text style={styles.buttonText}>Afternoon</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Evening')}
            >
                <Text style={styles.buttonText}>Evening</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Night')}
            >
                <Text style={styles.buttonText}>Night</Text>
            </TouchableOpacity>

        </View>
    );
}

