import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import userData from './user.json'; // Assuming user.json includes user data

const { height } = Dimensions.get('window');

const RoomDetailsScreen = ({ room, onClose }) => {
    // Fetch speaker and listener data by ID
    const getUserById = (id) =>
        userData.find((user) => user.id === id) || {
            name: 'Unknown User',
            imageUrl:
                'https://static.vecteezy.com/system/resources/thumbnails/009/734/846/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
        };

    const renderUserCircles = (ids) => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {ids.map((id, index) => {
                const user = getUserById(id);
                return (
                    <View
                        key={index}
                        style={{
                            alignItems: 'center',
                            marginRight: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Image
                            source={{ uri: user.imageUrl }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginBottom: 5,
                            }}
                        />
                        <Text style={{ fontSize: 12, textAlign: 'center' }}>
                            {user.name}
                        </Text>
                    </View>
                );
            })}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>X</Text>
            </TouchableOpacity>

            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text style={{ ...styles.title, marginTop: 10 }}>{room.title}</Text>
                <Text style={{ color: 'gray', marginBottom: 20 }}>
                    hosted by {room.host}
                </Text>

                <Text style={{ ...styles.subTitle, marginBottom: 10 }}>
                    {room.description}
                </Text>

                {/* Speakers */}
                <Text style={{ ...styles.title, marginBottom: 10 }}>Speakers</Text>
                {renderUserCircles(room.speakers)}

                {/* Listeners */}
                <Text style={{ ...styles.title, marginBottom: 10 }}>Listeners</Text>
                {renderUserCircles(room.listeners)}

                {/* Total Listeners & Join */}

            </ScrollView>
            <View
                style={{
                    marginTop: 20,
                    alignItems: 'center',
                    padding: 15,
                    backgroundColor: '#FFEEDB',
                    borderRadius: 10,
                }}
            >
                <Text>Total Listeners: {room.listenerCount}</Text>

            </View>

            <View style={styles.buttonContainer}>
                {/* Gradient wraps the entire button */}
                <LinearGradient
                    colors={['rgba(242,47,176,0.73)', 'rgba(245,138,37,0.7)']}
                    style={styles.gradient}
                    useAngle={true}
                    angle={45}
                >
                    {/* Button inside gradient */}
                    <TouchableOpacity style={styles.button} onPress={() => { /* Add button logic */ }}>
                        <Text style={styles.buttonText}>Join Meeting</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: height / 4,
        backgroundColor: '#FFEEDB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor:"#CF5C36",
        borderWidth:2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
        color: 'gray',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    gradient: {
        borderRadius: 25, // Ensure gradient follows the button shape
        width: '80%', // Make the width dynamic as needed
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    button: {
        paddingVertical: 15, // Add padding for button
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoomDetailsScreen;