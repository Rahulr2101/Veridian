import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPicture, setNewPicture] = useState(null);
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setNewName(data.name);
          setNewPicture(data.picture);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewPicture(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (user) {
      const userRef = doc(FIREBASE_DB, 'users', user.uid);
      await updateDoc(userRef, {
        name: newName,
        picture: newPicture,
      });
      setUserData({ ...userData, name: newName, picture: newPicture });
    }
  };

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image source={{ uri: newPicture }} style={styles.profileImage} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter new name"
      />
      <Button title="Save Changes" onPress={handleSave} />
      <Text style={styles.info}>EXP: {userData.exp}</Text>
      <Text style={styles.info}>Streak Count: {userData.streakCount}</Text>
      <Text style={styles.info}>Addiction: {userData.addiction}</Text>
      <Text style={styles.info}>Trigger: {userData.trigger}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Profile;