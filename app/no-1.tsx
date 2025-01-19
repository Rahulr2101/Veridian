import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles3';
import {useData} from "@/components/trackerContext";
import {router } from 'expo-router';

export default function No1({ navigation }) {
    const { formData, setFormData } = useData();

    const handleAnswer = (reason: string) => {
        console.log('reason:', reason);
        setFormData((prevData: any) => ({ ...prevData, reason }));
        if(reason){router.push('./success')}
    };


    // }, [formData]);


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
                What helped you avoid smoking today?
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {handleAnswer('Motivation')}}
            >
                <Text style={styles.buttonText}>Motivation</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Support from Others')}
            >
                <Text style={styles.buttonText}>Support from Others</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer('Distractions')}
            >
                <Text style={styles.buttonText}>Distractions</Text>
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

