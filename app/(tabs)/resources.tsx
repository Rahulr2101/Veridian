import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilteredResources from '../../components/FilteredResources';

const ResourcesTab = () => {
  return (
    <View style={styles.container}>
      <FilteredResources />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ResourcesTab;