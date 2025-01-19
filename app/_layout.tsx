import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { DataProvider } from "@/components/trackerContext";

const StackLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DataProvider>
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="RoomsScreen" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
            headerTitle: 'Rooms'
          }} 
        />
      </Stack>
      </DataProvider>
    </SafeAreaView>
  );  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StackLayout;
