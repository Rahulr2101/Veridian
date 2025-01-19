import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import { ResourceBottomSheet } from '../bottom-sheet';
import rehabData from '../Addiction_Rehabs_Directory_With_Details.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window');
const FilteredResources = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const categories = {
    alcohol_and_drug: {
      title: 'Alcohol & Drug',
      icon: '🏥',
      color: '#FFEEDB', // Light shade
    },
    specialized: {
      title: 'Specialized Care',
      icon: '⚕️',
      color: '#FFEEDB', // Light shade
    },
    by_substance: {
      title: 'By Substance',
      icon: '💊',
      color: '#FFEEDB', // Light shade
    },
    helpline_numbers: {
      title: 'Helpline Numbers',
      icon: '☎️',
      color: '#FFEEDB', // Light shade
    },}

  const getResourcesByCategory = (category: string) => {
    const data = rehabData.Find_Addiction_Rehabs;
    switch (category) {
      case 'alcohol_and_drug':
        return data.Alcohol_and_Drug_Addiction_Rehabs;
      case 'specialized':
        return data.Specialized_Treatment_Programs;
      case 'by_substance':
        return data.Treatment_By_Substance;
      default:
        return [];
      case 'helpline_numbers':
        return data.Helpline_Numbers;
    }
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setIsBottomSheetVisible(true);
  };

  return (
      <View style={styles.container}>
        <GestureHandlerRootView>
        <Text style={styles.title}>Resources For You</Text>
        <Text style={styles.subtitle}>Select a category to explore available resources</Text>

        <View style={styles.grid}>
          {Object.entries(categories).map(([key, { title, icon, color }]) => (
              <Pressable
                  key={key}
                  style={[styles.card, { backgroundColor: color }]}
                  onPress={() => handleCategoryPress(key)}
              >
                <Text style={styles.cardIcon}>{icon}</Text>
                <Text style={[styles.cardTitle, { color: '#CF5C36' }]}>
                  {title}
                </Text>
              </Pressable>
          ))}
        </View>

        <ResourceBottomSheet
            resources={selectedCategory ? getResourcesByCategory(selectedCategory) : []}
            isVisible={isBottomSheetVisible}
            onClose={() => setIsBottomSheetVisible(false)}
        />
        </GestureHandlerRootView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaef', // Darker shade for background
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000', // Light shade for text
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#3f3f3f',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 0.6,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#CF5C36',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FilteredResources;
