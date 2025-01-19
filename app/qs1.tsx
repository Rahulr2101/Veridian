import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useData } from "@/components/trackerContext";
import styles from '../styles3';
import { router } from 'expo-router';

export default function CheckUp({ navigation }) {
    const { formData, setFormData } = useData();


    const handleAnswer = (used: boolean) => {
        console.log('Did use:', used);
        setFormData((prevData: any) => ({
            ...prevData,
            used: used ? "Yes" : "No",
        }));
        if (used) {
             router.push('/yes1')

        } else {
            router.push('/no-1')

        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.progress}>
                <View style={styles.progress1}></View>
            </View>


            <Text style={styles.question}>Did you use today?</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(false)}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

