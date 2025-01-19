import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles2';
import roomsData from '../../discoverData.json';
import postsData from '../../postsData.json';
import ParticipantAvatars from '@/components/ParticipantAvatars';
import RoomDetailsScreen from '../../RoomDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DiscoverScreen = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const openPopup = () => setPopupVisible(true);
    const closePopup = () => setPopupVisible(false);
    const router = useRouter();
    const popularRooms = roomsData.filter((room) => room.type === 'room');

    const [isDetailsPopupVisible, setDetailsPopupVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const openRoomDetailsPopup = (room) => {
        setSelectedRoom(room);
        setDetailsPopupVisible(true);
    };

    const closeRoomDetailsPopup = () => {
        setSelectedRoom(null);
        setDetailsPopupVisible(false);
    };

    const openPostDetails = (post) => {
        setSelectedPost(post);
        setPopupVisible(true);
    };

    const renderPostItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => openPostDetails(item)}>
                <View style={{ ...styles.card, marginVertical: 5 }}>
                    {item.imageUrl && (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{ height: 150, width: '100%', borderRadius: 10 }}
                        />
                    )}

                    <Text style={styles.posttitle}>{item.title}</Text>

                    <View style={styles.authorAndIconContainer}>
                        <View style={styles.authorContainer}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                style={styles.authorAvatar}
                            />
                            <Text style={styles.authorName}>{item.author}</Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <View style={styles.iconWithCount}>
                                <TouchableOpacity>
                                    <Icon name="star" size={20} color="#FFD700" />
                                </TouchableOpacity>
                                <Text style={styles.iconCount}>{item.upvotes}</Text>
                            </View>
                            <View style={styles.iconWithCount}>
                                <TouchableOpacity style={{ marginLeft: 15 }}>
                                    <Icon name="comment" size={20} color="gray" />
                                </TouchableOpacity>
                                <Text style={styles.iconCount}>
                                    {item.comments ? item.comments.length : 0}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const participants = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
    ];

    const renderPopularRoomItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.roomCard}
                onPress={() => openRoomDetailsPopup(item)}
            >
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>hosted by {item.host}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <ParticipantAvatars participants={participants} />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontFamily: 'Inter',
                                fontWeight: '350',
                                fontSize: 10,
                            }}
                        >
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

    const PostDetailsOverlay = ({ post, onClose }) => {
        const translateY = new Animated.Value(0);

        const onGestureEvent = Animated.event(
            [{ nativeEvent: { translationY: translateY } }],
            { useNativeDriver: true }
        );

        const onHandlerStateChange = (event) => {
            if (event.nativeEvent.state === State.END && event.nativeEvent.translationY > 100) {
                onClose();
            } else {
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        };

        return (
            <GestureHandlerRootView style={postDetailsStyles.container}>
                {post.imageUrl && (
                    <Image source={{ uri: post.imageUrl }} style={postDetailsStyles.image} />
                )}
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            postDetailsStyles.modalContent,
                            { transform: [{ translateY }] },
                        ]}
                    >
                        <View style={postDetailsStyles.modalHeader}>
                            <View style={postDetailsStyles.modalHeaderLine} />
                        </View>

                        <ScrollView style={postDetailsStyles.modalScroll}>
                            <View
                                style={{
                                    padding: 13,
                                    borderWidth: 2,
                                    borderColor: '#FFEEDB',
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={postDetailsStyles.title}>{post.title}</Text>

                                <View style={postDetailsStyles.authorContainer}>
                                    <View style={postDetailsStyles.authorInfo}>
                                        <Image
                                            source={{
                                                uri: 'https://randomuser.me/api/portraits/men/8.jpg',
                                            }}
                                            style={postDetailsStyles.authorAvatar}
                                        />
                                        <View>
                                            <Text style={postDetailsStyles.authorName}>
                                                {post.author}
                                            </Text>
                                            <Text style={postDetailsStyles.date}>{post.date}</Text>
                                        </View>
                                    </View>
                                    <View style={postDetailsStyles.actionButtons}>
                                        <TouchableOpacity style={postDetailsStyles.actionButton}>
                                            <Ionicons
                                                name="heart-outline"
                                                size={24}
                                                color="#cf5c36"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={postDetailsStyles.actionButton}>
                                            <Ionicons
                                                name="bookmark-outline"
                                                size={24}
                                                color="#cf5c36"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={postDetailsStyles.text}>{post.text}</Text>
                            </View>

                            <View style={postDetailsStyles.commentsSection}>
                                <Text style={postDetailsStyles.commentsTitle}>Comments</Text>
                                {post.comments &&
                                    post.comments.map((comment, index) => (
                                        <View key={index} style={postDetailsStyles.commentContainer}>
                                            <Image
                                                source={{
                                                    uri: `https://randomuser.me/api/portraits/men/${
                                                        index + 1
                                                    }.jpg`,
                                                }}
                                                style={postDetailsStyles.commentAvatar}
                                            />
                                            <View style={postDetailsStyles.commentContent}>
                                                <Text style={postDetailsStyles.commentUser}>
                                                    {comment.user}
                                                </Text>
                                                <ScrollView>
                                                    <Text style={postDetailsStyles.commentText}>
                                                        {comment.text}
                                                    </Text>
                                                </ScrollView>
                                            </View>
                                        </View>
                                    ))}
                            </View>
                        </ScrollView>
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/Discover')}>
                    <Text style={[styles.headerText, styles.headerSelect]}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/RoomsScreen')}>
                    <Text style={styles.headerText}>Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.headerText}>Top Charts</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text
                    style={{
                        ...styles.title,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Popular Rooms
                </Text>
                <FlatList
                    horizontal
                    data={popularRooms}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderPopularRoomItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <FlatList
                data={postsData}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderPostItem}
                style={{ marginHorizontal: 15 }}
            />

            {isDetailsPopupVisible && selectedRoom && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isDetailsPopupVisible}
                    onRequestClose={closeRoomDetailsPopup}
                >
                    <RoomDetailsScreen
                        room={selectedRoom}
                        onClose={closeRoomDetailsPopup}
                    />
                </Modal>
            )}

            {isPopupVisible && selectedPost && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isPopupVisible}
                    onRequestClose={closePopup}
                >
                    <PostDetailsOverlay post={selectedPost} onClose={closePopup} />
                </Modal>
            )}
        </View>
    );
};

const postDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.3,
        resizeMode: 'cover',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0, // Removed the margin to eliminate the gap
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    modalHeader: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalHeaderLine: {
        width: 40,
        height: 4,
        backgroundColor: '#d1d1d6',
        borderRadius: 2,
    },
    modalScroll: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
        color: '#1C1C1E',
        fontFamily: 'Inter',
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#3A3A3C',
        marginBottom: 20,
        fontFamily: 'Inter',
    },
    authorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 20,
        height: 20,
        borderRadius: 25,
        marginRight: 15,
    },
    authorName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1C1C1E',
        fontFamily: 'Inter',
    },
    date: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
        fontFamily: 'Inter',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 10,
    },
    commentsSection: {
        marginTop: 20,
        padding: 15,
        borderWidth: 2,
        borderColor: '#FFEEDB',
        borderRadius: 10,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    commentsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 15,
        color: '#1C1C1E',
        fontFamily: 'Inter',
    },
    commentContainer: {
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.08,
        marginBottom: 10,
    },
    commentAvatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 15,
    },
    commentContent: {
        flex: 1,
    },
    commentUser: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
        color: '#1C1C1E',
        fontFamily: 'Inter',
    },
    commentText: {
        fontSize: 14,
        color: '#3A3A3C',
        fontFamily: 'Inter',
        lineHeight: 15,
    },
});


export default DiscoverScreen;
