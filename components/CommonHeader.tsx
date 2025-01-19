import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { useRouter } from 'expo-router';

export const CommonHeader = () => {
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>
      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.signOutButton,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  leftSection: {
    flex: 1,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  signOutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f44336',
    borderRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});