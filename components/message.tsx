import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Animated,
    ScrollView,
} from 'react-native';
import { collection, addDoc } from '@firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';

const AddPost = ({ visible, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) {
                throw new Error('User not logged in');
            }

            const newPost = {
                title,
                description,
                image: image || '',
                date: new Date().toISOString(),
                likeCount: 0,
                comments: [],
                userId: user.uid,
            };

            await addDoc(collection(FIREBASE_DB, 'posts'), newPost);
            onClose();
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View style={styles.popupContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Create New Post</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Enter title"
                                placeholderTextColor='#a3a3a3'
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.input2}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Enter description"
                                placeholderTextColor='#a3a3a3'
                                multiline
                            />
                        </View>
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Ionicons name="image-outline" size={24} color="#CF5C36" />
                            <Text style={styles.imagePickerText}>Pick an image</Text>
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <TouchableOpacity
                            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.submitButtonText}>
                                {loading ? 'Submitting...' : 'Submit Post'}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    popupContainer: {
        width: '50%',
        maxHeight: '80%',
        backgroundColor: '#fff9f3',
        borderColor: '#fca585',
        borderWidth: 2,
        borderRadius: 30,
        padding: 20,
        shadowColor: '#CF5C36',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: '#CF5C36',
        borderRadius: 20,
        padding: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#CF5C36',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fca585',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    input2: {
        height: 150,
        borderWidth: 1,
        borderColor: '#fca585',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        textAlignVertical: 'top',
    },
    imagePicker: {
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CF5C36',
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagePickerText: {
        color: '#CF5C36',
        marginLeft: 10,
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: '#CF5C36',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddPost;

