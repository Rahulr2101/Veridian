import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Button } from 'react-native';
import { Tabs } from 'expo-router';
import { CommonHeader } from '../../components/CommonHeader';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import AddPost from "@/components/addPost";

export default function TabLayout() {
    const router = useRouter();
    const currentPage = usePathname();

    console.log(`Current Page: ${currentPage}`);

    const [isPopupVisible, setPopupVisible] = useState(false); // Modal state
    const openPopup = () => setPopupVisible(true); // Show modal
    const closePopup = () => setPopupVisible(false); // Hide modal

    const handleSignOut = async () => {
        await signOut(FIREBASE_AUTH);
        router.replace('/Login');
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Tabs Navigation */}
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#FFF8E7',
                        height: 70,
                        borderTopWidth: 1,
                        borderTopColor: '#E0D8C7',
                        paddingBottom: 0,
                        paddingTop: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 5,
                    },
                    tabBarActiveTintColor: '#D2691E',
                    tabBarInactiveTintColor: '#A09888',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                        fontFamily: 'Arial',
                    },
                    header: () => (
                        <View style={styles.headerContainer}>
                            <CommonHeader />
                            <View style={styles.profileContainer}>
                                <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                                    <Image
                                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                        style={styles.profileImage}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                                    <Text style={styles.signOutText}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ),
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faHouse} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="resources"
                    options={{
                        title: 'Resources',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Discover"
                    options={{
                        title: 'Discover',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="compass" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Progress"
                    options={{
                        title: 'Progress',
                        tabBarIcon: ({ color, size }) => (
                            <Image
                                source={require('../../assets/images/stats-chart-outline.svg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                    }}
                />
            </Tabs>

            {currentPage === '/Discover' && ( // Adjust this to match the actual path
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={openPopup}>
                        <Text style={styles.addButtonText}>+ Add Post</Text>
                    </TouchableOpacity>

                    <AddPost visible={isPopupVisible} onClose={closePopup} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    signOutButton: {
        padding: 10,
    },
    signOutText: {
        color: '#8B4513',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 80, // Above the tab bar
        right: 20,
        backgroundColor: '#D2691E', // Add your button color
        padding: 15,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        height: 40,
        width: 100,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
