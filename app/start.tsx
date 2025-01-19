import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Redirect } from 'expo-router';

const QuickQuestion = () => {
  const items: string[] = ["Alcohol", "Opioids", "Cannabis", "Nicotine", "Inhalants"];
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0]; 

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 500, 
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedItem) {
      fadeIn();
    }
  }, [selectedItem]);

  const [navigateToHome, setNavigateToHome] = useState(false);

  const handleContinue = () => {
    setNavigateToHome(true); 
  };

  if (navigateToHome) {
    return <Redirect href="/home" />; 
  }

  return (
    <View className="flex h-full flex-col bg-white">
      <View className="bg-red-400 h-2/3 flex rounded-b-3xl justify-center items-center">
        {selectedItem ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text className="text-white text-4xl font-bold">{selectedItem}</Text>
          </Animated.View>
        ) : (
          <Text className="text-white text-2xl font-semibold">Select a substance</Text>
        )}
      </View>
      <View className="flex flex-col gap-10 justify-center items-center pt-4">
        <FlatList
          data={items}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              className="w-52 h-12 bg-funkpink justify-center items-center mx-2 rounded-3xl"
              onPress={() => setSelectedItem(item)} 
            >
              <Text className="text-black font-bold">{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Text className="text-3xl font-bold text-center">Which substance do you struggle with?</Text>

        <View className="flex flex-row w-full p-2">
          <View className="flex items-center justify-center w-2/5 h-14">
            <Text>Skip</Text>
          </View>
          <TouchableOpacity
            className="w-3/5 flex items-center justify-center bg-black h-14 rounded-3xl"
            onPress={handleContinue}
          >
            <Text className="text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuickQuestion;
