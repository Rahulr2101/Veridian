import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles3';
import {useData} from "@/components/trackerContext";
import { router } from 'expo-router';
export default function Yes2({ navigation }) {
    const { formData, setFormData } = useData();

    const handleAnswer = (why: string) => {

        console.log('Why:', why);
        setFormData((prevData: any) => ({ ...prevData, why }));
        if(why){router.push('./yes3')}
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {navigation.goBack();}}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={styles.progress}>
                <View style={styles.progress3}></View>
            </View>

            <Text style={styles.question}>
                What triggered you to use?
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {handleAnswer('Stress')}}
            >
                <Text style={styles.buttonText}>Stress</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Urges')}
            >
                <Text style={styles.buttonText}>Urges</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Social Situation')}
            >
                <Text style={styles.buttonText}>Social Situation</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Other')}
            >
                <Text style={styles.buttonText}>Other</Text>
            </TouchableOpacity>

        </View>
    );
}

