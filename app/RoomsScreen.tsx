import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import styles from '../styles';
import Data from '../discoverData.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ParticipantAvatars from '../components/ParticipantAvatars';
import RoomDetailsScreen from '../RoomDetailsScreen';
import { useRouter } from 'expo-router';

const participants = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
];

const RoomsScreen = ({ navigation }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('Latest');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDetailsPopupVisible, setDetailsPopupVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        setDropdownOpen(false); // Close dropdown after selection
    };

    const openRoomDetailsPopup = (room) => {
        setSelectedRoom(room);
        setDetailsPopupVisible(true);
    };

    const closeRoomDetailsPopup = () => {
        setSelectedRoom(null);
        setDetailsPopupVisible(false);
    };

    const renderRoomItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.roomCard}
                onPress={() => openRoomDetailsPopup(item)}
            >
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>hosted by {item.host}</Text>
                    <Text style={{ marginLeft: 1, marginTop: 5, fontFamily: 'Inter', fontWeight: 300, fontSize: 10 }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <ParticipantAvatars participants={participants} />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 5, fontFamily: 'Inter', fontWeight: 350, fontSize: 10 }}>
                            👥{item.listenerCount}+
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Join Room</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/Discover')}>
                    <Text style={[styles.headerText]}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/RoomsScreen')}>
                    <Text style={[styles.headerText, styles.headerSelect]}>Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.headerText}>Top Charts</Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdownHeader}
                    onPress={() => setDropdownOpen(!isDropdownOpen)}
                >
                    <Text style={styles.dropdownText}>{selectedTab}</Text>
                    <Icon name="keyboard-arrow-down" size={16} color="gray" style={styles.dropdownArrow} />
                </TouchableOpacity>

                {isDropdownOpen && (
                    <View style={styles.dropdownList}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleTabPress('Latest')}>
                            <Text style={styles.dropdownText}>Latest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleTabPress('Popular')}>
                            <Text style={styles.dropdownText}>Popular</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Room List */}
            <FlatList
                data={Data.filter((item) => (selectedTab === 'Latest' ? item.isLatest : item.isPopular))}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderRoomItem}
            />

            {/* Modal for Room Details */}
            {isDetailsPopupVisible && selectedRoom && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isDetailsPopupVisible}
                    onRequestClose={closeRoomDetailsPopup}
                >
                    <RoomDetailsScreen room={selectedRoom} onClose={closeRoomDetailsPopup} />
                </Modal>
            )}
        </View>
    );
};

export default RoomsScreen;
