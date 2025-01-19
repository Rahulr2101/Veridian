import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const Success = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} fadeOut />
            <View style={styles.content}>
                <Text style={styles.title}>Well done!</Text>
                <Text style={styles.xp}>+250XP</Text>
                <Text style={styles.message}>
                    Your 5-day streak shows your determination. Keep pushing forward
                </Text>

                <View style={styles.streakBox}>
                    <Text style={styles.fireIcon}>🔥</Text>
                    <Text style={styles.streakNumber}>5</Text>
                </View>

                <View style={styles.daysOfWeek}>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>M</Text>
                        <View style={[styles.circle, styles.checked]} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>T</Text>
                        <View style={[styles.circle, styles.checked]} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>W</Text>
                        <View style={[styles.circle, styles.checked]} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>T</Text>
                        <View style={[styles.circle, styles.checked]} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>F</Text>
                        <View style={[styles.circle, styles.checked]} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>S</Text>
                        <View style={styles.circle} />
                    </View>
                    <View style={styles.day}>
                        <Text style={styles.dayLetter}>S</Text>
                        <View style={styles.circle} />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        marginTop: 200,
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#CF5C36',
        marginBottom: 10,
        fontFamily:"Playfair",

    },
    xp: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#16A34A',
        marginBottom: 20,
        fontFamily:"Playfair",

    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        fontFamily:"Playfair",

    },
    streakBox: {
        backgroundColor: '#FAEBD7',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderTopEndRadius: 10,
        borderTopLeftRadius:10,
        width: '80%',
        justifyContent: 'center',
    },
    fireIcon: {
        fontSize: 40,
        marginRight: 10,
    },
    streakNumber: {
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily:"Playfair",

    },
    daysOfWeek: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        backgroundColor: '#CF5C36',
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

        marginBottom: 100,
        fontFamily:"Playfair",

    },
    day: {
        alignItems: 'center',
    },
    dayLetter: {
        color: 'white',
        marginBottom: 5,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgray',
    },
    checked: {
        backgroundColor: '#16A34A',
    },
    button: {
        backgroundColor: '#CF5C36',
        padding: 20,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily:"Playfair",
    },
});

export default Success;
